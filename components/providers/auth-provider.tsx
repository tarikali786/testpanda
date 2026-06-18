"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase/client";


interface AuthContextValue {
  user:        User | null;
  loading:     boolean;
  signIn:      (callbackUrl?: string) => Promise<void>;
  signOut:     () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user:    null,
  loading: true,
  signIn:  async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router                = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        try {
          const idToken          = await firebaseUser.getIdToken();
          const storedCallback   = sessionStorage.getItem("authCallbackUrl");
          if (storedCallback) sessionStorage.removeItem("authCallbackUrl");

          // Also check URL params — set by middleware when session cookie is missing
          const urlCallback = new URLSearchParams(window.location.search).get("callbackUrl");
          const redirectTo  = storedCallback || urlCallback || null;

          const res = await fetch("/api/auth/session", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ idToken }),
          });

          if (res.ok && redirectTo) router.push(redirectTo);
          else if (res.ok && window.location.pathname === "/auth/signin") router.push("/dashboard");
          else if (!res.ok) console.error("Session creation failed");
        } catch (err) {
          console.error("Session error:", err);
        }
      }
    });

    return unsubscribe;
  }, [router]);

  const signIn = useCallback(async (callbackUrl = "/dashboard") => {
    sessionStorage.setItem("authCallbackUrl", callbackUrl);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      sessionStorage.removeItem("authCallbackUrl");
      console.error("Sign in error:", err);
    }
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await firebaseSignOut(auth);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
