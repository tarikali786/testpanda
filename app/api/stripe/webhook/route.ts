import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getAdminClient } from "@/lib/supabase/admin";
import { sendPaymentEmails } from "@/lib/emails";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { clerk_user_id, plan, course } = session.metadata ?? {};
    const courseId = plan ?? course;

    if (clerk_user_id && courseId) {
      const supabase = getAdminClient();

      const validUntil = new Date();
      validUntil.setFullYear(validUntil.getFullYear() + 1);
      const amount = (session.amount_total ?? 0) / 100;

      // Save subscription to Supabase
      await supabase.from("subscriptions").insert({
        user_id: clerk_user_id,
        course_id: courseId,
        stripe_session_id: session.id,
        amount,
        valid_until: validUntil.toISOString(),
      });

      // Get user details from Supabase
      const { data: user } = await supabase
        .from("users")
        .select("name, email")
        .eq("id", clerk_user_id)
        .single();

      // Get product name from Stripe line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
      const productName = lineItems.data[0]?.description ?? courseId;

      // Get Stripe invoice PDF URL
      let invoicePdfUrl: string | undefined;
      if (session.invoice) {
        const invoice = await stripe.invoices.retrieve(session.invoice as string);
        invoicePdfUrl = invoice.invoice_pdf ?? undefined;
      }

      // Send emails to user + admin
      if (user?.email) {
        await sendPaymentEmails({
          userName: user.name ?? "Customer",
          userEmail: user.email,
          productName,
          amount,
          sessionId: session.id,
          purchaseDate: new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }),
          validUntil: validUntil.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }),
          invoicePdfUrl,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
