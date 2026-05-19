"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth/demoAuth";
import { MOCK_EQUIPOS_CLIENTE } from "@/lib/mockData";

// Ampliamos el mock con reportes técnicos y estado de mantenimiento
const INITIAL_EQUIPOS = MOCK_EQUIPOS_CLIENTE.map((eq, i) => ({
  ...eq,
  mantenimientoRealizado: i === 0, // El primero realizado, el segundo pendiente
  reporteTecnico: i === 0 
    ? "Limpieza química de unidad interior y exterior, sanitización de turbina y filtros. Medición de presión de gas refrigerante R410a óptima. Consumo eléctrico en rango nominal."
    : "Revisión de conexiones eléctricas realizada. Se sugiere limpieza de filtros de aire en el próximo servicio por acumulación moderada de polvo."
}));

export default function MisEquiposPage() {
  const { user } = useAuth();
  const [equipos, setEquipos] = useState(INITIAL_EQUIPOS);
  const [selected, setSelected] = useState<string | null>(null);

  const eq = equipos.find(e => e.id === selected);
  const isAdmin = user?.rol === "admin";

  const handleToggleMantenimiento = (id: string) => {
    setEquipos(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, mantenimientoRealizado: !e.mantenimientoRealizado };
      }
      return e;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-blue-950">Mis Equipos</h1>
        <p className="text-slate-400 mt-1">Monitoreo y estado de todos tus equipos instalados</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Lista */}
        <div className="space-y-4">
          {equipos.map(equipo => (
            <div key={equipo.id} 
              className={`w-full bg-white border-2 rounded-2xl p-5 text-left transition-all hover:shadow-lg relative ${selected === equipo.id ? 'border-orange-500 shadow-lg shadow-orange-100' : 'border-slate-200'}`}>
              <button 
                onClick={() => setSelected(equipo.id === selected ? null : equipo.id)}
                className="w-full text-left flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">❄️</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 text-sm truncate">{equipo.modelo}</h3>
                    <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${equipo.estado === 'operativo' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {equipo.estado}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{equipo.ubicacion}</p>
                </div>
              </button>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Mantenimiento Realizado:</span>
                {isAdmin ? (
                  <button
                    onClick={() => handleToggleMantenimiento(equipo.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all border ${
                      equipo.mantenimientoRealizado 
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                        : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                    }`}
                  >
                    {equipo.mantenimientoRealizado ? "✅ Completado (Click cambiar)" : "⚠️ Pendiente (Click cambiar)"}
                  </button>
                ) : (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    equipo.mantenimientoRealizado 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {equipo.mantenimientoRealizado ? "Completado" : "Pendiente"}
                  </span>
                )}
              </div>
            </div>
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

            {/* Reemplazamos la etiqueta Garantía Vigente por Detalle de Reporte Técnico */}
            <div className="bg-orange-50/50 border border-orange-150 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                <span>📋</span> Reporte Técnico del Servicio
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {eq.reporteTecnico}
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
