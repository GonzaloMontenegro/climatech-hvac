"use client";
import { useState } from "react";
import { MOCK_CITAS } from "@/lib/mockData";

const ESTADO_STYLE = {
  confirmada: "bg-green-100 text-green-700",
  pendiente: "bg-orange-100 text-orange-700",
  completada: "bg-slate-100 text-slate-500",
};

export default function CitasPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ equipo: "", tipo: "Mantenimiento Preventivo", fecha: "", hora: "10:00", notas: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setShowModal(false); setSuccess(false); }, 2000);
  };

  const proximas = MOCK_CITAS.filter(c => c.estado !== "completada");
  const historial = MOCK_CITAS.filter(c => c.estado === "completada");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Citas de Servicio</h1>
          <p className="text-slate-400 mt-1">Gestiona y programa tu mantenimiento predictivo</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/25 text-sm">
          + Nueva Cita
        </button>
      </div>

      {/* Próximas */}
      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Próximas citas ({proximas.length})</h2>
        <div className="space-y-3">
          {proximas.map(cita => (
            <div key={cita.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📅</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-slate-800 text-sm">{cita.tipo}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ESTADO_STYLE[cita.estado as keyof typeof ESTADO_STYLE]}`}>
                    {cita.estado}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{cita.equipo}</p>
                <div className="flex gap-4 mt-2 text-xs text-slate-500">
                  <span>📅 {new Date(cita.fecha).toLocaleDateString('es-CL')}</span>
                  <span>⏰ {cita.hora}</span>
                  <span>⏱ {cita.duracion}</span>
                  <span>👷 {cita.tecnico}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historial */}
      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Historial</h2>
        <div className="space-y-2">
          {historial.map(cita => (
            <div key={cita.id} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 opacity-70">
              <span className="text-lg">✅</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-600">{cita.tipo} — {cita.equipo}</p>
                <p className="text-xs text-slate-400">{new Date(cita.fecha).toLocaleDateString('es-CL')} · {cita.tecnico}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-blue-950">Nueva Cita</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            {success ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎉</div>
                <p className="font-bold text-green-700">¡Cita agendada exitosamente!</p>
                <p className="text-sm text-slate-400 mt-1">Te notificaremos por correo a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Equipo</label>
                  <select required value={form.equipo} onChange={e => setForm({...form, equipo: e.target.value})}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="">Selecciona tu equipo...</option>
                    <option>Samsung Wind-Free 9000 BTU - Dormitorio</option>
                    <option>LG Dualcool 12000 BTU - Living</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tipo de servicio</label>
                  <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Mantenimiento Preventivo</option>
                    <option>Revisión Técnica</option>
                    <option>Limpieza de Filtros</option>
                    <option>Reparación</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fecha</label>
                    <input type="date" required value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Hora preferente</label>
                    <select value={form.hora} onChange={e => setForm({...form, hora: e.target.value})}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                      {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(h => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all">
                  Confirmar cita →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
