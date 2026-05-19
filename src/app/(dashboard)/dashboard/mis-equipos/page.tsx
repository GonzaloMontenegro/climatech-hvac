"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth/demoAuth";

interface Equipo {
  id: string;
  marca: string;
  modelo: string;
  btu: number;
  ubicacion: string;
  instalado: string;
  garantia: string;
}

export default function MisEquiposPage() {
  const { user } = useAuth();
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Formulario de Registro
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ marca: "", modelo: "", btu: 9000, ubicacion: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchEquipos = useCallback(async () => {
    if (!user?.uid) return;
    try {
      const res = await fetch(`/api/equipos?userId=${user.uid}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEquipos(data);
      }
    } catch (err) {
      console.error("Error al cargar equipos:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) {
      fetchEquipos();
    }
  }, [user?.uid, fetchEquipos]);

  const handleAddEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.uid,
          ...form,
          instalado: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al registrar");

      setEquipos((prev) => [data, ...prev]);
      setShowAddModal(false);
      setForm({ marca: "", modelo: "", btu: 9000, ubicacion: "" });
    } catch (err: unknown) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmitting(false);
    }
  };

  const eq = equipos.find((e) => e.id === selected);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Mis Equipos</h1>
          <p className="text-slate-400 mt-1">Monitoreo y estado de todos tus equipos instalados</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/25 text-sm cursor-pointer"
        >
          + Registrar Equipo
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold">Cargando tus equipos...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Lista */}
          <div className="space-y-4">
            {equipos.map((equipo) => (
              <div
                key={equipo.id}
                className={`w-full bg-white border-2 rounded-2xl p-5 text-left transition-all hover:shadow-lg relative ${
                  selected === equipo.id
                    ? "border-orange-500 shadow-lg shadow-orange-100"
                    : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => setSelected(equipo.id === selected ? null : equipo.id)}
                  className="w-full text-left flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    ❄️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 text-sm truncate">
                        {equipo.marca} {equipo.modelo}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400">{equipo.ubicacion}</p>
                  </div>
                </button>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Mantenimiento Realizado:</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                    Completado
                  </span>
                </div>
              </div>
            ))}
            {equipos.length === 0 && (
              <div className="text-center py-12 bg-white border border-dashed border-slate-300 rounded-2xl">
                <p className="text-slate-400 text-sm mb-4">No tienes equipos de aire acondicionado registrados aún.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-orange-700 transition-all"
                >
                  Registrar mi primer equipo
                </button>
              </div>
            )}
          </div>

          {/* Detalle */}
          {eq ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
                  ❄️
                </div>
                <div>
                  <h2 className="font-black text-blue-950">
                    {eq.marca} {eq.modelo}
                  </h2>
                  <p className="text-sm text-slate-400">{eq.ubicacion}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Fecha instalación",
                    value: eq.instalado ? new Date(eq.instalado).toLocaleDateString("es-CL") : "N/A",
                  },
                  {
                    label: "Garantía hasta",
                    value: eq.garantia ? new Date(eq.garantia).toLocaleDateString("es-CL") : "N/A",
                  },
                  {
                    label: "Último mantenimiento",
                    value: eq.instalado ? new Date(eq.instalado).toLocaleDateString("es-CL") : "N/A",
                  },
                  {
                    label: "Capacidad",
                    value: `${eq.btu.toLocaleString()} BTU`,
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                    <p className="text-sm font-bold text-slate-700 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Detalle de Reporte Técnico */}
              <div className="bg-orange-50/50 border border-orange-150 rounded-2xl p-4 space-y-2">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                  <span>📋</span> Reporte Técnico del Servicio
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equipo en perfecto estado operativo. Se realizó revisión preventiva de presión, fugas e inspección eléctrica durante la instalación. Todo conforme a la norma técnica vigente.
                </p>
              </div>

              <a
                href="/dashboard/citas"
                className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all"
              >
                Agendar mantenimiento →
              </a>
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <span className="text-4xl mb-3">👆</span>
              <p className="text-slate-400 text-sm">
                {equipos.length > 0
                  ? "Selecciona un equipo para ver su detalle completo"
                  : "Registra un equipo en el panel izquierdo para comenzar"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal Agregar Equipo */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-xl text-blue-950">Registrar Equipo</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold font-sans"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Marca</label>
                <input
                  type="text"
                  required
                  value={form.marca}
                  onChange={(e) => setForm({ ...form, marca: e.target.value })}
                  placeholder="Ej. Samsung, LG, Midea"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Modelo</label>
                <input
                  type="text"
                  required
                  value={form.modelo}
                  onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                  placeholder="Ej. Wind-Free, Dualcool"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Capacidad (BTU)</label>
                  <select
                    value={form.btu}
                    onChange={(e) => setForm({ ...form, btu: Number(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  >
                    <option value={9000}>9,000 BTU</option>
                    <option value={12000}>12,000 BTU</option>
                    <option value={18000}>18,000 BTU</option>
                    <option value={24000}>24,000 BTU</option>
                    <option value={36000}>36,000 BTU</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Ubicación</label>
                  <input
                    type="text"
                    required
                    value={form.ubicacion}
                    onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
                    placeholder="Ej. Dormitorio, Living"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {submitting ? "Registrando..." : "Registrar Equipo →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
