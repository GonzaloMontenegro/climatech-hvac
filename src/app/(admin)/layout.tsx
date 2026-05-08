"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/demoAuth";
import { useEffect } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard BI", icon: "📊" },
  { href: "/admin/inventario", label: "Inventario", icon: "📦" },
  { href: "/admin/asignaciones", label: "Despacho", icon: "📍" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
    if (!loading && user?.rol === "cliente") router.replace("/dashboard");
  }, [user, loading, router]);

  if (loading || !user) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* sidebar oscuro */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col min-h-screen flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white">❄</div>
            <div>
              <span className="font-black text-white text-sm">ClimaTech</span>
              <div className="text-xs text-orange-400 font-semibold">Admin</div>
            </div>
          </Link>
        </div>

        <div className="px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
              {user.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user.nombre}</p>
              <p className="text-xs text-slate-500 truncate">Administrador</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname === item.href ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <Link href="/e-commerce" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <span>🛒</span> Tienda pública
          </Link>
          <button onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/30 transition-all">
            <span>🚪</span> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* contenido */}
      <main className="flex-1 bg-slate-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}
