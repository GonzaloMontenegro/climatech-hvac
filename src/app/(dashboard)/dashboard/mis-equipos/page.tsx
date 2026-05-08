"use client";
import { useState } from "react";
import { MOCK_EQUIPOS_CLIENTE } from "@/lib/mockData";

export default function MisEquiposPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const eq = MOCK_EQUIPOS_CLIENTE.find(e => e.id === selected);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-blue-950">Mis Equipos</h1>
        <p className="text-slate-400 mt-1">Monitoreo y estado de todos tus equipos instalados</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Lista */}
        <div className="space-y-4">
          {MOCK_EQUIPOS_CLIENTE.map(equipo => (
            <button key={equipo.id} onClick={() => setSelected(equipo.id === selected ? null : equipo.id)}
              className={`w-full bg-white border-2 rounded-2xl p-5 text-left transition-all hover:shadow-lg ${selected === equipo.id ? 'border-orange-500 shadow-lg shadow-orange-100' : 'border-slate-200'}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">❄️</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 text-sm truncate">{equipo.modelo}</h3>
                    <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${equipo.estado === 'operativo' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {equipo.estado}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{equipo.ubicacion}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Eficiencia operativa</span>
                      <span className="font-bold text-slate-600">{equipo.eficiencia}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${equipo.eficiencia > 85 ? 'bg-green-500' : equipo.eficiencia > 60 ? 'bg-orange-400' : 'bg-red-400'}`}
                        style={{ width: `${equipo.eficiencia}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detalle */}
        {eq ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">❄️</div>
              <div>
                <h2 className="font-black text-blue-950">{eq.modelo}</h2>
                <p className="text-sm text-slate-400">{eq.ubicacion}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Fecha instalación", value: new Date(eq.instalado).toLocaleDateString('es-CL') },
                { label: "Garantía hasta", value: new Date(eq.garantiaHasta).toLocaleDateString('es-CL') },
                { label: "Último mantenimiento", value: new Date(eq.ultimoMantenimiento).toLocaleDateString('es-CL') },
                { label: "Próximo mantenimiento", value: new Date(eq.proximoMantenimiento).toLocaleDateString('es-CL') },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <div className={`rounded-xl p-4 ${eq.estadoGarantia === 'vigente' ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
              <p className={`text-sm font-bold ${eq.estadoGarantia === 'vigente' ? 'text-green-800' : 'text-orange-800'}`}>
                🛡 Garantía {eq.estadoGarantia === 'vigente' ? 'vigente' : '⚠ Por vencer'}
              </p>
              <p className={`text-xs mt-1 ${eq.estadoGarantia === 'vigente' ? 'text-green-600' : 'text-orange-600'}`}>
                Válida hasta el {new Date(eq.garantiaHasta).toLocaleDateString('es-CL')}
              </p>
            </div>
            <a href="/dashboard/citas"
              className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all">
              Agendar mantenimiento →
            </a>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-3">👆</span>
            <p className="text-slate-400 text-sm">Selecciona un equipo para ver su detalle completo</p>
          </div>
        )}
      </div>
    </div>
  );
}
