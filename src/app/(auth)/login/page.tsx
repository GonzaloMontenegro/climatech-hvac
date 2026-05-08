"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, DemoUser } from "@/lib/auth/demoAuth";

// Credenciales hardcodeadas para modo demo — no depende del contexto
const DEMO_ACCOUNTS: Record<string, { password: string; user: DemoUser }> = {
  "demo@cliente.cl": {
    password: "demo1234",
    user: { uid: "demo-client-001", email: "demo@cliente.cl", nombre: "Carlos Mendoza", rol: "cliente", avatar: "CM" },
  },
  "admin@hvac.cl": {
    password: "admin2024",
    user: { uid: "demo-admin-001", email: "admin@hvac.cl", nombre: "Valentina Torres", rol: "admin", avatar: "VT" },
  },
};

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Limpiar cualquier sesión previa al montar la página
  useEffect(() => {
    localStorage.removeItem("hvac_demo_user");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (!account) {
      setError("Usuario no encontrado.");
      setSubmitting(false);
      return;
    }
    if (account.password !== password) {
      setError("Contraseña incorrecta.");
      setSubmitting(false);
      return;
    }

    // Guardar sesión y redirigir
    localStorage.setItem("hvac_demo_user", JSON.stringify(account.user));
    window.location.href = account.user.rol === "admin" ? "/admin" : "/dashboard";
  };

  const fillDemo = (type: "cliente" | "admin") => {
    if (type === "cliente") { setEmail("demo@cliente.cl"); setPassword("demo1234"); }
    else { setEmail("admin@hvac.cl"); setPassword("admin2024"); }
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md" style={{ animation: "fadeInUp 0.5s ease forwards" }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-xl">❄</div>
            <span className="font-black text-white text-xl">ClimaTech</span>
          </Link>
          <p className="text-slate-400 text-sm mt-3">Plataforma de climatización empresarial</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-black text-blue-950 mb-1">Selecciona tu cuenta</h2>
          <p className="text-sm text-slate-500 mb-6">O ingresa con tus credenciales</p>

          {/* Demo pills */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Acceso rápido — Cuentas demo</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-demo-cliente"
                type="button"
                onClick={() => fillDemo("cliente")}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-3 transition-all text-left">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">CM</div>
                <div>
                  <p className="text-xs font-bold text-blue-900">Cliente Demo</p>
                  <p className="text-xs text-slate-500 truncate">demo@cliente.cl</p>
                </div>
              </button>
              <button
                id="btn-demo-admin"
                type="button"
                onClick={() => fillDemo("admin")}
                className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl p-3 transition-all text-left">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">VT</div>
                <div>
                  <p className="text-xs font-bold text-orange-900">Admin Demo</p>
                  <p className="text-xs text-slate-500 truncate">admin@hvac.cl</p>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Correo electrónico</label>
              <input
                id="input-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="tu@correo.cl"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contraseña</label>
              <input
                id="input-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-medium">
                ⚠️ {error}
              </div>
            )}
            <button
              id="btn-ingresar"
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/25 mt-2">
              {submitting ? "Ingresando..." : "Ingresar →"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          <Link href="/" className="hover:text-white transition-colors">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}
