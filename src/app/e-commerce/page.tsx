"use client";
import { useState } from "react";
import Link from "next/link";
import { MOCK_EQUIPOS } from "@/lib/mockData";
import { useCartStore } from "@/lib/store/cartStore";
import { trackAddToCart } from "@/lib/gtm/events";

const CATEGORIAS = ["Todos", "Split", "VRF/VRV"];

export default function EcommercePage() {
  const [cat, setCat] = useState("Todos");
  const [cartMsg, setCartMsg] = useState<string | null>(null);
  const { addItem, items } = useCartStore();

  const filtered = cat === "Todos" ? MOCK_EQUIPOS : MOCK_EQUIPOS.filter(e => e.categoria === cat);

  const handleAdd = (eq: typeof MOCK_EQUIPOS[0]) => {
    const item = { id: eq.id, sku: eq.sku, nombre: `${eq.marca} ${eq.modelo}`, precioCLP: eq.precioCLP, tipo: 'equipo' as const, cantidad: 1 };
    addItem(item);
    trackAddToCart(item);
    setCartMsg(eq.modelo);
    setTimeout(() => setCartMsg(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Nav */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm">❄</div>
          <span className="font-black text-blue-950">ClimaTech</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-900">Inicio</Link>
          <Link href="/e-commerce" className="text-orange-600 font-bold">Catálogo</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors">Acceder</Link>
          <div className="relative">
            <Link href="/dashboard" className="flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold py-2 px-4 rounded-xl transition-all hover:bg-slate-700">
              🛒 <span>{items.length}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Cart notification */}
      {cartMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold animate-fade-in-up">
          ✅ {cartMsg} agregado al carrito
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Catálogo 2025</p>
          <h1 className="text-4xl font-black text-blue-950">Equipos HVAC</h1>
          <p className="text-slate-400 mt-2">Todos los equipos incluyen certificación SEC y garantía de instalación</p>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-8">
          {CATEGORIAS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${cat === c ? 'bg-blue-950 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(eq => (
            <div key={eq.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all group">
              {/* Imagen mock */}
              <div className="h-44 flex items-center justify-center text-6xl relative"
                style={{ background: `linear-gradient(135deg, ${eq.color}15 0%, ${eq.color}08 100%)` }}>
                ❄️
                <span className="absolute top-3 right-3 sec-label-A text-xs font-black px-2.5 py-1 rounded-full">
                  {eq.eficiencia} SEC
                </span>
                {eq.stock <= 2 && <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Últimas unidades</span>}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{eq.marca} · {eq.categoria}</p>
                    <h3 className="font-black text-slate-800 mt-0.5 leading-snug group-hover:text-blue-900 transition-colors">{eq.modelo}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2">{eq.descripcion}</p>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-slate-400">Capacidad</p>
                    <p className="text-sm font-bold text-slate-700">{eq.capacidadBTU.toLocaleString()} BTU</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-slate-400">Stock</p>
                    <p className={`text-sm font-bold ${eq.stock > 5 ? 'text-green-600' : eq.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                      {eq.stock > 0 ? `${eq.stock} ud.` : "Agotado"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Precio</p>
                    <p className="text-2xl font-black text-blue-950">${eq.precioCLP.toLocaleString("es-CL")}</p>
                    <p className="text-xs text-slate-400">CLP · con IVA</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/e-commerce/${eq.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                      Ver detalle →
                    </Link>
                    <button onClick={() => handleAdd(eq)} disabled={eq.stock === 0}
                      className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md text-sm">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
