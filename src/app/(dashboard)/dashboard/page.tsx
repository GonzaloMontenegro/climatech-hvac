import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Panel",
  robots: { index: false, follow: false },
};

// Datos mock mientras la BD de Render está disponible
const MOCK_CITAS = [
  { id: "cita-001", tipo: "Mantenimiento Preventivo", equipo: "Samsung Wind-Free - Dormitorio", tecnico: "Roberto Pizarro", fecha: "2025-05-20", hora: "10:00", estado: "confirmada" },
  { id: "cita-002", tipo: "Limpieza de Filtros", equipo: "LG Dualcool - Living", tecnico: "Patricia Jara", fecha: "2025-06-05", hora: "14:30", estado: "pendiente" },
];

const MOCK_EQUIPOS = [
  { id: "eq-1", marca: "Samsung", modelo: "Wind-Free Inverter", btu: 9000, ubicacion: "Dormitorio Principal", eficiencia: 94 },
  { id: "eq-2", marca: "LG", modelo: "Dualcool 12000", btu: 12000, ubicacion: "Living Comedor", eficiencia: 78 },
];

const KPIS = [
  { label: "Equipos Registrados", value: "2", icon: "❄️" },
  { label: "Servicios Pendientes", value: "1", icon: "🔧" },
  { label: "Próximo Servicio", value: "20 May", icon: "📅" },
  { label: "Eficiencia Promedio", value: "86%", icon: "⚡" },
];

export default function DashboardPage() {
  const proximaCita = MOCK_CITAS.find((c) => c.estado !== "completada");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-black text-blue-950">Mi Resumen</h1>
        <p className="text-slate-400 mt-1">Estado de tus equipos y próximos servicios</p>
      </div>

      {/* Alerta servicio próximo */}
      {proximaCita && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in-up">
          <span className="text-xl mt-0.5">🔧</span>
          <div>
            <p className="font-semibold text-orange-800 text-sm">Servicio próximo agendado</p>
            <p className="text-orange-700 text-sm mt-0.5">
              {proximaCita.tipo} — {proximaCita.equipo} el{" "}
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

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all">
            <span className="text-2xl">{kpi.icon}</span>
            <p className="text-3xl font-black text-slate-800 mt-2">{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Próxima cita + equipos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Próxima cita */}
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
              <p className="text-sm text-slate-600 mt-1">{proximaCita.equipo}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                <span>📅 {new Date(proximaCita.fecha).toLocaleDateString("es-CL")}</span>
                <span>⏰ {proximaCita.hora}</span>
                <span>👷 {proximaCita.tecnico}</span>
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

        {/* Mis equipos */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">Mis equipos</h2>
            <a href="/dashboard/mis-equipos" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Detalle →
            </a>
          </div>
          <div className="space-y-3">
            {MOCK_EQUIPOS.map((eq) => (
              <div key={eq.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">❄️</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{eq.marca} {eq.modelo}</p>
                  <p className="text-xs text-slate-400 truncate">{eq.ubicacion} · {eq.btu.toLocaleString()} BTU</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-500 transition-all"
                      style={{ width: `${eq.eficiencia}%` }}
                    />
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
