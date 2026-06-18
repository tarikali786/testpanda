import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/signin?error=missing_code`);
  }

  const response = NextResponse.redirect(`${origin}${next}`);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/auth/signin?error=auth_failed`);
  }

  const { id: uid, email, user_metadata } = data.user;

  const { data: existingUser } = await getAdminClient()
    .from("users")
    .select("uid")
    .eq("uid", uid)
    .single();

  if (!existingUser) {
    await getAdminClient().from("users").insert({
      uid,
      email:     email ?? "",
      name:      user_metadata.full_name ?? "",
      photo_url: user_metadata.avatar_url ?? "",
    });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await getAdminClient().from("trials").insert({
      user_id:    uid,
      expires_at: expiresAt.toISOString(),
    });
  }

  return response;
}
