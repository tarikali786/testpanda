import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const admin = getAdminClient();

    // Get user info from Supabase Auth
    const { data: { user }, error } = await admin.auth.admin.getUserById(userId);
    if (error || !user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check if user record already exists
    const { data: existingUser } = await admin.from("users").select("uid").eq("uid", userId).single();

    if (!existingUser) {
      await admin.from("users").insert({
        uid:       user.id,
        email:     user.email ?? "",
        name:      user.user_metadata?.full_name ?? "",
        photo_url: user.user_metadata?.avatar_url ?? "",
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      await admin.from("trials").insert({
        user_id:    user.id,
        expires_at: expiresAt.toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
