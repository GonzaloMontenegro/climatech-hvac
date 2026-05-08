import { MOCK_EQUIPOS_CLIENTE, MOCK_CITAS, MOCK_METRICAS_ADMIN } from "@/lib/mockData";

export default function DashboardPage() {
  const proximaCita = MOCK_CITAS.find(c => c.estado !== "completada");
  const equipoAlerta = MOCK_EQUIPOS_CLIENTE.find(e => e.estado === "mantenimiento");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-black text-blue-950">Mi Resumen</h1>
        <p className="text-slate-400 mt-1">Bienvenido, aquí tienes el estado de tus servicios</p>
      </div>

      {/* Alerta activa */}
      {equipoAlerta && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in-up">
          <span className="text-xl mt-0.5">⚠️</span>
          <div>
            <p className="font-semibold text-orange-800 text-sm">Equipo requiere atención</p>
            <p className="text-orange-700 text-sm mt-0.5">{equipoAlerta.modelo} en {equipoAlerta.ubicacion} — Mantenimiento pendiente</p>
          </div>
          <a href="/dashboard/citas" className="ml-auto flex-shrink-0 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-700 transition-all">
            Agendar →
          </a>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Equipos Activos", value: MOCK_EQUIPOS_CLIENTE.length, icon: "❄️", color: "blue" },
          { label: "Citas Pendientes", value: MOCK_CITAS.filter(c => c.estado !== "completada").length, icon: "📅", color: "orange" },
          { label: "Garantías Vigentes", value: MOCK_EQUIPOS_CLIENTE.filter(e => e.estadoGarantia === "vigente").length, icon: "🛡", color: "green" },
          { label: "Eficiencia Promedio", value: `${Math.round(MOCK_EQUIPOS_CLIENTE.reduce((a,e) => a + e.eficiencia, 0)/MOCK_EQUIPOS_CLIENTE.length)}%`, icon: "⚡", color: "purple" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all">
            <span className="text-2xl">{kpi.icon}</span>
            <p className="text-3xl font-black text-slate-800 mt-2">{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* 2 cols */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Próxima cita */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Próxima cita</h2>
            <a href="/dashboard/citas" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">Ver todas →</a>
          </div>
          {proximaCita ? (
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${proximaCita.estado === 'confirmada' ? 'bg-green-500' : 'bg-orange-400'} animate-pulse`} />
                <span className="text-xs font-bold text-slate-500 uppercase">{proximaCita.estado}</span>
              </div>
              <p className="font-bold text-blue-900">{proximaCita.tipo}</p>
              <p className="text-sm text-slate-600 mt-1">{proximaCita.equipo}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span>📅 {new Date(proximaCita.fecha).toLocaleDateString('es-CL')}</span>
                <span>⏰ {proximaCita.hora}</span>
                <span>👷 {proximaCita.tecnico}</span>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No tienes citas programadas.</p>
          )}
        </div>

        {/* Estado de equipos */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Estado de equipos</h2>
            <a href="/dashboard/mis-equipos" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">Detalle →</a>
          </div>
          <div className="space-y-3">
            {MOCK_EQUIPOS_CLIENTE.map(eq => (
              <div key={eq.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">❄️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{eq.marca}</p>
                  <p className="text-xs text-slate-400 truncate">{eq.ubicacion}</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-500 transition-all"
                      style={{ width: `${eq.eficiencia}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{eq.eficiencia}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
