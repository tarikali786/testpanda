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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (callbackUrl = "/dashboard") => {
    try {
      const result  = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("/api/auth/session", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error("Session creation failed");

      router.push(callbackUrl);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  }, [router]);

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
