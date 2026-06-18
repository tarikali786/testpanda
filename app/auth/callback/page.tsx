"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function CallbackHandler() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = createClient();
    const next     = searchParams.get("next") ?? "/dashboard";
    const code     = searchParams.get("code");

    if (!code) { router.push("/auth/signin?error=missing_code"); return; }

    supabase.auth.exchangeCodeForSession(code).then(async ({ data, error }) => {
      if (error || !data.session) { router.push("/auth/signin?error=auth_failed"); return; }

      // Set our own session cookie + create user record
      await Promise.all([
        fetch("/api/auth/session", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ access_token: data.session.access_token }),
        }),
        fetch("/api/auth/setup", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ userId: data.session.user.id }),
        }),
      ]);

      router.push(next);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return <Suspense><CallbackHandler /></Suspense>;
}
