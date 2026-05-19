"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "cliente" | "admin";

export interface DemoUser {
  uid: string;
  email: string;
  nombre: string;
  rol: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: DemoUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signUp: (form: { nombre: string; email: string; telefono: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ ok: false }),
  signUp: async () => ({ ok: false }),
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hvac_demo_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { ok: false, error: data.error || "Credenciales incorrectas" };
      }
      localStorage.setItem("hvac_demo_user", JSON.stringify(data));
      setUser(data);
      return { ok: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, error: msg };
    }
  };

  const signUp = async (form: { nombre: string; email: string; telefono: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        return { ok: false, error: data.error || "Error al registrar usuario" };
      }
      localStorage.setItem("hvac_demo_user", JSON.stringify(data));
      setUser(data);
      return { ok: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, error: msg };
    }
  };

  const signOut = () => {
    localStorage.removeItem("hvac_demo_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
