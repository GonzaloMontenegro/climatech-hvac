"use client";
import { useState } from "react";
import { MOCK_EQUIPOS } from "@/lib/mockData";

export default function InventarioPage() {
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = MOCK_EQUIPOS.filter(e =>
    e.marca.toLowerCase().includes(search.toLowerCase()) ||
    e.modelo.toLowerCase().includes(search.toLowerCase()) ||
    e.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Inventario</h1>
          <p className="text-slate-400 mt-1">Gestión de stock y catálogo de equipos</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/25 text-sm">
          + Nuevo Equipo
        </button>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-2xl font-black text-blue-950">{MOCK_EQUIPOS.length}</p>
          <p className="text-xs text-slate-400 mt-1">SKUs activos</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-2xl font-black text-blue-950">{MOCK_EQUIPOS.reduce((a, e) => a + e.stock, 0)}</p>
          <p className="text-xs text-slate-400 mt-1">Unidades en stock</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-2xl font-black text-green-600">{MOCK_EQUIPOS.filter(e => e.stock > 5).length}</p>
          <p className="text-xs text-slate-400 mt-1">En stock óptimo</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-2xl font-black text-orange-600">{MOCK_EQUIPOS.filter(e => e.stock <= 2).length}</p>
          <p className="text-xs text-slate-400 mt-1">Stock crítico</p>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <span className="text-slate-400 text-sm">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por marca, modelo o SKU..."
            className="flex-1 outline-none text-sm text-slate-700 placeholder-slate-400" />
          <span className="text-xs text-slate-400 font-medium">{filtered.length} resultados</span>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Producto</th>
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-right">BTU</th>
              <th className="px-6 py-3 text-right">Precio CLP</th>
              <th className="px-6 py-3 text-center">Eficiencia</th>
              <th className="px-6 py-3 text-center">Stock</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(eq => (
              <tr key={eq.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${eq.color}20` }}>❄️</div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{eq.marca}</p>
                      <p className="text-xs text-slate-400">{eq.modelo}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-mono text-slate-500">{eq.sku}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">{eq.capacidadBTU.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-black text-blue-900 text-right">${eq.precioCLP.toLocaleString("es-CL")}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-xs font-bold px-2 py-1 rounded-full sec-label-A text-white">{eq.eficiencia}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-sm font-black ${eq.stock > 5 ? 'text-green-600' : eq.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                    {eq.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => setEditId(editId === eq.id ? null : eq.id)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
