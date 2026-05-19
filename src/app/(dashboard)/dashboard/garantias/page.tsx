import { MOCK_EQUIPOS_CLIENTE } from "@/lib/mockData";

// Ampliamos el mock para incluir contratos y periodos de mantenimiento
const MOCK_CONTRATOS = MOCK_EQUIPOS_CLIENTE.map((eq, i) => {
  const contrato = i === 0 ? "Semestral" : "Anual";
  const inicioMant = i === 0 ? "2025-01-10" : "2024-11-20";
  const finMant = i === 0 ? "2025-07-10" : "2025-11-20";
  return {
    ...eq,
    tipoContrato: contrato,
    inicioMantenimiento: inicioMant,
    finMantenimiento: finMant,
  };
});

function ContratoBadge({ tipo }: { tipo: string }) {
  return (
    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
      Contrato {tipo}
    </span>
  );
}

export default function GarantiasPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-blue-950">Garantías de Mantenimiento</h1>
        <p className="text-slate-400 mt-1">Vigencia de tus coberturas y contratos de servicios activos</p>
      </div>

      {/* Nueva info card de Garantía de Servicio de Mantenimiento */}
      <div className="bg-orange-50 border border-orange-150 rounded-2xl p-5 flex items-start gap-3">
        <span className="text-xl">🛡️</span>
        <div>
          <p className="font-semibold text-orange-900 text-sm">Garantía de Servicio Técnico</p>
          <p className="text-sm text-orange-700 mt-0.5">
            Cada servicio de mantenimiento predictivo o correctivo realizado por nuestro personal autorizado cuenta con una garantía técnica de **90 días**. Esta cubre repuestos instalados y cualquier ajuste de calibración o fugas asociadas a la intervención.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_CONTRATOS.map(eq => {
          return (
            <div key={eq.id} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">❄️</div>
                  <div>
                    <h3 className="font-bold text-slate-800">{eq.modelo}</h3>
                    <p className="text-sm text-slate-400">{eq.ubicacion} · Instalado {new Date(eq.instalado).toLocaleDateString('es-CL')}</p>
                  </div>
                </div>
                <ContratoBadge tipo={eq.tipoContrato} />
              </div>

              {/* Sección de contratos y periodos de mantenimiento */}
              <div className="mt-5 grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Tipo de Contrato</p>
                  <p className="font-bold text-slate-700 mt-1">{eq.tipoContrato}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Inicio Mantenimiento</p>
                  <p className="font-bold text-slate-700 mt-1">
                    {new Date(eq.inicioMantenimiento).toLocaleDateString('es-CL')}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Término Cobertura</p>
                  <p className="font-bold text-green-600 mt-1">
                    {new Date(eq.finMantenimiento).toLocaleDateString('es-CL')}
                  </p>
                </div>
              </div>

              {/* Botón Extender Garantía modificado a Pagar Mantenimiento */}
              <div className="mt-4">
                <a href="/dashboard/citas" className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all text-sm">
                  Pagar mantenimiento →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
