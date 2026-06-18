"use client";

import { createContext, useContext, useCallback } from "react";

interface AuthContextValue {
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const signOut = useCallback(async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider value={{ signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
