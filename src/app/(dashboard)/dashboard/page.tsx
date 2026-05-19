"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth/demoAuth";

interface Equipo {
  id: string;
  marca: string;
  modelo: string;
  btu: number;
  ubicacion: string;
  instalado: string;
  garantia: string;
}

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
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<"equipos" | "servicios" | "calendario" | null>(null);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    if (!user?.uid) return;
    try {
      const [eqRes, citasRes] = await Promise.all([
        fetch(`/api/equipos?userId=${user.uid}`),
        fetch(`/api/citas?userId=${user.uid}`),
      ]);
      const eqData = await eqRes.json();
      const citasData = await citasRes.json();

      if (Array.isArray(eqData)) setEquipos(eqData);
      if (Array.isArray(citasData)) setCitas(citasData);
    } catch (err) {
      console.error("Error al cargar datos del dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      fetchDashboardData();
    }
  }, [user?.uid, fetchDashboardData]);

  const proximas = citas.filter((c) => c.estado !== "completada");
  const proximaCita = proximas[0];
  const totalEquipos = equipos.length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold">Cargando tu resumen del hogar...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-black text-blue-950">
          Bienvenido de nuevo, {user?.nombre || "Cliente"}
        </h1>
        <p className="text-slate-400 mt-1">Estado de tus equipos y próximos servicios contratados</p>
      </div>

      {/* Alerta servicio próximo */}
      {proximaCita && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in-up">
          <span className="text-xl mt-0.5">🔧</span>
          <div>
            <p className="font-semibold text-orange-800 text-sm">Servicio próximo agendado</p>
            <p className="text-orange-700 text-sm mt-0.5">
              {proximaCita.tipo} el{" "}
              {new Date(proximaCita.fecha).toLocaleDateString("es-CL")} a las {proximaCita.hora}
            </p>
          </div>
          <a
            href="/dashboard/citas"
            className="ml-auto flex-shrink-0 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-700 transition-all"
          >
            Ver detalle →
          </a>
        </div>
      )}

      {/* KPIs Interactivos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Equipos Registrados */}
        <button
          onClick={() => setActiveModal("equipos")}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <div className="flex justify-between items-start">
            <span className="text-2xl">❄️</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver todos →</span>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-2">{totalEquipos}</p>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Equipos Registrados</p>
        </button>

        {/* Servicios Pendientes */}
        <button
          onClick={() => setActiveModal("servicios")}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <div className="flex justify-between items-start">
            <span className="text-2xl">🔧</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver detalles →</span>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-2">{proximas.length}</p>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Servicios Pendientes</p>
        </button>

        {/* Próximo Servicio */}
        <button
          onClick={() => setActiveModal("calendario")}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <div className="flex justify-between items-start">
            <span className="text-2xl">📅</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver calendario →</span>
          </div>
          <p className="text-3xl font-black text-slate-800 mt-2">
            {proximaCita ? new Date(proximaCita.fecha).toLocaleDateString("es-CL", { day: "numeric", month: "short" }) : "N/A"}
          </p>
          <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Próximo Servicio</p>
        </button>
      </div>

      {/* Próxima cita + equipos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Próximo servicio (Vista rápida) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Próximo servicio</h2>
            <a href="/dashboard/citas" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Ver todos →
            </a>
          </div>
          {proximaCita ? (
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${proximaCita.estado === "confirmada" ? "bg-green-500" : "bg-orange-400"} animate-pulse`} />
                <span className="text-xs font-bold text-slate-500 uppercase">{proximaCita.estado}</span>
              </div>
              <p className="font-bold text-blue-900">{proximaCita.tipo}</p>
              <p className="text-sm text-slate-600 mt-1">{proximaCita.notas || "Sin detalles"}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span>📅 {new Date(proximaCita.fecha).toLocaleDateString("es-CL")}</span>
                <span>⏰ {proximaCita.hora}</span>
                <span>👷 {proximaCita.tecnico || "Pendiente asignación"}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm mb-4">No tienes servicios agendados.</p>
              <a href="/dashboard/citas" className="inline-flex items-center gap-1 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-700 transition-all">
                🔧 Agendar servicio
              </a>
            </div>
          )}
        </div>

        {/* Mis equipos (Vista rápida) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Mis equipos</h2>
            <a href="/dashboard/mis-equipos" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Detalle →
            </a>
          </div>
          {equipos.length > 0 ? (
            <div className="space-y-4">
              {equipos.map((eq) => (
                <div key={eq.id} className="flex items-center justify-between gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">❄️</div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{eq.marca} {eq.modelo}</p>
                      <p className="text-xs text-slate-400 truncate">{eq.ubicacion} · {eq.btu.toLocaleString()} BTU</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 border border-green-200 text-green-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Mantenimiento Realizado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm mb-4">No tienes equipos registrados.</p>
              <a href="/dashboard/mis-equipos" className="inline-flex items-center gap-1 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-700 transition-all">
                ❄️ Registrar equipo
              </a>
            </div>
          )}
        </div>
      </div>

      {/* MODAL POPUPS INTERACTIVOS */}
      {activeModal === "equipos" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950 flex items-center gap-2">
                <span>❄️</span> Equipos Registrados
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            <div className="space-y-3">
              {equipos.length > 0 ? (
                equipos.map((eq) => (
                  <div key={eq.id} className="border border-slate-200 rounded-xl p-4 hover:border-orange-500 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800">{eq.marca} {eq.modelo}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{eq.ubicacion}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-700">{eq.btu} BTU</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      <p>📅 Instalado: <span className="font-bold">{new Date(eq.instalado).toLocaleDateString("es-CL")}</span></p>
                      <p>🛡️ Cobertura: <span className="font-bold text-green-600">{new Date(eq.garantia).toLocaleDateString("es-CL")}</span></p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 py-6">No tienes equipos registrados.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeModal === "servicios" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950 flex items-center gap-2">
                <span>🔧</span> Servicios Pendientes
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            <div className="space-y-3">
              {proximas.length > 0 ? (
                proximas.map((cita) => (
                  <div key={cita.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{cita.tipo}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{cita.notas || "Sin notas"}</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 capitalize">
                        {cita.estado}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span>📅 {new Date(cita.fecha).toLocaleDateString("es-CL")}</span>
                      <span>⏰ {cita.hora}</span>
                      <span>👷 Técnico: {cita.tecnico || "Por asignar"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 py-6">No tienes servicios pendientes.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeModal === "calendario" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950 flex items-center gap-2">
                <span>📅</span> Próxima Mantención
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            {proximaCita ? (
              <div className="space-y-4">
                {/* Calendario Gráfico Bonito */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl p-6 text-center shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-100">
                    {new Date(proximaCita.fecha).toLocaleDateString("es-CL", { month: "long", year: "numeric" })}
                  </p>
                  <p className="text-6xl font-black my-2">
                    {new Date(proximaCita.fecha).getDate()}
                  </p>
                  <p className="text-lg font-bold">
                    {new Date(proximaCita.fecha).toLocaleDateString("es-CL", { weekday: "long" })}
                  </p>
                  <p className="text-xs text-orange-100 mt-2">Hora asignada: {proximaCita.hora} hrs</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm text-slate-700 border border-slate-100">
                  <p><strong>Servicio:</strong> {proximaCita.tipo}</p>
                  <p><strong>Detalle:</strong> {proximaCita.notas || "Sin detalles"}</p>
                  <p><strong>Técnico:</strong> {proximaCita.tecnico || "Pendiente de asignación"}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-slate-400">No hay servicios calendarizados actualmente.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
