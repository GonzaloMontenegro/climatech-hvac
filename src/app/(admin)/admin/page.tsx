"use client";
import { useState, useEffect } from "react";
import { MOCK_METRICAS_ADMIN } from "@/lib/mockData";

const MOCK_SERVICIOS_RECIENTES = [
  { id: "SRV-001", cliente: "Ana García", tipo: "Mantenimiento Preventivo", total: 35000, estado: "completada", fecha: "2025-04-10", equipo: "Samsung Wind-Free", detalle: "Limpieza profunda de serpentines, filtros y revisión de circuito eléctrico." },
  { id: "SRV-002", cliente: "Carlos Mendoza", tipo: "Limpieza de Filtros", total: 18000, estado: "en_proceso", fecha: "2025-04-12", equipo: "LG Dualcool", detalle: "Desmontaje de turbina y limpieza interna completa." },
  { id: "SRV-003", cliente: "Pedro Fuentes", tipo: "Carga de Gas", total: 45000, estado: "pendiente", fecha: "2025-04-14", equipo: "Midea Xtreme", detalle: "Detección de micro-fuga, soldadura en tubería de cobre y carga de refrigerante R410a." },
  { id: "SRV-004", cliente: "María López", tipo: "Mantenimiento Preventivo", total: 35000, estado: "completada", fecha: "2025-04-08", equipo: "Samsung Cassette", detalle: "Sanitización del sistema e inspección de bomba de drenaje." },
  { id: "SRV-005", cliente: "Juan Riquelme", tipo: "Revisión Eléctrica", total: 25000, estado: "en_proceso", fecha: "2025-04-13", equipo: "LG Premium", detalle: "Reemplazo de contactor de arranque en unidad exterior." },
];

const MOCK_BITACORAS = {
  "Ana García": [
    { fecha: "2025-04-10", tipo: "Mantenimiento Preventivo", tecnico: "Roberto Pizarro", detalle: "Limpieza profunda de serpentines, filtros y revisión de circuito eléctrico." },
    { fecha: "2024-10-12", tipo: "Carga de Gas", tecnico: "Roberto Pizarro", detalle: "Carga de refrigerante 0.8kg y ajuste de tuerca en unidad exterior." }
  ],
  "Carlos Mendoza": [
    { fecha: "2025-04-12", tipo: "Limpieza de Filtros", tecnico: "Patricia Jara", detalle: "Desmontaje de turbina y limpieza interna completa." }
  ],
  "Pedro Fuentes": [
    { fecha: "2025-04-14", tipo: "Carga de Gas", tecnico: "Marcelo Soto", detalle: "Detección de micro-fuga, soldadura en tubería de cobre y carga de refrigerante R410a." },
    { fecha: "2024-05-15", tipo: "Revisión Eléctrica", tecnico: "Patricia Jara", detalle: "Inspección y reapriete de borneras en tablero eléctrico." }
  ],
  "María López": [
    { fecha: "2025-04-08", tipo: "Mantenimiento Preventivo", tecnico: "Roberto Pizarro", detalle: "Sanitización del sistema e inspección de bomba de drenaje." }
  ],
  "Juan Riquelme": [
    { fecha: "2025-04-13", tipo: "Revisión Eléctrica", tecnico: "Claudia Rojas", detalle: "Reemplazo de contactor de arranque en unidad exterior." }
  ]
} as Record<string, Array<{ fecha: string; tipo: string; tecnico: string; detalle: string }>>;

const ESTADO_BADGE: Record<string, string> = {
  completada: "bg-green-100 text-green-700",
  en_proceso: "bg-blue-100 text-blue-700",
  pendiente: "bg-orange-100 text-orange-700",
};

interface Tecnico {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  zona: string;
  rating: number;
  citasHoy: number;
  estado: string;
}

