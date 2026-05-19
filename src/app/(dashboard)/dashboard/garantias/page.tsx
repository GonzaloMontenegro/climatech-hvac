"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth/demoAuth";

interface Equipo {
  id: string;
  marca: string;
  modelo: string;
  ubicacion: string;
  instalado: string;
  garantia: string;
}

function ContratoBadge({ tipo }: { tipo: string }) {
  return (
    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
      Contrato {tipo}
    </span>
  );
}

export default function GarantiasPage() {
  const { user } = useAuth();
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-blue-950">Garantías de Mantenimiento</h1>
        <p className="text-slate-400 mt-1">Vigencia de tus coberturas y contratos de servicios activos</p>
      </div>

      {/* Nueva info card de Garantía de Servicio de Mantenimiento */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-start gap-3">
        <span className="text-xl">🛡️</span>
        <div>
          <p className="font-semibold text-orange-900 text-sm">Garantía de Servicio Técnico</p>
          <p className="text-sm text-orange-700 mt-0.5">
            Cada servicio de mantenimiento predictivo o correctivo realizado por nuestro personal autorizado cuenta con una garantía técnica de **90 días**. Esta cubre repuestos instalados y cualquier ajuste de calibración o fugas asociadas a la intervención.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold">Cargando contratos y garantías...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {equipos.map((eq, i) => {
            const tipoContrato = i % 2 === 0 ? "Semestral" : "Anual";
            const finMantenimiento = eq.garantia || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();
            return (
              <div key={eq.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">❄️</div>
                    <div>
                      <h3 className="font-bold text-slate-800">{eq.marca} {eq.modelo}</h3>
                      <p className="text-sm text-slate-400">
                        {eq.ubicacion} · Instalado {new Date(eq.instalado).toLocaleDateString("es-CL")}
                      </p>
                    </div>
                  </div>
                  <ContratoBadge tipo={tipoContrato} />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-400 font-medium">Tipo de Contrato</p>
                    <p className="font-bold text-slate-700 mt-1">{tipoContrato}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-400 font-medium">Inicio Mantenimiento</p>
                    <p className="font-bold text-slate-700 mt-1">
                      {new Date(eq.instalado).toLocaleDateString("es-CL")}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-400 font-medium">Término Cobertura</p>
                    <p className="font-bold text-green-600 mt-1">
                      {new Date(finMantenimiento).toLocaleDateString("es-CL")}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <a
                    href="/dashboard/citas"
                    className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                  >
                    Pagar mantenimiento →
                  </a>
                </div>
              </div>
            );
          })}
          {equipos.length === 0 && (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl">
              <p className="text-slate-400 text-sm">Registra un equipo de aire acondicionado para ver sus garantías y coberturas.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
