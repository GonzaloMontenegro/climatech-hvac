import type { Metadata } from "next";
import Link from "next/link";
import { BTUCalculator } from "@/components/hvac/BTUCalculator";

export const metadata: Metadata = {
  title: "ClimaTech | Mantenimiento de Aire Acondicionado en Santiago",
  description:
    "Empresa especializada en mantenimiento preventivo, correctivo y limpieza de equipos de aire acondicionado en Santiago. Técnicos certificados, respuesta garantizada en 24h. Atendemos Recoleta, Providencia, Las Condes, Ñuñoa y más.",
  keywords: [
    "mantenimiento aire acondicionado Santiago",
    "servicio HVAC Santiago",
    "técnico aire acondicionado",
    "limpieza aire acondicionado",
    "mantenimiento preventivo HVAC",
    "Recoleta",
    "Providencia",
    "Las Condes",
  ],
  openGraph: {
    title: "ClimaTech | Mantenimiento de Aire Acondicionado en Santiago",
    description:
      "Técnicos certificados para el mantenimiento de tus equipos HVAC. Respuesta en 24h. Servicio en toda la Región Metropolitana norte.",
    type: "website",
    locale: "es_CL",
  },
};

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
    icon: "🔧",
    titulo: "Mantenimiento Preventivo",
    desc: "Revisión completa del sistema, limpieza interna y verificación eléctrica para prevenir fallas antes de que ocurran.",
    precio: "Desde $35.000",
    color: "blue",
  },
  {
    icon: "🛠️",
    titulo: "Mantenimiento Correctivo",
    desc: "Diagnóstico y reparación de fallas. Identificamos el problema y lo resolvemos con repuestos originales.",
    precio: "Cotización en visita",
    color: "orange",
  },
  {
    icon: "💧",
    titulo: "Limpieza de Filtros",
    desc: "Limpieza profunda de filtros y evaporador. Mejora la calidad del aire y aumenta la eficiencia energética hasta un 30%.",
    precio: "Desde $18.000",
    color: "teal",
  },
  {
    icon: "🧊",
    titulo: "Carga de Gas Refrigerante",
    desc: "Recarga de gas R32 o R410A certificada. Recuperamos el rendimiento original de tu equipo.",
    precio: "Desde $45.000",
    color: "purple",
  },
  {
    icon: "⚡",
    titulo: "Revisión Eléctrica",
    desc: "Inspección de instalación eléctrica, breakers y conexiones del equipo. Cumplimiento normas SEC.",
    precio: "Desde $25.000",
    color: "yellow",
  },
  {
    icon: "📦",
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

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
  green: "bg-green-50 text-green-600 border-green-100",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-black">❄</span>
            </div>
            <span className="font-black text-blue-950 text-xl tracking-tight">ClimaTech</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#servicios" className="hover:text-blue-900 transition-colors">Servicios</a>
            <a href="#proceso" className="hover:text-blue-900 transition-colors">¿Cómo funciona?</a>
            <a href="#calculadora" className="hover:text-blue-900 transition-colors">Calculadora BTU</a>
            <a href="#comunas" className="hover:text-blue-900 transition-colors">Zonas</a>
          </nav>
          <Link
            href="/login"
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/25"
          >
            Mi Cuenta
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-gradient min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-blue-200 text-xs font-semibold tracking-widest uppercase">
              Servicio activo en Santiago
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Mantenimiento{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
              de Excelencia
            </span>
          </h1>
          <p className="text-blue-200 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Técnicos certificados SEC para el mantenimiento preventivo y
            correctivo de tus equipos de aire acondicionado. Respuesta
            garantizada en menos de 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/registro"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-orange-600/30 text-base"
            >
              Agendar servicio gratis →
            </Link>
            <a
              href="#servicios"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all text-base"
            >
              Ver servicios
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto px-6 pb-16">
          {[
            { n: "+500", label: "Servicios realizados" },
            { n: "4.9★", label: "Satisfacción clientes" },
            { n: "24h", label: "Tiempo de respuesta" },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div className="text-3xl font-black text-white">{s.n}</div>
              <div className="text-blue-300 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">
              Lo que hacemos
            </p>
            <h2 className="text-4xl font-black text-blue-950">
              Servicios de mantenimiento
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Atendemos todo tipo de equipos de climatización residencial y
              comercial con técnicos certificados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIOS.map((s) => (
              <div
                key={s.titulo}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 border ${colorMap[s.color]}`}
                >
                  {s.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-900 transition-colors">
                  {s.titulo}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  {s.precio}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-orange-600/25"
            >
              Agendar servicio ahora →
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="py-24 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">
              Simple y transparente
            </p>
            <h2 className="text-4xl font-black text-blue-950">
              ¿Cómo funciona?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROCESO.map((p, i) => (
              <div key={p.n} className="relative">
                {i < PROCESO.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-slate-300 -translate-x-4 z-0" />
                )}
                <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 z-10">
                  <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-lg mb-6">
                    {p.n}
                  </div>
                  <h3 className="font-bold text-blue-950 text-xl mb-3">{p.titulo}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA BTU */}
      <section id="calculadora" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">
              Herramienta gratuita
            </p>
            <h2 className="text-4xl font-black text-blue-950">
              ¿Cuántos BTU necesita tu espacio?
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Calcula la capacidad ideal para tu ambiente y agenda un diagnóstico
              gratuito con nuestros técnicos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  icon: "📐",
                  c: "bg-orange-100 text-orange-600",
                  t: "Fórmula científica ASHRAE",
                  d: "Consideramos área, altura, insolación, ventanas y aislación térmica para un cálculo de precisión milimétrica.",
                },
                {
                  icon: "🔧",
                  c: "bg-blue-100 text-blue-600",
                  t: "Diagnóstico técnico incluido",
                  d: "Con el resultado en mano, nuestro técnico verificará in situ que tu equipo esté correctamente dimensionado.",
                },
                {
                  icon: "📋",
                  c: "bg-green-100 text-green-600",
                  t: "Recomendación personalizada",
                  d: "Ingresa tu correo y recibirás un informe técnico detallado con recomendaciones de mantenimiento para tu equipo.",
                },
              ].map((item) => (
                <div key={item.t} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 ${item.c} rounded-xl flex items-center justify-center text-lg flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.t}</h3>
                    <p className="text-sm text-slate-500 mt-1">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <BTUCalculator />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">
              Opiniones reales
            </p>
            <h2 className="text-4xl font-black text-blue-950">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIOS.map((t) => (
              <div
                key={t.nombre}
                className="bg-white rounded-2xl p-7 border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.estrellas }).map((_, i) => (
                    <span key={i} className="text-orange-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                  "{t.texto}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm">
                    {t.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.nombre}</p>
                    <p className="text-xs text-slate-400">{t.ubicacion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNAS */}
      <section id="comunas" className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            Cobertura
          </p>
          <h2 className="text-4xl font-black text-white mb-4">
            Zonas de servicio activas
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-12">
            Técnicos certificados disponibles en toda la Región Metropolitana
            norte. Respuesta garantizada en menos de 24 horas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {COMUNAS.map((c) => (
              <Link
                key={c}
                href={`/climatizacion/mantenimiento/${c.toLowerCase().replace(/ /g, "-")}`}
                className="bg-white/10 hover:bg-orange-600 border border-white/10 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 bg-orange-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            ¿Tu equipo necesita mantenimiento?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Agenda hoy y un técnico certificado estará en tu domicilio dentro de
            24 horas.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-black py-4 px-10 rounded-xl transition-all hover:bg-orange-50 shadow-xl text-base"
          >
            Agendar servicio gratis →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs">❄</span>
          </div>
          <span className="font-black text-white">ClimaTech HVAC</span>
        </div>
        <p>Recoleta, Santiago de Chile · +56 9 XXXX XXXX · contacto@climatech.cl</p>
        <p className="mt-2 text-xs">© 2025 ClimaTech. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
