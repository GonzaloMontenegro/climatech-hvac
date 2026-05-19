"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_EQUIPOS } from "@/lib/mockData";
import { useCartStore } from "@/lib/store/cartStore";
import { trackAddToCart } from "@/lib/gtm/events";
import { useState, use } from "react";

const SERVICIOS_INSTALACION = [
  { id: "svc-001", nombre: "Instalación Estándar", desc: "Incluye soporte mural, tubería de cobre 3m y conexión eléctrica.", precioCLP: 89000 },
  { id: "svc-002", nombre: "Instalación Premium (hasta 8m)", desc: "Tubería extendida hasta 8m + sellado térmico + commissioning.", precioCLP: 149000 },
];

export default function ProductPage({ params }: { params: Promise<{ equipo_id: string }> }) {
  const { equipo_id } = use(params);
  const eq = MOCK_EQUIPOS.find(e => e.id === equipo_id);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem, addServiceToItem } = useCartStore();

  if (!eq) notFound();

  const handleAddToCart = () => {
    const item = { id: eq.id, sku: eq.sku, nombre: `${eq.marca} ${eq.modelo}`, precioCLP: eq.precioCLP, tipo: 'equipo' as const, cantidad: 1 };
    addItem(item);
    trackAddToCart(item);
    if (selectedService) {
      const svc = SERVICIOS_INSTALACION.find(s => s.id === selectedService);
      if (svc) addServiceToItem(eq.id, svc.id, svc.nombre, svc.precioCLP);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const total = eq.precioCLP + (selectedService ? (SERVICIOS_INSTALACION.find(s => s.id === selectedService)?.precioCLP || 0) : 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm">❄</div>
          <span className="font-black text-blue-950">ClimaTech</span>
        </Link>
        <Link href="/e-commerce" className="text-sm text-slate-500 hover:text-blue-900 transition-colors">← Volver al catálogo</Link>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Imagen y datos visuales */}
          <div className="space-y-6">
            <div className="h-80 rounded-3xl flex items-center justify-center text-9xl relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${eq.color}20 0%, ${eq.color}08 100%)` }}>
              ❄️
            </div>

            {/* Etiqueta SEC */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">SEC Chile</p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5">Protocolo PE Nº 1/26/2:2020</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
                  {eq.eficiencia.replace("+", "")}
                </div>
              </div>
              <div className="space-y-2">
                {["A+++", "A++", "A+", "A", "B", "C"].map(nivel => (
                  <div key={nivel} className="flex items-center gap-2">
                    <div className={`h-6 rounded-r-full flex items-center px-3 text-xs font-black text-white transition-all ${eq.eficiencia === nivel ? 'opacity-100 shadow-lg' : 'opacity-30'}`}
                      style={{ width: nivel === "A+++" ? "100%" : nivel === "A++" ? "85%" : nivel === "A+" ? "70%" : nivel === "A" ? "58%" : nivel === "B" ? "45%" : "35%",
                        background: nivel.startsWith("A") ? "#006f3c" : nivel === "B" ? "#4caf50" : "#8bc34a" }}>
                      {nivel}
                    </div>
                    {eq.eficiencia === nivel && <span className="text-xs font-bold text-green-700">← Este equipo</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info y carrito */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{eq.marca}</span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-bold text-slate-400">{eq.categoria}</span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-mono text-slate-400">{eq.sku}</span>
              </div>
              <h1 className="text-3xl font-black text-blue-950 leading-tight">{eq.modelo}</h1>
              <p className="text-slate-500 mt-3 leading-relaxed">{eq.descripcion}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">Capacidad</p>
                <p className="text-xl font-black text-slate-800">{eq.capacidadBTU.toLocaleString()} BTU</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">Eficiencia SEC</p>
                <p className="text-xl font-black text-green-700">{eq.eficiencia}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">Disponibilidad</p>
                <p className={`text-sm font-bold ${eq.stock > 5 ? 'text-green-600' : eq.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                  {eq.stock > 0 ? `${eq.stock} unidades` : "Sin stock"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">Garantía</p>
                <p className="text-sm font-bold text-slate-700">5 años SEC</p>
              </div>
            </div>

            {/* Servicios de instalación */}
            <div>
              <p className="text-sm font-bold text-slate-700 mb-3">Agregar instalación (opcional)</p>
              <div className="space-y-2">
                {SERVICIOS_INSTALACION.map(svc => (
                  <button key={svc.id} onClick={() => setSelectedService(selectedService === svc.id ? null : svc.id)}
                    className={`w-full border-2 rounded-xl p-3.5 text-left transition-all ${selectedService === svc.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-800">{svc.nombre}</p>
                      <p className="text-sm font-black text-orange-700">+${svc.precioCLP.toLocaleString("es-CL")}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{svc.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Precio total y CTA */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-400">Equipo</span>
                <span className="text-sm font-semibold text-slate-700">${eq.precioCLP.toLocaleString("es-CL")}</span>
              </div>
              {selectedService && (
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Instalación</span>
                  <span className="text-sm font-semibold text-orange-600">+${SERVICIOS_INSTALACION.find(s=>s.id===selectedService)?.precioCLP.toLocaleString("es-CL")}</span>
                </div>
              )}
              <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between">
                <span className="font-bold text-slate-700">Total</span>
                <span className="text-2xl font-black text-blue-950">${total.toLocaleString("es-CL")}</span>
              </div>
              <button onClick={handleAddToCart} disabled={eq.stock === 0}
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-600/25 text-base">
                {added ? "✅ Agregado al carrito" : "Agregar al carrito →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
