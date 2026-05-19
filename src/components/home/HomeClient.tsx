"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Wrench, 
  Settings, 
  Droplet, 
  Zap, 
  Wind, 
  ShieldCheck, 
  Calendar, 
  Star, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Users
} from "lucide-react";
import { BTUCalculator } from "@/components/hvac/BTUCalculator";

const COMUNAS = [
  "Recoleta",
  "Providencia",
  "Santiago Centro",
  "Ñuñoa",
  "Las Condes",
  "Independencia",
];

const SERVICIOS = [
  {
    icon: Wrench,
    titulo: "Mantenimiento Preventivo",
    desc: "Revisión completa del sistema, limpieza interna y verificación eléctrica para prevenir fallas antes de que ocurran.",
    precio: "Desde $35.000",
    color: "blue",
  },
  {
    icon: Settings,
    titulo: "Mantenimiento Correctivo",
    desc: "Diagnóstico y reparación de fallas. Identificamos el problema y lo resolvemos con repuestos originales.",
    precio: "Cotización en visita",
    color: "orange",
  },
  {
    icon: Wind,
    titulo: "Limpieza de Filtros",
    desc: "Limpieza profunda de filtros y evaporador. Mejora la calidad del aire y aumenta la eficiencia energética hasta un 30%.",
    precio: "Desde $18.000",
    color: "teal",
  },
  {
    icon: Droplet,
    titulo: "Carga de Gas Refrigerante",
    desc: "Recarga de gas R32 o R410A certificada. Recuperamos el rendimiento original de tu equipo.",
    precio: "Desde $45.000",
    color: "purple",
  },
  {
    icon: Zap,
    titulo: "Revisión Eléctrica",
    desc: "Inspección de instalación eléctrica, breakers y conexiones del equipo. Cumplimiento normas SEC.",
    precio: "Desde $25.000",
    color: "yellow",
  },
  {
    icon: ShieldCheck,
    titulo: "Instalación de Equipos",
    desc: "Instalación certificada de equipos nuevos con garantía de mano de obra. Incluye prueba de funcionamiento.",
    precio: "Desde $60.000",
    color: "green",
  },
];

const PROCESO = [
  {
    n: "01",
    titulo: "Agenda en línea",
    desc: "Selecciona el tipo de servicio y elige la fecha y hora que más te acomoda. Sin llamadas ni esperas.",
  },
  {
    n: "02",
    titulo: "Técnico certificado",
    desc: "Un técnico con certificación SEC llega a tu domicilio en el horario acordado con todos los materiales necesarios.",
  },
  {
    n: "03",
    titulo: "Servicio con garantía",
    desc: "Realizamos el servicio y te entregamos un informe técnico digital. Todo nuestro trabajo tiene garantía por escrito.",
  },
];

const TESTIMONIOS = [
  {
    nombre: "Ana García",
    ubicacion: "Providencia",
    texto:
      "Excelente servicio. El técnico llegó puntual, explicó todo el proceso y dejó el equipo funcionando perfectamente. Lo recomiendo.",
    estrellas: 5,
  },
  {
    nombre: "Carlos Mendoza",
    ubicacion: "Recoleta",
    texto:
      "Llevaba meses con el aire acondicionado haciendo ruido. En una visita lo solucionaron. Precio justo y profesionalismo total.",
    estrellas: 5,
  },
  {
    nombre: "María López",
    ubicacion: "Las Condes",
    texto:
      "Me inscribí en el plan de mantenimiento anual y la diferencia en la factura de luz fue notable. Vale completamente la pena.",
    estrellas: 5,
  },
];

const colorMap: Record<string, { bg: string, text: string, border: string, glow: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", glow: "hover:shadow-blue-500/10" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", glow: "hover:shadow-orange-500/10" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20", glow: "hover:shadow-teal-500/10" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", glow: "hover:shadow-purple-500/10" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20", glow: "hover:shadow-yellow-500/10" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", glow: "hover:shadow-green-500/10" },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
} as const;

