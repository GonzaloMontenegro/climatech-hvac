"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/demoAuth";

export default function RegistroPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", password: "", confirmar: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setSubmitting(true);

    const result = await signUp({
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      password: form.password
    });

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-xl">❄</div>
            <span className="font-black text-white text-xl">ClimaTech</span>
          </Link>
          <p className="text-slate-400 text-sm mt-3">Crea tu cuenta para gestionar tus servicios</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-black text-blue-950 mb-1">Crear cuenta</h1>
          <p className="text-sm text-slate-500 mb-6">Regístrate para agendar y hacer seguimiento de tus servicios</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="input-nombre" className="block text-xs font-semibold text-slate-600 mb-1.5">Nombre completo</label>
              <input
                id="input-nombre"
                type="text"
                value={form.nombre}
                onChange={set("nombre")}
                required
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              />
            </div>

            <div>
              <label htmlFor="input-email" className="block text-xs font-semibold text-slate-600 mb-1.5">Correo electrónico</label>
              <input
                id="input-email"
                type="email"
                value={form.email}
                onChange={set("email")}
                required
                placeholder="tu@correo.cl"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              />
            </div>

            <div>
              <label htmlFor="input-telefono" className="block text-xs font-semibold text-slate-600 mb-1.5">Teléfono</label>
              <input
                id="input-telefono"
                type="tel"
                value={form.telefono}
                onChange={set("telefono")}
                placeholder="+56 9 XXXX XXXX"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="input-password" className="block text-xs font-semibold text-slate-600 mb-1.5">Contraseña</label>
                <input
                  id="input-password"
                  type="password"
                  value={form.password}
                  onChange={set("password")}
                  required
                  placeholder="Min. 8 caracteres"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm text-slate-800"
                />
              </div>
              <div>
                <label htmlFor="input-confirmar" className="block text-xs font-semibold text-slate-600 mb-1.5">Confirmar</label>
                <input
                  id="input-confirmar"
                  type="password"
                  value={form.confirmar}
                  onChange={set("confirmar")}
                  required
                  placeholder="Repetir"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-sm text-slate-800"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-medium">
                ⚠️ {error}
              </div>
            )}

            <button
              id="btn-registrar"
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/25 mt-2"
            >
              {submitting ? "Creando cuenta..." : "Crear cuenta →"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                Ingresar
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          <Link href="/" className="hover:text-white transition-colors">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}
