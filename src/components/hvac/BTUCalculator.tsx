"use client";
import { useState } from "react";

type InsulationType = "bajo" | "medio" | "alto";
type SunExposureType = "sombra" | "parcial" | "pleno";

interface FormData {
  area: string;
  alturaM: string;
  personas: string;
  ventanas: string;
  insolacion: SunExposureType;
  aislacion: InsulationType;
  email: string;
}

const INSOLACION_FACTOR: Record<SunExposureType, number> = { sombra: 0.8, parcial: 1.0, pleno: 1.3 };
const AISLACION_FACTOR: Record<InsulationType, number> = { alto: 0.85, medio: 1.0, bajo: 1.2 };

export function BTUCalculator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>({ area: "", alturaM: "2.5", personas: "2", ventanas: "2", insolacion: "parcial", aislacion: "medio", email: "" });
  const [btu, setBtu] = useState(0);
  const [loading, setLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const calcularBTU = () => {
    const A = parseFloat(form.area) || 20;
    const H = parseFloat(form.alturaM) || 2.5;
    const W = parseInt(form.ventanas) || 2;
    const I = INSOLACION_FACTOR[form.insolacion];
    const C = AISLACION_FACTOR[form.aislacion];
    const DeltaT = 10;
    const result = (A * 20 * I * C * (DeltaT / 20) + W * 500) * (H / 2.5);
    return Math.ceil(result / 1000) * 1000;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.area) return;
    setBtu(calcularBTU());
    setStep(2);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLeadSaved(true);
    setLoading(false);
    setStep(3);
  };

  const recomendacion = btu <= 9000 ? "9.000 BTU" : btu <= 12000 ? "12.000 BTU" : btu <= 18000 ? "18.000 BTU" : "24.000+ BTU";

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden max-w-lg mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm font-bold">🌡</div>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Motor de BTU</span>
        </div>
        <h3 className="text-xl font-bold">¿Qué capacidad necesitas?</h3>
        <p className="text-sm text-slate-400 mt-1">Calculadora científica HVAC — gratuita</p>
        {/* Steps */}
        <div className="flex gap-2 mt-4">
          {[1,2,3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-orange-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* PASO 1: Datos del espacio */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-4 animate-fade-in-up">
            <p className="text-sm text-slate-500 mb-2">Ingresa las características del espacio a climatizar:</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Superficie (m²) *</label>
                <input type="number" placeholder="Ej: 20" value={form.area} onChange={e => setForm({...form, area: e.target.value})} required min="5" max="200"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Altura de techo (m)</label>
                <input type="number" placeholder="2.5" step="0.1" value={form.alturaM} onChange={e => setForm({...form, alturaM: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nº ventanas</label>
                <input type="number" min="0" max="20" value={form.ventanas} onChange={e => setForm({...form, ventanas: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Personas</label>
                <input type="number" min="1" max="20" value={form.personas} onChange={e => setForm({...form, personas: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Exposición solar</label>
              <div className="grid grid-cols-3 gap-2">
                {(["sombra", "parcial", "pleno"] as SunExposureType[]).map(opt => (
                  <button key={opt} type="button" onClick={() => setForm({...form, insolacion: opt})}
                    className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${form.insolacion === opt ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                    {opt === "sombra" ? "🌑 Sombra" : opt === "parcial" ? "🌤 Parcial" : "☀️ Pleno"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Aislación del espacio</label>
              <div className="grid grid-cols-3 gap-2">
                {(["alto", "medio", "bajo"] as InsulationType[]).map(opt => (
                  <button key={opt} type="button" onClick={() => setForm({...form, aislacion: opt})}
                    className={`py-2 rounded-xl text-xs font-semibold border-2 transition-all ${form.aislacion === opt ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                    {opt === "alto" ? "🏠 Alta" : opt === "medio" ? "🏢 Media" : "🏗 Baja"}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/25 mt-2">
              Calcular mi BTU ideal →
            </button>
          </form>
        )}

        {/* PASO 2: Captura de lead */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="space-y-5 animate-fade-in-up text-center">
            <div className="bg-slate-900 rounded-2xl p-6">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Tu espacio necesita</p>
              <div className="text-5xl font-black text-white">{calcularBTU().toLocaleString()}</div>
              <div className="text-orange-400 font-bold">BTU/hora</div>
              <div className="mt-3 px-4 py-2 bg-orange-500/20 rounded-full inline-block">
                <span className="text-orange-300 text-sm font-semibold">Recomendado: Equipo {recomendacion}</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-600 mb-3">Ingresa tu correo para ver los equipos disponibles y recibir una cotización personalizada:</p>
              <input type="email" required placeholder="tu@correo.cl" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/25">
              {loading ? "Guardando..." : "Ver equipos recomendados →"}
            </button>
          </form>
        )}

        {/* PASO 3: Resultado final */}
        {step === 3 && (
          <div className="text-center space-y-5 animate-fade-in-up">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto">✅</div>
            <div>
              <h4 className="font-bold text-lg text-slate-800">¡Cotización enviada!</h4>
              <p className="text-sm text-slate-500 mt-1">Revisamos tu solicitud y te contactamos en menos de 2 horas hábiles.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-left">
              <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-2">Resumen de tu consulta</p>
              <p className="text-sm text-slate-700">Espacio: <strong>{form.area} m²</strong> · Exposición: <strong>{form.insolacion}</strong></p>
              <p className="text-sm text-slate-700 mt-1">Capacidad óptima: <strong>{calcularBTU().toLocaleString()} BTU</strong></p>
              <p className="text-sm text-slate-700 mt-1">Email: <strong>{form.email}</strong></p>
            </div>
            <a href="/e-commerce" className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all">
              Ver catálogo HVAC →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
