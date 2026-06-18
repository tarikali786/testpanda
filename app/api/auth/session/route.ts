import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { access_token } = await req.json();
  if (!access_token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  // Verify the token with Supabase
  const { data: { user }, error } = await getAdminClient().auth.getUser(access_token);
  if (error || !user) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const response = NextResponse.json({ success: true });
  response.cookies.set("session", access_token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge:   60 * 60 * 24 * 7, // 7 days
    path:     "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("session", "", { maxAge: 0, path: "/" });
  return response;
}
