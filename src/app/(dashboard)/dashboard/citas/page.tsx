"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth/demoAuth";

const ESTADO_STYLE = {
  confirmada: "bg-green-100 text-green-700",
  pendiente: "bg-orange-100 text-orange-700",
  completada: "bg-slate-100 text-slate-500",
};

const ESTADO_LABEL = {
  confirmada: "Confirmada",
  pendiente: "Pendiente",
  completada: "Completada",
};

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

interface Equipo {
  id: string;
  marca: string;
  modelo: string;
  ubicacion: string;
}

export default function CitasPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    equipo: "",
    tipo: "Mantenimiento Preventivo",
    fecha: "",
    hora: "10:00",
    notas: "",
  });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchCitasData = useCallback(async () => {
    if (!user?.uid) return;
    try {
      const [citasRes, eqRes] = await Promise.all([
        fetch(`/api/citas?userId=${user.uid}`),
        fetch(`/api/equipos?userId=${user.uid}`),
      ]);
      const citasData = await citasRes.json();
      const eqData = await eqRes.json();

      if (Array.isArray(citasData)) setCitas(citasData);
      if (Array.isArray(eqData)) setEquipos(eqData);
    } catch (err) {
      console.error("Error al cargar citas/equipos:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      fetchCitasData();
    }
  }, [user?.uid, fetchCitasData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          tipo: form.tipo,
          equipo: form.equipo,
          fecha: form.fecha,
          hora: form.hora,
          notas: form.notas,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear la cita");

      setCitas((prev) => [...prev, data]);
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setForm({ equipo: "", tipo: "Mantenimiento Preventivo", fecha: "", hora: "10:00", notas: "" });
      }, 2000);
    } catch (err: unknown) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmitting(false);
    }
  };

  const proximas = citas.filter((c) => c.estado !== "completada");
  const historial = citas.filter((c) => c.estado === "completada");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Citas de Servicio</h1>
          <p className="text-slate-400 mt-1">Gestiona y programa tu mantenimiento preventivo o correctivo</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/25 text-sm cursor-pointer"
        >
          + Nueva Cita
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold">Cargando tus citas...</p>
        </div>
      ) : (
        <>
          {/* Próximas */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
              Próximas citas ({proximas.length})
            </h2>
            <div className="space-y-3">
              {proximas.map((cita) => (
                <div key={cita.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0 text-slate-600">
                    🔧
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-slate-800 text-sm">{cita.tipo}</h3>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${
                          ESTADO_STYLE[cita.estado as keyof typeof ESTADO_STYLE] || "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {ESTADO_LABEL[cita.estado as keyof typeof ESTADO_LABEL] || cita.estado}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{cita.notas || "Sin detalles"}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                      <span>📅 {new Date(cita.fecha).toLocaleDateString("es-CL")}</span>
                      <span>⏰ {cita.hora} hrs</span>
                      <span>⏱ {cita.duracion || "2 horas"}</span>
                      <span>👷 Técnico: {cita.tecnico || "Por asignar"}</span>
                    </div>
                  </div>
                </div>
              ))}
              {proximas.length === 0 && (
                <div className="text-center py-8 bg-white border border-slate-200 rounded-2xl">
                  <p className="text-slate-400 text-sm">No tienes citas programadas actualmente.</p>
                </div>
              )}
            </div>
          </div>

          {/* Historial */}
          <div>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Historial</h2>
            <div className="space-y-2">
              {historial.map((cita) => (
                <div
                  key={cita.id}
                  className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 opacity-70"
                >
                  <span className="text-lg">✅</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-600">
                      {cita.tipo} — {cita.notas || "Inspección de equipo"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(cita.fecha).toLocaleDateString("es-CL")} · Técnico: {cita.tecnico || "Finalizado"}
                    </p>
                  </div>
                </div>
              ))}
              {historial.length === 0 && (
                <div className="text-center py-6 bg-slate-50 border border-slate-100 rounded-2xl">
                  <p className="text-slate-400 text-xs">No tienes servicios completados registrados.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-blue-950 text-xl">Nueva Cita</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold font-sans"
              >
                ✕
              </button>
            </div>
            {success ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎉</div>
                <p className="font-bold text-green-700">¡Cita agendada exitosamente!</p>
                <p className="text-sm text-slate-400 mt-1">Te asignaremos un técnico a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Equipo</label>
                  <input
                    type="text"
                    list="equipos-list"
                    required
                    value={form.equipo}
                    onChange={(e) => setForm({ ...form, equipo: e.target.value })}
                    placeholder="Escribe o selecciona tu equipo..."
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 placeholder-slate-400"
                  />
                  <datalist id="equipos-list">
                    {equipos.map((e) => (
                      <option key={e.id} value={`${e.marca} ${e.modelo} (${e.ubicacion})`} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tipo de servicio</label>
                  <select
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  >
                    <option value="Mantenimiento Preventivo" className="text-slate-800 bg-white">
                      Mantenimiento Preventivo
                    </option>
                    <option value="Revisión Técnica" className="text-slate-800 bg-white">
                      Revisión Técnica
                    </option>
                    <option value="Limpieza de Filtros" className="text-slate-800 bg-white">
                      Limpieza de Filtros
                    </option>
                    <option value="Reparación" className="text-slate-800 bg-white">
                      Reparación
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fecha</label>
                    <input
                      type="date"
                      required
                      value={form.fecha}
                      onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Hora preferente</label>
                    <select
                      value={form.hora}
                      onChange={(e) => setForm({ ...form, hora: e.target.value })}
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                    >
                      {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((h) => (
                        <option key={h} value={h} className="text-slate-800 bg-white">
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Notas adicionales</label>
                  <textarea
                    value={form.notas}
                    onChange={(e) => setForm({ ...form, notas: e.target.value })}
                    placeholder="Describe si hay alguna falla o requerimiento especial..."
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 placeholder-slate-400 h-20 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Programando..." : "Confirmar cita →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
