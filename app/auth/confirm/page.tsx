"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function ConfirmHandler() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    const token_hash = searchParams.get("token_hash");
    const type       = searchParams.get("type") as "signup" | "email" | null;

    if (!token_hash || !type) {
      setStatus("error");
      return;
    }

    const supabase = createClient();

    supabase.auth.verifyOtp({ token_hash, type }).then(async ({ data, error }) => {
      if (error || !data.session) {
        setStatus("error");
        return;
      }

      // Set session cookie + create user record
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

      router.push("/dashboard");
    });
  }, []);

  if (status === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-foreground font-medium mb-2">Verification failed</p>
          <p className="text-sm text-muted-foreground mb-6">The link may have expired. Please try signing up again.</p>
          <a href="/auth/signin" className="text-sm underline underline-offset-4 hover:text-foreground transition-colors">
            Back to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Verifying your email…</p>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return <Suspense><ConfirmHandler /></Suspense>;
}
