import { MOCK_METRICAS_ADMIN, MOCK_ORDENES, MOCK_TECNICOS } from "@/lib/mockData";

function KPICard({ label, value, sub, icon, trend }: { label: string; value: string; sub?: string; icon: string; trend?: number }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend !== undefined && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-blue-950">{value}</p>
      <p className="text-sm font-semibold text-slate-500 mt-1">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

const ESTADO_ORDEN = {
  completada: "bg-green-100 text-green-700",
  en_proceso: "bg-blue-100 text-blue-700",
  pendiente: "bg-orange-100 text-orange-700",
};

export default function AdminDashboardPage() {
  const m = MOCK_METRICAS_ADMIN;
  const trend = Math.round((m.ventasMes - m.ventasMesAnterior) / m.ventasMesAnterior * 100);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Dashboard Operativo</h1>
          <p className="text-slate-400 mt-1">Inteligencia de negocio en tiempo real — Abril 2025</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700">Sistema operativo</span>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard icon="💰" label="Ventas del mes" value={`$${(m.ventasMes/1000000).toFixed(1)}M`} sub="CLP" trend={trend} />
        <KPICard icon="👥" label="Clientes Activos" value={m.clientesActivos.toString()} sub={`+${m.clientesNuevosMes} este mes`} trend={10} />
        <KPICard icon="📅" label="Citas completadas" value={`${m.citasCompletadas}/${m.citasMes}`} sub="tasa 81%" />
        <KPICard icon="🌟" label="NPS Score" value={`${m.nps}`} sub="Excelente" trend={3} />
      </div>

      {/* Segunda fila */}
      <div className="grid grid-cols-3 gap-4">
        <KPICard icon="📦" label="Equipos vendidos" value={m.equiposVendidosMes.toString()} sub="Mes actual" />
        <KPICard icon="🔧" label="Ingresos técnicos" value={`$${(m.ingresosTecnicos/1000000).toFixed(2)}M`} sub="Servicios" />
        <KPICard icon="🎯" label="Ticket promedio" value={`$${m.ticketPromedio.toLocaleString("es-CL")}`} sub="Por orden" />
      </div>

      {/* Tabla de órdenes + técnicos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Órdenes recientes */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Órdenes recientes</h2>
            <span className="text-xs font-semibold text-slate-400">{MOCK_ORDENES.length} total</span>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_ORDENES.map(orden => (
              <div key={orden.id} className="px-6 py-3.5 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{orden.cliente}</p>
                  <p className="text-xs text-slate-400 truncate">{orden.equipo}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-blue-900">${(orden.total/1000).toFixed(0)}K</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ESTADO_ORDEN[orden.estado as keyof typeof ESTADO_ORDEN]}`}>
                    {orden.estado.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Técnicos */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Estado del equipo técnico</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_TECNICOS.map(tec => (
              <div key={tec.id} className="px-6 py-3.5 flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                  {tec.nombre.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{tec.nombre}</p>
                  <p className="text-xs text-slate-400 truncate">{tec.zona}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-slate-600">{tec.citasHoy} citas hoy</p>
                  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 ${tec.estado === 'activo' ? 'bg-green-100 text-green-700' : tec.estado === 'en_ruta' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                    {tec.estado.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
