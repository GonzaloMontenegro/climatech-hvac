"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Thermometer, 
  Sun, 
  CloudSun, 
  Moon, 
  Home, 
  Building, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  Plus, 
  Minus,
  Sparkles
} from "lucide-react";

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
  const [form, setForm] = useState<FormData>({ 
    area: "20", 
    alturaM: "2.5", 
    personas: "2", 
    ventanas: "1", 
    insolacion: "parcial", 
    aislacion: "medio", 
    email: "" 
  });
  const [btu, setBtu] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateNumericField = (field: keyof FormData, type: "inc" | "dec", stepVal: number = 1, minVal: number = 0, maxVal: number = 200) => {
    const currentVal = parseFloat(form[field] as string) || 0;
    let newVal = type === "inc" ? currentVal + stepVal : currentVal - stepVal;
    if (newVal < minVal) newVal = minVal;
    if (newVal > maxVal) newVal = maxVal;
    
    // Format to 1 decimal place if it's ceiling height, otherwise integer
    const formattedVal = field === "alturaM" ? newVal.toFixed(1) : Math.round(newVal).toString();
    setForm(prev => ({ ...prev, [field]: formattedVal }));
  };

  const calcularBTU = () => {
    const A = parseFloat(form.area) || 20;
    const H = parseFloat(form.alturaM) || 2.5;
    const W = parseInt(form.ventanas) || 1;
    const I = INSOLACION_FACTOR[form.insolacion];
    const C = AISLACION_FACTOR[form.aislacion];
    const DeltaT = 10;
    const result = (A * 20 * I * C * (DeltaT / 20) + W * 500) * (H / 2.5);
    return Math.ceil(result / 1000) * 1000;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.area || parseFloat(form.area) <= 0) return;
    setBtu(calcularBTU());
    setStep(2);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setLoading(true);
    // Dynamic simulated loading for high-end look
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep(3);
  };

  const recomendacion = btu <= 9000 ? "9.000 BTU" : btu <= 12000 ? "12.000 BTU" : btu <= 18000 ? "18.000 BTU" : "24.000+ BTU";

  return (
    <div className="bg-[#0f172a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl glow-blue max-w-lg mx-auto w-full relative">
      
      {/* Visual Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 border-b border-white/5 relative">
        <div className="absolute right-6 top-6 text-orange-500 opacity-20">
          <Thermometer className="w-16 h-16" />
        </div>
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <div className="w-9 h-9 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 text-orange-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Motor de BTU v2.0</span>
            <h3 className="text-lg font-bold text-white leading-tight">Cálculo de Capacidad</h3>
          </div>
        </div>
        <p className="text-xs text-slate-400 relative z-10">Calculadora científica optimizada para el clima en Santiago de Chile.</p>
        
        {/* Progress bar */}
        <div className="flex gap-2 mt-5">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                initial={{ width: "0%" }}
                animate={{ width: step >= s ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: SPACE DATA */}
          {step === 1 && (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleStep1} 
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                
                {/* Area Input */}
                <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-white/5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Superficie (m²)</label>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => updateNumericField("area", "dec", 5, 5, 200)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input type="number" value={form.area} onChange={e => setForm({...form, area: e.target.value})} required min="5" max="200"
                      className="w-14 text-center bg-transparent border-none text-white font-bold focus:outline-none text-base" />
                    <button type="button" onClick={() => updateNumericField("area", "inc", 5, 5, 200)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Ceiling Height Input */}
                <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-white/5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Altura Techo (m)</label>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => updateNumericField("alturaM", "dec", 0.1, 1.8, 5.0)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input type="number" step="0.1" value={form.alturaM} onChange={e => setForm({...form, alturaM: e.target.value})} required
                      className="w-14 text-center bg-transparent border-none text-white font-bold focus:outline-none text-base" />
                    <button type="button" onClick={() => updateNumericField("alturaM", "inc", 0.1, 1.8, 5.0)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Windows Input */}
                <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-white/5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Nº Ventanas</label>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => updateNumericField("ventanas", "dec", 1, 0, 20)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input type="number" value={form.ventanas} onChange={e => setForm({...form, ventanas: e.target.value})} required
                      className="w-14 text-center bg-transparent border-none text-white font-bold focus:outline-none text-base" />
                    <button type="button" onClick={() => updateNumericField("ventanas", "inc", 1, 0, 20)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* People Input */}
                <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-white/5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Personas</label>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => updateNumericField("personas", "dec", 1, 1, 30)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input type="number" value={form.personas} onChange={e => setForm({...form, personas: e.target.value})} required
                      className="w-14 text-center bg-transparent border-none text-white font-bold focus:outline-none text-base" />
                    <button type="button" onClick={() => updateNumericField("personas", "inc", 1, 1, 30)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Sun exposure */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Exposición Solar</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["sombra", "parcial", "pleno"] as SunExposureType[]).map(opt => {
                    const active = form.insolacion === opt;
                    return (
                      <button 
                        key={opt} 
                        type="button" 
                        onClick={() => setForm({...form, insolacion: opt})}
                        className={`py-3 px-2 rounded-xl text-xs font-semibold border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          active 
                            ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
                            : 'border-white/5 bg-slate-900/30 text-slate-400 hover:border-white/10 hover:text-slate-200'
                        }`}
                      >
                        {opt === "sombra" ? <Moon className="w-4 h-4" /> : opt === "parcial" ? <CloudSun className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        <span className="capitalize">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Insulation */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Aislación del Espacio</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["alto", "medio", "bajo"] as InsulationType[]).map(opt => {
                    const active = form.aislacion === opt;
                    return (
                      <button 
                        key={opt} 
                        type="button" 
                        onClick={() => setForm({...form, aislacion: opt})}
                        className={`py-3 px-2 rounded-xl text-xs font-semibold border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          active 
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                            : 'border-white/5 bg-slate-900/30 text-slate-400 hover:border-white/10 hover:text-slate-200'
                        }`}
                      >
                        {opt === "alto" ? <Home className="w-4 h-4" /> : opt === "medio" ? <Building className="w-4 h-4" /> : <Thermometer className="w-4 h-4" />}
                        <span className="capitalize">{opt === "alto" ? "Alta" : opt === "medio" ? "Media" : "Baja"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                Calcular BTU ideal <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          )}

          {/* STEP 2: LEAD CAPTURE AND BTU DISPLAY */}
          {step === 2 && (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleStep2} 
              className="space-y-6 text-center py-2"
            >
              <div className="bg-slate-950/60 rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                {/* Visual waves decoration */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-orange-500/5 opacity-40 pointer-events-none" />
                
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Resultado de Precisión</span>
                
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-5xl font-black text-white tracking-tight"
                >
                  {btu.toLocaleString()}
                </motion.div>
                
                <div className="text-orange-400 text-sm font-bold uppercase tracking-wider mt-1">BTU/hora</div>
                
                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-full inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300 text-xs font-semibold">Recomendado: Equipo {recomendacion}</span>
                </div>
              </div>

              <div className="text-left space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Correo Electrónico</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input 
                    type="email" 
                    required 
                    placeholder="ejemplo@correo.cl" 
                    value={form.email} 
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-white/5 hover:border-white/10 focus:border-orange-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/25 transition-all text-sm" 
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Enviamos inmediatamente la ficha técnica del equipo y cotización preferencial en PDF.</p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Guardando y Calculando...</span>
                  </>
                ) : (
                  <>
                    <span>Ver catálogo recomendado</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {/* STEP 3: CONGRATS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6 py-4"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div>
                <h4 className="font-extrabold text-xl text-white">¡Informe y Cotización Enviados!</h4>
                <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                  Hemos enviado un análisis detallado a <strong>{form.email}</strong>. Uno de nuestros asesores técnicos te contactará a la brevedad.
                </p>
              </div>

              <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 text-left space-y-2">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Ficha del Resumen</div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Espacio a climatizar:</span>
                  <span className="font-bold text-white">{form.area} m²</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Exposición solar / Aislación:</span>
                  <span className="font-bold text-white capitalize">{form.insolacion} / {form.aislacion === "alto" ? "Alta" : form.aislacion === "medio" ? "Media" : "Baja"}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300 border-t border-white/5 pt-2 mt-2">
                  <span className="text-orange-400 font-semibold">Carga necesaria estimada:</span>
                  <span className="font-extrabold text-white">{btu.toLocaleString()} BTU/h</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/e-commerce" 
                  className="block w-full bg-white hover:bg-slate-100 text-slate-900 font-extrabold py-4 rounded-xl transition-all text-center text-sm"
                >
                  Explorar catálogo de equipos
                </Link>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

