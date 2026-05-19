"use client";
import { useState, useEffect } from "react";

const ESTADO_COLORS = {
  activo: "bg-green-100 text-green-700 border border-green-200",
  en_ruta: "bg-blue-100 text-blue-700 border border-blue-200",
  libre: "bg-slate-100 text-slate-500 border border-slate-200",
};

interface Tecnico {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  zona: string;
  rating: number;
  citasHoy: number;
  estado: string;
}

interface Cita {
  id: string;
  tipo: string;
  equipo: string;
  tecnico: string | null;
  fecha: string;
  hora: string;
  estado: string;
}

export default function AsignacionesPage() {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [asignando, setAsignando] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Formulario Técnico
  const [showAddTech, setShowAddTech] = useState(false);
  const [newTech, setNewTech] = useState({ nombre: "", email: "", telefono: "", zona: "" });
  const [submittingTech, setSubmittingTech] = useState(false);

  const fetchData = async () => {
    try {
      const [techRes, citasRes] = await Promise.all([
        fetch("/api/tecnicos"),
        fetch("/api/asignaciones")
      ]);
      const techData = await techRes.json();
      const citasData = await citasRes.json();

      if (Array.isArray(techData)) setTecnicos(techData);
      if (Array.isArray(citasData)) {
        // Mapear campos de base de datos a formato de UI
        setCitas(citasData.map((c: { id: string; tipo: string; equipo?: string; tecnico?: string; fecha: string; hora: string; estado: string }) => ({
          id: c.id,
          tipo: c.tipo,
          equipo: c.equipo || "Equipo General",
          tecnico: c.tecnico || null,
          fecha: c.fecha,
          hora: c.hora,
          estado: c.estado,
        })));
      }
    } catch (err) {
      console.error("Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTechSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingTech(true);

    try {
      const res = await fetch("/api/tecnicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTech),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al agregar técnico");

      setTecnicos((prev) => [...prev, data]);
      setNewTech({ nombre: "", email: "", telefono: "", zona: "" });
      setShowAddTech(false);
    } catch (err: unknown) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmittingTech(false);
    }
  };

  const handleAssign = async (citaId: string) => {
    const selectedTechObj = tecnicos.find(t => t.id === selected);
    if (!selectedTechObj) return;

    setAsignando(citaId);
    try {
      const res = await fetch("/api/asignaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: citaId,
          tecnicoNombre: selectedTechObj.nombre
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al asignar técnico");

      // Recargar datos para ver la asignación reflejada
      await fetchData();
    } catch (err: unknown) {
      alert("Error al asignar: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setAsignando(null);
    }
  };

  const citasPendientes = citas.filter(c => !c.tecnico || c.estado === "pendiente");

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Servicio en Terreno</h1>
          <p className="text-slate-400 mt-1">Asignación de servicios de campo y gestión técnica en tiempo real</p>
        </div>
        <button 
          onClick={() => setShowAddTech(!showAddTech)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/25 text-sm cursor-pointer"
        >
          {showAddTech ? "Cerrar Formulario" : "+ Nuevo Técnico"}
        </button>
      </div>

      {/* Formulario rápido para agregar técnico */}
      {showAddTech && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in-up max-w-xl">
          <h2 className="font-bold text-slate-800 mb-4">Agregar Integrante Técnico</h2>
          <form onSubmit={handleAddTechSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={newTech.nombre} 
                  onChange={(e) => setNewTech({ ...newTech, nombre: e.target.value })}
                  placeholder="Ej. Roberto Pizarro"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={newTech.email} 
                  onChange={(e) => setNewTech({ ...newTech, email: e.target.value })}
                  placeholder="ejemplo@climatech.cl"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  value={newTech.telefono} 
                  onChange={(e) => setNewTech({ ...newTech, telefono: e.target.value })}
                  placeholder="+56 9..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Zona / Comuna</label>
                <input 
                  type="text" 
                  value={newTech.zona} 
                  onChange={(e) => setNewTech({ ...newTech, zona: e.target.value })}
                  placeholder="Providencia / Ñuñoa"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={submittingTech}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              {submittingTech ? "Guardando..." : "Guardar Técnico"}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-sm font-semibold">Cargando información técnica y servicios...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          {/* Panel de técnicos */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-bold text-slate-800">Técnicos disponibles ({tecnicos.length})</h2>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {tecnicos.map(tec => (
                <div key={tec.id} onClick={() => setSelected(selected === tec.id ? null : tec.id)}
                  className={`px-6 py-4 flex items-center gap-3 cursor-pointer transition-all ${selected === tec.id ? 'bg-orange-50/75 border-l-4 border-orange-500' : 'hover:bg-slate-50'}`}>
                  <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700 flex-shrink-0">
                    {tec.nombre.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-800 text-sm truncate">{tec.nombre}</p>
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${ESTADO_COLORS[tec.estado as keyof typeof ESTADO_COLORS] || "bg-slate-100 text-slate-500"}`}>
                        {tec.estado.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{tec.zona}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span>⭐ {tec.rating}</span>
                      <span>📞 {tec.telefono || "Sin teléfono"}</span>
                    </div>
                  </div>
                  {selected === tec.id && <span className="text-orange-600 text-xl font-bold">✓</span>}
                </div>
              ))}
              {tecnicos.length === 0 && (
                <p className="text-slate-400 text-center py-8 text-sm">No hay técnicos disponibles. Agrégalos en el botón superior.</p>
              )}
            </div>
          </div>

          {/* Panel de asignación de citas pendientes */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-bold text-slate-800">Servicios sin asignar</h2>
              <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">
                {citasPendientes.length} pendientes
              </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {citasPendientes.map(cita => (
                <div key={cita.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-850 text-sm">{cita.tipo}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{cita.equipo}</p>
                      <div className="flex gap-3 mt-2 text-xs text-slate-500 font-medium">
                        <span>📅 {new Date(cita.fecha).toLocaleDateString('es-CL')}</span>
                        <span>⏰ {cita.hora}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAssign(cita.id)}
                      disabled={!selected || asignando === cita.id}
                      className={`flex-shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                        selected 
                          ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/25' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      }`}
                    >
                      {asignando === cita.id ? "Asignando..." : "Asignar →"}
                    </button>
                  </div>
                </div>
              ))}
              {citasPendientes.length === 0 && (
                <p className="text-slate-400 text-center py-8 text-sm">No hay servicios pendientes por asignar.</p>
              )}
            </div>
            {!selected && (
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center font-semibold">← Selecciona un técnico para habilitar la asignación</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
