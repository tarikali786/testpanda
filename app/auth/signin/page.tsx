"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") ?? "/dashboard";
  const router       = useRouter();

  const [mode, setMode]       = useState<"signin" | "signup">("signin");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const supabase = createClient();

  // If already logged in, redirect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push(callbackUrl);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let access_token: string;
      let userId: string;

      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (signUpError) throw signUpError;

        // Sign in immediately after signup
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        access_token = data.session.access_token;
        userId       = data.session.user.id;
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        access_token = data.session.access_token;
        userId       = data.session.user.id;
      }

      // Set session cookie + create user record
      await Promise.all([
        fetch("/api/auth/session", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ access_token }),
        }),
        fetch("/api/auth/setup", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ userId }),
        }),
      ]);

      router.push(callbackUrl);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-block">
            <span className="text-3xl font-display text-foreground">TestPanda</span>
          </a>
          <p className="text-muted-foreground mt-2 text-sm">
            Australia&apos;s Smartest Exam Prep Platform
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-foreground/10 p-8">
          <h1 className="text-2xl font-display text-foreground mb-2">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {mode === "signin"
              ? "Sign in to access your courses and free trial."
              : "Start your 30-day free trial. No credit card required."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-background border border-foreground/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