export function HomeClient() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* BACKGROUND DECORATIVE ORBS (ANIMATED) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px]"
        />
        <motion.div 
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-600/5 blur-[150px]"
        />
        <motion.div 
          animate={{
            x: [0, 20, -30, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-sky-500/5 blur-[130px]"
        />
      </div>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
              <span className="text-white text-base font-black">❄</span>
            </div>
            <span className="font-black text-white text-xl tracking-tight">
              Clima<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Tech</span>
            </span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#servicios" className="hover:text-white transition-colors relative group py-1">
              Servicios
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#proceso" className="hover:text-white transition-colors relative group py-1">
              ¿Cómo funciona?
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#calculadora" className="hover:text-white transition-colors relative group py-1">
              Calculadora BTU
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#comunas" className="hover:text-white transition-colors relative group py-1">
              Zonas
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-orange-600/25 flex items-center gap-2"
            >
              Mi Cuenta
            </Link>
          </motion.div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 z-10">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-blue-300 text-xs font-semibold tracking-wider uppercase">
              Servicio activo en Santiago de Chile
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight"
          >
            Mantenimiento HVAC
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300">
              de Excelencia
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Técnicos certificados SEC para el cuidado preventivo, correctivo e instalación de tus equipos. Garantía de funcionamiento y respuesta ágil en 24h.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 max-w-md mx-auto sm:max-w-none"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/registro"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-orange-600/30 text-base"
              >
                Agendar servicio gratis <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <a
                href="#servicios"
                className="w-full sm:w-auto inline-flex justify-center items-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 px-8 rounded-xl transition-all text-base backdrop-blur-sm"
              >
                Ver servicios
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 mt-20 grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto px-6 w-full"
        >
          {[
            { n: "+500", label: "Servicios realizados", icon: Sparkles },
            { n: "4.9★", label: "Opiniones clientes", icon: Star },
            { n: "24h", label: "Tiempo respuesta", icon: Calendar },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="text-center p-4 rounded-2xl glass-premium-light">
                <div className="inline-flex p-2 bg-white/5 rounded-lg mb-2 text-orange-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">{s.n}</div>
                <div className="text-slate-400 text-xs md:text-sm mt-1">{s.label}</div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-28 px-6 bg-[#0b101d] relative z-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3"
            >
              Nuestra Especialidad
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-black text-white tracking-tight"
            >
              Servicios de climatización profesional
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base"
            >
              Nos hacemos cargo de todo el ciclo de vida de tus equipos de climatización comercial y residencial.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICIOS.map((s) => {
              const IconComp = s.icon;
              const theme = colorMap[s.color] || colorMap.blue;
              return (
                <motion.div
                  key={s.titulo}
                  variants={fadeInUpVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`glass-premium p-6 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${theme.glow}`}
                >
                  {/* Decorative faint glow inside */}
                  <div className="absolute -right-10 -top-10 w-24 h-24 bg-white/2 rounded-full blur-xl pointer-events-none group-hover:bg-white/5 transition-all" />

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${theme.bg} ${theme.text} ${theme.border}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-orange-400 transition-colors">
                    {s.titulo}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[72px]">
                    {s.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
                      {s.precio}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-slate-300 flex items-center gap-1 transition-colors">
                      Saber más <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center mt-16">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/registro"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-orange-600/20"
              >
                Agendar servicio ahora <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="py-28 px-6 bg-[#090d16] relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3"
            >
              Fácil e Inmediato
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-white"
            >
              ¿Cómo funciona?
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {PROCESO.map((p, i) => (
              <motion.div 
                key={p.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-slate-900/30 backdrop-blur-md rounded-2xl p-8 border border-white/5 flex flex-col h-full group hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-xl flex items-center justify-center text-white font-black text-lg mb-6 shadow-md shadow-orange-500/10 group-hover:scale-110 transition-transform">
                  {p.n}
                </div>
                <h3 className="font-bold text-white text-xl mb-3">{p.titulo}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA BTU */}
      <section id="calculadora" className="py-28 px-6 bg-[#0b101d] relative z-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3"
            >
              Herramienta Gratuita
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-white"
            >
              ¿Cuántos BTU necesita tu espacio?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-400 mt-3 max-w-xl mx-auto text-sm"
            >
              Calcula la capacidad exacta para tu ambiente y recibe recomendaciones técnicas de inmediato.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: Sparkles,
                  c: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                  t: "Cálculo ASHRAE Integrado",
                  d: "Consideramos el área exacta, la altura del cielo, ventanas y el nivel de exposición solar para darte el valor ideal.",
                },
                {
                  icon: Wrench,
                  c: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                  t: "Diagnóstico Técnico Rápido",
                  d: "Un especialista certificado revisará los resultados in situ para sugerirte marcas que optimicen el consumo energético.",
                },
                {
                  icon: Users,
                  c: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  t: "Recomendaciones Personalizadas",
                  d: "Además de ver el resultado en pantalla, te enviamos a tu bandeja de correo un reporte detallado con las mejores opciones.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={item.t} 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-12 h-12 ${item.c} border rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{item.t}</h3>
                      <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* CALCULATOR WRAPPER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glow-orange rounded-3xl"
            >
              <BTUCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-28 px-6 bg-[#090d16] relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3"
            >
              Opiniones de Clientes
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-white"
            >
              Lo que opinan de ClimaTech
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIOS.map((t) => (
              <motion.div
                key={t.nombre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-slate-900/30 backdrop-blur-md rounded-2xl p-7 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-orange-400">
                    {Array.from({ length: t.estrellas }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                    &quot;{t.texto}&quot;
                  </p>
                </div>
                
                <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
                  <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full flex items-center justify-center font-bold text-sm">
                    {t.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.nombre}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-400" /> {t.ubicacion}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNAS */}
      <section id="comunas" className="py-28 px-6 bg-[#0b101d] relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3"
          >
            Cobertura
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-white mb-4"
          >
            Zonas de servicio activas
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto mb-12 text-sm"
          >
            Técnicos certificados disponibles en toda la Región Metropolitana norte. Agenda online en 2 clics.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {COMUNAS.map((c) => (
              <motion.div key={c} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/climatizacion/mantenimiento/${c.toLowerCase().replace(/ /g, "-")}`}
                  className="inline-block bg-white/5 hover:bg-orange-600 border border-white/10 hover:border-orange-500 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm backdrop-blur-sm shadow-md"
                >
                  {c}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-gradient-to-r from-orange-600 to-amber-500 relative z-10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        {/* Faint circles */}
        <div className="absolute top-[-50%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-white mb-4 tracking-tight"
          >
            ¿Tu equipo de climatización necesita mantención?
          </motion.h2>
          <p className="text-orange-50/90 text-lg mb-8 max-w-xl mx-auto">
            Garantiza una temperatura óptima y reduce el consumo eléctrico. Reserva en 1 minuto.
          </p>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-black py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-2xl text-base"
            >
              Agendar servicio gratis <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#05080f] text-slate-500 py-16 px-6 text-center text-sm border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">❄</span>
            </div>
            <span className="font-black text-white text-base tracking-tight">ClimaTech HVAC</span>
          </div>
          <p className="text-slate-400">Recoleta, Santiago de Chile · +56 9 XXXX XXXX · contacto@climatech.cl</p>
          <p className="mt-4 text-xs text-slate-600">© 2026 ClimaTech. Todos los derechos reservados. Diseñado bajo estándares corporativos premium.</p>
        </div>
      </footer>
    </div>
  );
}
