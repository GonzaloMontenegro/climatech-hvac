"use client";
import { useState, useEffect, useCallback } from "react";

const ESTADO_BADGE: Record<string, string> = {
  confirmada: "bg-green-100 text-green-700",
  pendiente: "bg-orange-100 text-orange-700",
  completada: "bg-slate-100 text-slate-500",
};

interface Cita {
  id: string;
  tipo: string;
  estado: string;
  fecha: string;
  hora: string;
  tecnico: string | null;
  notas: string | null;
  duracion: string | null;
  precio: number | null;
  userId: string;
}

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
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeKpiPopup, setActiveKpiPopup] = useState<"ingresos" | "clientes" | "servicios" | null>(null);
  const [selectedClient, setSelectedClient] = useState<{ userId: string; nombre: string; servicioId: string } | null>(null);

  // Agregar Técnico Modal
  const [showAddTechModal, setShowAddTechModal] = useState(false);
  const [newTech, setNewTech] = useState({ nombre: "", email: "", telefono: "", zona: "" });
  const [submittingTech, setSubmittingTech] = useState(false);

  const fetchAdminData = useCallback(async () => {
    try {
      const [tecRes, citasRes] = await Promise.all([
        fetch("/api/tecnicos"),
        fetch("/api/citas"),
      ]);
      const tecData = await tecRes.json();
      const citasData = await citasRes.json();

      if (Array.isArray(tecData)) setTecnicos(tecData);
      if (Array.isArray(citasData)) setCitas(citasData);
    } catch (err) {
      console.error("Error al cargar datos de administración:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

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

  // Cálculo de Métricas Reales
  const completedServices = citas.filter((c) => c.estado === "completada");
  const pendingServices = citas.filter((c) => c.estado !== "completada");

  const totalIngresos = completedServices.reduce((acc, c) => acc + (c.precio || 0), 0);
  const uniqueClientsCount = new Set(citas.map((c) => c.userId)).size;

  // Detalle de bitácora para el cliente seleccionado
  const clientHistory = selectedClient
    ? citas.filter((c) => c.userId === selectedClient.userId)
    : [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold">Cargando panel administrativo...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Dashboard Operativo</h1>
          <p className="text-slate-400 mt-1">Monitoreo y administración del servicio en tiempo real</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700">Base de Datos Conectada</span>
        </div>
      </div>

      {/* KPIs reales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Facturado */}
        <button
          onClick={() => setActiveKpiPopup("ingresos")}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">💰</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver detalle →</span>
          </div>
          <p className="text-3xl font-black text-blue-950">${totalIngresos.toLocaleString("es-CL")}</p>
          <p className="text-sm font-semibold text-slate-500 mt-1">Ingresos Facturados</p>
          <p className="text-xs text-slate-400 mt-0.5">Basado en servicios completados</p>
        </button>

        {/* Clientes */}
        <button
          onClick={() => setActiveKpiPopup("clientes")}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">👥</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver todos →</span>
          </div>
          <p className="text-3xl font-black text-blue-950">{uniqueClientsCount}</p>
          <p className="text-sm font-semibold text-slate-500 mt-1">Clientes Registrados</p>
          <p className="text-xs text-slate-400 mt-0.5">Con solicitudes o equipos en el sistema</p>
        </button>

        {/* Servicios */}
        <button
          onClick={() => setActiveKpiPopup("servicios")}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">🔧</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver resumen →</span>
          </div>
          <p className="text-3xl font-black text-blue-950">{completedServices.length}/{citas.length}</p>
          <p className="text-sm font-semibold text-slate-500 mt-1">Servicios Completados</p>
          <p className="text-xs text-slate-400 mt-0.5">{pendingServices.length} servicios pendientes</p>
        </button>
      </div>

      {/* Fila Servicios + Técnicos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Servicios Recientes */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-bold text-slate-800">Servicios en el sistema</h2>
            <span className="text-xs font-semibold text-slate-400">{citas.length} total</span>
          </div>
          {citas.length > 0 ? (
            <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
              {citas.map((srv) => (
                <div key={srv.id} className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-all">
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => setSelectedClient({ userId: srv.userId, nombre: `Cliente ${srv.userId.slice(-5)}`, servicioId: srv.id })}
                      className="text-sm font-bold text-blue-900 hover:text-orange-600 transition-colors text-left cursor-pointer focus:outline-none"
                    >
                      Cliente ({srv.userId.slice(-5).toUpperCase()})
                    </button>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{srv.tipo} · {srv.notas || "Inspección"}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black text-blue-900">${(srv.precio || 0).toLocaleString("es-CL")}</p>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mt-1 inline-block ${ESTADO_BADGE[srv.estado] || "bg-orange-100 text-orange-700"}`}>
                      {srv.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm">No hay servicios registrados en la base de datos.</p>
            </div>
          )}
        </div>

        {/* Equipo Técnico */}
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
                        {tec.estado || "activo"}
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
              <button onClick={() => setActiveKpiPopup(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold font-sans">✕</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-slate-500">Mantenimientos preventivos completados</span>
                <span className="font-bold text-slate-800">${totalIngresos.toLocaleString("es-CL")}</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-3 border-t border-slate-100">
                <span className="text-blue-950">Total General</span>
                <span className="text-orange-600">${totalIngresos.toLocaleString("es-CL")}</span>
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
              <h3 className="font-black text-xl text-blue-950">Clientes Registrados ({uniqueClientsCount})</h3>
              <button onClick={() => setActiveKpiPopup(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold font-sans">✕</button>
            </div>
            <div className="space-y-3">
              {Array.from(new Set(citas.map((c) => c.userId))).map((uid) => {
                const clientServices = citas.filter((c) => c.userId === uid);
                return (
                  <div key={uid} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">Cliente {uid.slice(-5).toUpperCase()}</p>
                      <p className="text-xs text-slate-400">ID: {uid}</p>
                    </div>
                    <span className="text-xs font-bold bg-orange-50 text-orange-700 px-3 py-1 rounded-xl">
                      {clientServices.length} {clientServices.length === 1 ? "Servicio" : "Servicios"}
                    </span>
                  </div>
                );
              })}
              {uniqueClientsCount === 0 && (
                <p className="text-center text-slate-400">No hay clientes con registros activos.</p>
              )}
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
              <button onClick={() => setActiveKpiPopup(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold font-sans">✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-black text-blue-950">{completedServices.length}</p>
                  <p className="text-xs text-slate-500 mt-1">Completados</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-black text-orange-600">{pendingServices.length}</p>
                  <p className="text-xs text-slate-500 mt-1">Pendientes</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed text-center">
                Monitoreo operativo de todos los servicios registrados en la base de datos de ClimaTech.
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
              <h3 className="font-black text-xl text-blue-950">Bitácora Técnica</h3>
              <button onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold font-sans">✕</button>
            </div>
            
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-slate-700 text-sm mb-3">Historial del Cliente</h4>
                <div className="space-y-3">
                  {clientHistory.map((b) => (
                    <div key={b.id} className="border-l-2 border-orange-500 pl-4 space-y-1">
                      <p className="text-xs font-bold text-slate-500">
                        {new Date(b.fecha).toLocaleDateString("es-CL")} · Técnico: {b.tecnico || "Pendiente"}
                      </p>
                      <p className="text-sm font-bold text-blue-950">{b.tipo}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{b.notas || "Sin detalles"}</p>
                    </div>
                  ))}
                  {clientHistory.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">No hay mantenimientos pasados registrados para este cliente.</p>
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
              <button onClick={() => setShowAddTechModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold font-sans">✕</button>
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
