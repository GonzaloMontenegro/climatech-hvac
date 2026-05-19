"use client";
import { useState } from "react";

const MAINTENANCE_JOBS = [
  { id: "job-1", equipo: "Samsung Wind-Free Premium 12000 BTU", cliente: "Ana García", tecnico: "Roberto Pizarro", ubicacion: "Las Condes 1230, Apto 502", estado: "completado" },
  { id: "job-2", equipo: "LG Dual Inverter ARTCOOL 18000 BTU", cliente: "Carlos Mendoza", tecnico: "Patricia Jara", ubicacion: "Av. Irarrázaval 3450, Casa 4", estado: "en_curso" },
  { id: "job-3", equipo: "Midea Xtreme Save Pro 9000 BTU", cliente: "Pedro Fuentes", tecnico: "Marcelo Soto", ubicacion: "Providencia 890, Apto 101", estado: "no_iniciado" },
  { id: "job-4", equipo: "Samsung Cassette 360 36000 BTU", cliente: "María López", tecnico: "Roberto Pizarro", ubicacion: "Alameda 2300, Local 12", estado: "nuevo" },
  { id: "job-5", equipo: "LG Premium Split 12000 BTU", cliente: "Juan Riquelme", tecnico: "Claudia Rojas", ubicacion: "Vitacura 5600, Casa 12", estado: "en_curso" },
];

export default function InventarioPage() {
  const [search, setSearch] = useState("");
  const [activeStatusModal, setActiveStatusModal] = useState<string | null>(null);

  // Filtramos por equipo, cliente o técnico
  const filteredJobs = MAINTENANCE_JOBS.filter(job =>
    job.equipo.toLowerCase().includes(search.toLowerCase()) ||
    job.cliente.toLowerCase().includes(search.toLowerCase()) ||
    job.tecnico.toLowerCase().includes(search.toLowerCase())
  );

  const getJobsByStatus = (status: string) => MAINTENANCE_JOBS.filter(j => j.estado === status);

  const counts = {
    completado: getJobsByStatus("completado").length,
    en_curso: getJobsByStatus("en_curso").length,
    no_iniciado: getJobsByStatus("no_iniciado").length,
    nuevo: getJobsByStatus("nuevo").length,
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "completado": return "Equipos Completados";
      case "en_curso": return "En Curso";
      case "no_iniciado": return "No Iniciados";
      case "nuevo": return "Nuevos";
      default: return "";
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Seguimiento de Equipos</h1>
          <p className="text-slate-400 mt-1">Control de estado de mantenimientos y ubicaciones en tiempo real</p>
        </div>
      </div>

      {/* Tarjetas rápidas (clicables para abrir popup) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Completados */}
        <button 
          onClick={() => setActiveStatusModal("completado")}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl">✅</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver →</span>
          </div>
          <p className="text-3xl font-black text-green-600">{counts.completado}</p>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">Equipos Completados</p>
        </button>

        {/* En curso */}
        <button 
          onClick={() => setActiveStatusModal("en_curso")}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl">⏳</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver →</span>
          </div>
          <p className="text-3xl font-black text-blue-600">{counts.en_curso}</p>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">En Curso</p>
        </button>

        {/* No iniciados */}
        <button 
          onClick={() => setActiveStatusModal("no_iniciado")}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl">🛑</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver →</span>
          </div>
          <p className="text-3xl font-black text-orange-600">{counts.no_iniciado}</p>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">No Iniciados</p>
        </button>

        {/* Nuevos */}
        <button 
          onClick={() => setActiveStatusModal("nuevo")}
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl">✨</span>
            <span className="text-xs text-orange-600 font-bold opacity-0 group-hover:opacity-100 transition-all">Ver →</span>
          </div>
          <p className="text-3xl font-black text-amber-500">{counts.nuevo}</p>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">Nuevos</p>
        </button>
      </div>

      {/* Buscador y listado completo */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <span className="text-slate-400 text-sm">🔍</span>
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Buscar por equipo, cliente o técnico a cargo..."
            className="flex-1 outline-none text-sm text-slate-800 placeholder-slate-400 bg-transparent font-medium" 
          />
          <span className="text-xs text-slate-400 font-bold">{filteredJobs.length} resultados</span>
        </div>

        <div className="divide-y divide-slate-150">
          {filteredJobs.map(job => (
            <div key={job.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-sm">{job.equipo}</h3>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    job.estado === 'completado' ? 'bg-green-100 text-green-700' :
                    job.estado === 'en_curso' ? 'bg-blue-100 text-blue-700' :
                    job.estado === 'no_iniciado' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {job.estado.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  <strong>Cliente:</strong> {job.cliente} · <strong>Técnico:</strong> {job.tecnico}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span>📍</span> {job.ubicacion}
                </p>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No se encontraron coincidencias para la búsqueda.
            </div>
          )}
        </div>
      </div>

      {/* POPUP MODAL PARA TARJETAS DE ESTADO */}
      {activeStatusModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-in-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
              <h3 className="font-black text-xl text-blue-950 flex items-center gap-2">
                <span>📋</span> {getStatusLabel(activeStatusModal)}
              </h3>
              <button onClick={() => setActiveStatusModal(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
            </div>
            <div className="space-y-4">
              {getJobsByStatus(activeStatusModal).length > 0 ? (
                getJobsByStatus(activeStatusModal).map((job) => (
                  <div key={job.id} className="border border-slate-150 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800 text-sm">{job.equipo}</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>Cliente:</strong> {job.cliente}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Técnico Asignado:</strong> {job.tecnico}
                    </p>
                    <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-1">
                      <span>📍</span> {job.ubicacion}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 py-6 text-sm">No hay equipos en este estado actualmente.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
