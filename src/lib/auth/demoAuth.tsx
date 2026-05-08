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
  signOut: () => void;
}

const DEMO_ACCOUNTS: Record<string, { password: string; user: DemoUser }> = {
  "demo@cliente.cl": {
    password: "demo1234",
    user: {
      uid: "demo-client-001",
      email: "demo@cliente.cl",
      nombre: "Carlos Mendoza",
      rol: "cliente",
      avatar: "CM",
    },
  },
  "admin@hvac.cl": {
    password: "admin2024",
    user: {
      uid: "demo-admin-001",
      email: "admin@hvac.cl",
      nombre: "Valentina Torres",
      rol: "admin",
      avatar: "VT",
    },
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ ok: false }),
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
    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (!account) return { ok: false, error: "Usuario no encontrado." };
    if (account.password !== password) return { ok: false, error: "Contraseña incorrecta." };
    localStorage.setItem("hvac_demo_user", JSON.stringify(account.user));
    setUser(account.user);
    return { ok: true };
  };

  const signOut = () => {
    localStorage.removeItem("hvac_demo_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
