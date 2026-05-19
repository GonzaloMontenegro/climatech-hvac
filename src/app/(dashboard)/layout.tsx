"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/demoAuth";
import { useEffect } from "react";

const NAV = [
  { href: "/dashboard", label: "Resumen", icon: "📊" },
  { href: "/dashboard/mis-equipos", label: "Mis Equipos", icon: "❄️" },
  { href: "/dashboard/citas", label: "Mis Servicios", icon: "🔧" },
  { href: "/dashboard/garantias", label: "Garantías", icon: "🛡" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
    if (!loading && user?.rol === "admin") router.replace("/admin");
  }, [loading, user, router]);

  if (loading || !user) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 min-h-screen">
        {/* Brand */}
        <div className="p-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white">❄</div>
            <span className="font-black text-blue-950">ClimaTech</span>
          </Link>
        </div>
        {/* User info */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
              {user?.avatar ?? "U"}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-800 text-sm truncate">{user?.nombre ?? "Cliente"}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === item.href
                  ? "bg-orange-50 text-orange-700 font-semibold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Footer nav */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link
            href="/dashboard/citas"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 transition-all font-semibold"
          >
            <span>🔧</span> Agendar servicio
          </Link>
          <button
            onClick={() => { signOut(); router.push("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <span>🚪</span> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
