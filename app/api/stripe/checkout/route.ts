import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { stripe, PLANS, COURSES, type PlanKey, type CourseKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { plan?: PlanKey; course?: CourseKey };
  const email = user.emailAddresses[0]?.emailAddress;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;

  let name: string, amount: number, description: string, metaKey: string, metaValue: string;

  if (body.course) {
    const course = COURSES[body.course];
    if (!course) return NextResponse.json({ error: "Invalid course" }, { status: 400 });
    name = course.name;
    amount = course.amount;
    description = `${course.name} — 12 months full access`;
    metaKey = "course";
    metaValue = body.course;
  } else if (body.plan) {
    const plan = PLANS[body.plan];
    if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    name = plan.name;
    amount = plan.amount;
    description = plan.description;
    metaKey = "plan";
    metaValue = body.plan;
  } else {
    return NextResponse.json({ error: "No plan or course specified" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [{ quantity: 1, price_data: { currency: "aud", unit_amount: amount, product_data: { name, description } } }],
    metadata: { clerk_user_id: user.id, [metaKey]: metaValue },
    invoice_creation: { enabled: true },
    success_url: `${baseUrl}/dashboard?payment=success`,
    cancel_url: `${baseUrl}/#courses`,
  });

  return NextResponse.json({ url: session.url });
}
