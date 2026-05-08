import { MOCK_EQUIPOS_CLIENTE } from "@/lib/mockData";

function GarantiaBadge({ estado }: { estado: string }) {
  if (estado === "vigente") return <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">🛡 Vigente</span>;
  return <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">⚠ Por vencer</span>;
}

export default function GarantiasPage() {
  const diasRestantes = (fecha: string) => {
    const d = Math.ceil((new Date(fecha).getTime() - Date.now()) / (1000*60*60*24));
    return d;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-blue-950">Garantías</h1>
        <p className="text-slate-400 mt-1">Vigencia y cobertura de tus equipos registrados</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
        <span className="text-xl">ℹ️</span>
        <div>
          <p className="font-semibold text-blue-900 text-sm">Garantía ClimaTech</p>
          <p className="text-sm text-blue-700 mt-0.5">Todos los equipos instalados por nosotros cuentan con garantía de instalación de 2 años y garantía del fabricante adicional conforme a la normativa SEC Chile.</p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_EQUIPOS_CLIENTE.map(eq => {
          const dias = diasRestantes(eq.garantiaHasta);
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
                <GarantiaBadge estado={eq.estadoGarantia} />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Vence el</p>
                  <p className="font-bold text-slate-700 mt-1">{new Date(eq.garantiaHasta).toLocaleDateString('es-CL')}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Días restantes</p>
                  <p className={`font-black mt-1 text-xl ${dias > 180 ? 'text-green-600' : dias > 60 ? 'text-orange-600' : 'text-red-600'}`}>
                    {dias > 0 ? dias : "Vencida"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">Cobertura</p>
                  <p className="font-bold text-slate-700 mt-1">Completa</p>
                </div>
              </div>

              {eq.estadoGarantia === "por vencer" && (
                <div className="mt-4">
                  <a href="/dashboard/citas" className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all text-sm">
                    Extender garantía →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