export default function AdminDashboardPage() {
  const m = MOCK_METRICAS_ADMIN;
  const trend = Math.round(((m.ingresosMes - m.ingresosMesAnterior) / m.ingresosMesAnterior) * 100);

  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [activeKpiPopup, setActiveKpiPopup] = useState<"ingresos" | "clientes" | "servicios" | null>(null);
  const [selectedClient, setSelectedClient] = useState<{ nombre: string; servicioId: string } | null>(null);
  
  // Agregar Técnico Modal
  const [showAddTechModal, setShowAddTechModal] = useState(false);
  const [newTech, setNewTech] = useState({ nombre: "", email: "", telefono: "", zona: "" });
  const [submittingTech, setSubmittingTech] = useState(false);

  // Carga de técnicos desde la API con fallback
  useEffect(() => {
    fetch("/api/tecnicos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTecnicos(data);
        }
      })
      .catch((err) => console.error("Error al cargar técnicos:", err));
  }, []);

  const handleAddTechSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingTech(true);

    try {
      const res = await fetch("/api/tecnicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTech),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al agregar técnico");

      setTecnicos((prev) => [...prev, data]);
      setNewTech({ nombre: "", email: "", telefono: "", zona: "" });
      setShowAddTechModal(false);
    } catch (err: unknown) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmittingTech(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Dashboard Operativo</h1>
          <p className="text-slate-400 mt-1">Inteligencia de negocio y monitoreo en tiempo real</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700">Sistema operativo</span>
        </div>
      </div>

      {/* KPIs Simplificados (3 columnas) con interacción de click */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setActiveKpiPopup("ingresos")}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">💰</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver detalle →</span>
          </div>
          <p className="text-3xl font-black text-blue-950">${(m.ingresosMes / 1000000).toFixed(1)}M</p>
          <p className="text-sm font-semibold text-slate-500 mt-1">Ingresos del mes</p>
          <p className="text-xs text-slate-400 mt-0.5">Creza del {trend}% vs mes anterior</p>
        </button>

        <button
          onClick={() => setActiveKpiPopup("clientes")}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">👥</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver todos →</span>
          </div>
          <p className="text-3xl font-black text-blue-950">{m.clientesActivos}</p>
          <p className="text-sm font-semibold text-slate-500 mt-1">Clientes Activos</p>
          <p className="text-xs text-slate-400 mt-0.5">+{m.clientesNuevosMes} registrados este mes</p>
        </button>

        <button
          onClick={() => setActiveKpiPopup("servicios")}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">🔧</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver tasas →</span>
          </div>
          <p className="text-3xl font-black text-blue-950">{m.citasCompletadas}/{m.citasMes}</p>
          <p className="text-sm font-semibold text-slate-500 mt-1">Servicios completados</p>
          <p className="text-xs text-slate-400 mt-0.5">Tasa de finalización 81%</p>
        </button>
      </div>

      {/* Fila Servicios + Técnicos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Servicios Recientes */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-bold text-slate-800">Servicios recientes</h2>
            <span className="text-xs font-semibold text-slate-400">{MOCK_SERVICIOS_RECIENTES.length} total</span>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_SERVICIOS_RECIENTES.map((srv) => (
              <div key={srv.id} className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-all">
                <div className="flex-1 min-w-0">
                  <button 
                    onClick={() => setSelectedClient({ nombre: srv.cliente, servicioId: srv.id })}
                    className="text-sm font-bold text-blue-900 hover:text-orange-600 transition-colors text-left cursor-pointer focus:outline-none"
                  >
                    {srv.cliente}
                  </button>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{srv.tipo} · {srv.equipo}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-blue-900">${(srv.total / 1000).toFixed(0)}K</p>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mt-1 inline-block ${ESTADO_BADGE[srv.estado]}`}>
                    {srv.estado.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Técnicos Dinámicos */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-bold text-slate-800">Equipo Técnico</h2>
              <button 
                onClick={() => setShowAddTechModal(true)}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                + Agregar Técnico
              </button>
            </div>
            
            {tecnicos.length > 0 ? (
              <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                {tecnicos.map((tec) => (
                  <div key={tec.id} className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700 flex-shrink-0">
                      {tec.nombre.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800">{tec.nombre}</p>
                      <p className="text-xs text-slate-400 truncate">{tec.zona} · {tec.telefono || tec.email}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        {tec.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <p className="text-sm">No hay técnicos asignados en este momento.</p>
                <p className="text-xs mt-1">Haz clic en el botón superior para agregar el primero.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* POPUP: KPI DETALLES - INGRESOS */}
      {activeKpiPopup === "ingresos" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950">Desglose de Ingresos</h3>
              <button onClick={() => setActiveKpiPopup(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-500">Mantenimiento Preventivo</span>
                <span className="font-bold text-slate-800">$2,450,000</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-500">Instalaciones Nuevas</span>
                <span className="font-bold text-slate-800">$1,800,000</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-500">Reparaciones y Carga de Gas</span>
                <span className="font-bold text-slate-800">$600,000</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-3 border-t border-slate-100">
                <span className="text-blue-950">Total Facturado</span>
                <span className="text-orange-600">${m.ingresosMes.toLocaleString("es-CL")}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: KPI DETALLES - CLIENTES */}
      {activeKpiPopup === "clientes" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950">Lista de Clientes Activos</h3>
              <button onClick={() => setActiveKpiPopup(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            <div className="space-y-3">
              {[
                { nombre: "Ana García", comuna: "Las Condes", equipos: 2, tel: "+56 9 8765 4321" },
                { nombre: "Carlos Mendoza", comuna: "Ñuñoa", equipos: 1, tel: "+56 9 1234 5678" },
                { nombre: "Pedro Fuentes", comuna: "Providencia", equipos: 2, tel: "+56 9 9876 5432" },
                { nombre: "María López", comuna: "Santiago", equipos: 3, tel: "+56 9 3344 5566" },
              ].map((c) => (
                <div key={c.nombre} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800">{c.nombre}</p>
                    <p className="text-xs text-slate-400">{c.comuna} · {c.tel}</p>
                  </div>
                  <span className="text-xs font-bold bg-orange-50 text-orange-700 px-3 py-1 rounded-xl">
                    {c.equipos} {c.equipos === 1 ? "Equipo" : "Equipos"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POPUP: KPI DETALLES - SERVICIOS */}
      {activeKpiPopup === "servicios" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950">Resumen de Servicios</h3>
              <button onClick={() => setActiveKpiPopup(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-black text-blue-950">{m.citasCompletadas}</p>
                  <p className="text-xs text-slate-500 mt-1">Completados</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-black text-orange-600">{m.citasMes - m.citasCompletadas}</p>
                  <p className="text-xs text-slate-500 mt-1">Pendientes / En Curso</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed text-center">
                El 81% de las citas programadas para este mes han sido ejecutadas exitosamente y validadas por el cliente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: DETALLE CLIENTE / BITÁCORA */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950">Ficha Técnica: {selectedClient.nombre}</h3>
              <button onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            
            <div className="space-y-5">
              {/* Servicio reciente detalle */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-800">Última Intervención</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {MOCK_SERVICIOS_RECIENTES.find(s => s.id === selectedClient.servicioId)?.tipo}
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {MOCK_SERVICIOS_RECIENTES.find(s => s.id === selectedClient.servicioId)?.detalle}
                </p>
              </div>

              {/* Bitácora de mantenimientos pasados */}
              <div>
                <h4 className="font-bold text-slate-700 text-sm mb-3">Bitácora Histórica</h4>
                <div className="space-y-3">
                  {MOCK_BITACORAS[selectedClient.nombre]?.map((b, idx) => (
                    <div key={idx} className="border-l-2 border-orange-500 pl-4 space-y-1">
                      <p className="text-xs font-bold text-slate-500">{new Date(b.fecha).toLocaleDateString("es-CL")} · Técnico: {b.tecnico}</p>
                      <p className="text-sm font-bold text-blue-950">{b.tipo}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{b.detalle}</p>
                    </div>
                  )) || (
                    <p className="text-xs text-slate-400 text-center py-4">No hay mantenimientos pasados en la bitácora.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR TÉCNICO */}
      {showAddTechModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950">Nuevo Integrante Técnico</h3>
              <button onClick={() => setShowAddTechModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            <form onSubmit={handleAddTechSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={newTech.nombre} 
                  onChange={(e) => setNewTech({ ...newTech, nombre: e.target.value })}
                  placeholder="Ej. Roberto Pizarro"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={newTech.email} 
                  onChange={(e) => setNewTech({ ...newTech, email: e.target.value })}
                  placeholder="ejemplo@climatech.cl"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    value={newTech.telefono} 
                    onChange={(e) => setNewTech({ ...newTech, telefono: e.target.value })}
                    placeholder="+56 9..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Zona / Comuna</label>
                  <input 
                    type="text" 
                    value={newTech.zona} 
                    onChange={(e) => setNewTech({ ...newTech, zona: e.target.value })}
                    placeholder="Providencia"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={submittingTech}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {submittingTech ? "Agregando..." : "Guardar Técnico →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
