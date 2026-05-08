"use client";
import { useState } from "react";
import { MOCK_TECNICOS, MOCK_CITAS } from "@/lib/mockData";

const ESTADO_COLORS = {
  activo: "bg-green-100 text-green-700 border border-green-200",
  en_ruta: "bg-blue-100 text-blue-700 border border-blue-200",
  libre: "bg-slate-100 text-slate-500 border border-slate-200",
};

const CITAS_PENDIENTES = MOCK_CITAS.filter(c => c.estado !== "completada");

export default function AsignacionesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [asignando, setAsignando] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-blue-950">Despacho de Técnicos</h1>
        <p className="text-slate-400 mt-1">Asignación y seguimiento de servicios de campo</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Panel de técnicos */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Técnicos disponibles</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {MOCK_TECNICOS.map(tec => (
              <div key={tec.id} onClick={() => setSelected(selected === tec.id ? null : tec.id)}
                className={`px-6 py-4 flex items-center gap-3 cursor-pointer transition-all ${selected === tec.id ? 'bg-orange-50' : 'hover:bg-slate-50'}`}>
                <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                  {tec.nombre.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800 text-sm">{tec.nombre}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ESTADO_COLORS[tec.estado as keyof typeof ESTADO_COLORS]}`}>
                      {tec.estado.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{tec.zona}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                    <span>📅 {tec.citasHoy} hoy</span>
                    <span>⭐ {tec.rating}</span>
                  </div>
                </div>
                {selected === tec.id && <span className="text-orange-500 text-lg">✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Panel de asignación de citas pendientes */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Citas sin asignar</h2>
            <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
              {CITAS_PENDIENTES.length} pendientes
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {CITAS_PENDIENTES.map(cita => (
              <div key={cita.id} className="px-6 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{cita.tipo}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cita.equipo}</p>
                    <div className="flex gap-3 mt-2 text-xs text-slate-500">
                      <span>📅 {new Date(cita.fecha).toLocaleDateString('es-CL')}</span>
                      <span>⏰ {cita.hora}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setAsignando(cita.id); setTimeout(() => setAsignando(null), 1500); }}
                    disabled={!selected || asignando === cita.id}
                    className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition-all ${selected ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    {asignando === cita.id ? "✅ Asignado" : "Asignar →"}
                  </button>
                </div>
                {asignando === cita.id && selected && (
                  <div className="mt-2 text-xs text-green-700 font-semibold bg-green-50 rounded-lg px-3 py-2">
                    ✅ Asignado a {MOCK_TECNICOS.find(t => t.id === selected)?.nombre}
                  </div>
                )}
              </div>
            ))}
          </div>
          {!selected && (
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center">← Selecciona un técnico para asignar citas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
