import Link from "next/link";
import { BTUCalculator } from "@/components/hvac/BTUCalculator";
import { MOCK_EQUIPOS } from "@/lib/mockData";

const COMUNAS = ["Recoleta", "Providencia", "Santiago Centro", "Ñuñoa", "Las Condes", "Independencia"];

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
            <a href="#calculadora" className="hover:text-blue-900 transition-colors">Calculadora BTU</a>
            <Link href="/e-commerce" className="hover:text-blue-900 transition-colors">Catálogo</Link>
            <a href="#comunas" className="hover:text-blue-900 transition-colors">Zonas de Servicio</a>
          </nav>
          <Link href="/login"
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-orange-600/25">
            Acceder
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-gradient min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden pt-20">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-blue-200 text-xs font-semibold tracking-widest uppercase">Servicio activo en Santiago</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Climatización <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">Inteligente</span>
          </h1>
          <p className="text-blue-200 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Instalación certificada, mantenimiento predictivo y equipos de alta eficiencia energética. Atendemos Recoleta, Providencia y Santiago Centro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="#calculadora"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-orange-600/30 text-base">
              Calcular mis BTU gratis
            </a>
            <Link href="/e-commerce"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all text-base">
              Ver catálogo →
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto px-6 pb-16">
          {[
            { n: "+500", label: "Instalaciones" },
            { n: "4.9★", label: "Satisfacción" },
            { n: "5 años", label: "Garantía" },
          ].map(s => (
            <div key={s.n} className="text-center">
              <div className="text-3xl font-black text-white">{s.n}</div>
              <div className="text-blue-300 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CALCULADORA BTU */}
      <section id="calculadora" className="py-24 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">Herramienta gratuita</p>
            <h2 className="text-4xl font-black text-blue-950">Calcula tu BTU ideal</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Algoritmo científico de la industria HVAC. Ingresa los datos de tu espacio y obtén la capacidad exacta necesaria.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 text-lg flex-shrink-0">📐</div>
                <div>
                  <h3 className="font-bold text-slate-800">Fórmula científica ASHRAE</h3>
                  <p className="text-sm text-slate-500 mt-1">Consideramos área, altura, insolación, ventanas y aislación térmica para un cálculo de precisión milimétrica.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-lg flex-shrink-0">⚡</div>
                <div>
                  <h3 className="font-bold text-slate-800">Equipos compatibles al instante</h3>
                  <p className="text-sm text-slate-500 mt-1">Una vez calculada la capacidad, te mostramos los modelos de nuestro catálogo que se ajustan perfectamente.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-lg flex-shrink-0">🔒</div>
                <div>
                  <h3 className="font-bold text-slate-800">Cotización personalizada</h3>
                  <p className="text-sm text-slate-500 mt-1">Ingresa tu correo y recibirás una propuesta formal del equipo técnico en menos de 2 horas hábiles.</p>
                </div>
              </div>
            </div>
            <BTUCalculator />
          </div>
        </div>
      </section>

      {/* CATÁLOGO PREVIEW */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">Catálogo 2025</p>
              <h2 className="text-4xl font-black text-blue-950">Equipos destacados</h2>
            </div>
            <Link href="/e-commerce" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors hidden md:block">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_EQUIPOS.map((eq) => (
              <Link key={eq.id} href={`/e-commerce/${eq.id}`}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all group">
                <div className="w-full h-32 rounded-xl mb-4 flex items-center justify-center text-5xl"
                  style={{ background: `${eq.color}15` }}>
                  ❄️
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase">{eq.marca}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full sec-label-${eq.eficiencia.replace('+','').replace('+','')}`}>
                    {eq.eficiencia}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-900 transition-colors">
                  {eq.modelo}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{eq.capacidadBTU.toLocaleString()} BTU</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-black text-blue-900 text-base">
                    ${eq.precioCLP.toLocaleString("es-CL")}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${eq.stock > 5 ? 'bg-green-400' : eq.stock > 0 ? 'bg-orange-400' : 'bg-red-400'}`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNAS */}
      <section id="comunas" className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">Cobertura</p>
          <h2 className="text-4xl font-black text-white mb-4">Zonas de servicio activas</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-12">Técnicos certificados disponibles en toda la Región Metropolitana norte. Respuesta garantizada en menos de 24 horas.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {COMUNAS.map(c => (
              <Link key={c} href={`/climatizacion/instalacion/${c.toLowerCase().replace(" ", "-")}`}
                className="bg-white/10 hover:bg-orange-600 border border-white/10 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center"><span className="text-white text-xs">❄</span></div>
          <span className="font-black text-white">ClimaTech HVAC</span>
        </div>
        <p>Recoleta, Santiago de Chile · +56 9 XXXX XXXX · contacto@climatech.cl</p>
        <p className="mt-2 text-xs">© 2025 ClimaTech. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
