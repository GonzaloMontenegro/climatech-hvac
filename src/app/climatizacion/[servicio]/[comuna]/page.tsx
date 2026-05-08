import type { Metadata } from "next";
import Link from "next/link";
import { LocalSchema } from "@/components/seo/LocalSchema";

const COMUNAS_DATA: Record<string, { nombre: string; descripcion: string; barrios: string[] }> = {
  recoleta: { nombre: "Recoleta", descripcion: "Servicio HVAC de emergencia y mantenimiento en Recoleta. Técnicos certificados disponibles 24/7.", barrios: ["Barrio Italia", "Patronato", "Cementerio General"] },
  providencia: { nombre: "Providencia", descripcion: "Instalación y mantenimiento de equipos de climatización en Providencia con garantía SEC.", barrios: ["Manuel Montt", "Pedro de Valdivia", "Baquedano"] },
  "santiago-centro": { nombre: "Santiago Centro", descripcion: "Soluciones HVAC para oficinas y departamentos en el centro de Santiago.", barrios: ["Plaza de Armas", "Santa Isabel", "República"] },
  independencia: { nombre: "Independencia", descripcion: "Servicio de climatización residencial y comercial en Independencia.", barrios: ["La Chimba", "Vivaceta", "Reyes Católicos"] },
  "las-condes": { nombre: "Las Condes", descripcion: "Mantenimiento predictivo y reparación de equipos HVAC en Las Condes.", barrios: ["Apoquindo", "El Golf", "La Dehesa"] },
};

type Props = { params: Promise<{ servicio: string; comuna: string }> };

export async function generateStaticParams() {
  const servicios = ["instalacion", "mantenimiento", "reparacion"];
  const comunas = Object.keys(COMUNAS_DATA);
  return servicios.flatMap(s => comunas.map(c => ({ servicio: s, comuna: c })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servicio, comuna } = await params;
  const comunaData = COMUNAS_DATA[comuna];
  if (!comunaData) return { title: "ClimaTech HVAC" };
  const svcLabel = servicio.charAt(0).toUpperCase() + servicio.slice(1);
  return {
    title: `${svcLabel} de Aire Acondicionado en ${comunaData.nombre} | ClimaTech HVAC`,
    description: `${comunaData.descripcion} Servicio urgente disponible. ☎ +56 9 XXXX XXXX`,
  };
}

export default async function ComunaPage({ params }: Props) {
  const { servicio, comuna } = await params;
  const comunaData = COMUNAS_DATA[comuna];
  if (!comunaData) return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Zona no disponible</h1></div>;
  const svcLabel = servicio.charAt(0).toUpperCase() + servicio.slice(1);

  return (
    <>
      <LocalSchema comunaNombre={comunaData.nombre} servicio={svcLabel} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero local */}
        <section className="hero-gradient py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-widest">Servicio disponible en {comunaData.nombre}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {svcLabel} de Aire Acondicionado <br/>en <span className="text-orange-400">{comunaData.nombre}</span>
            </h1>
            <p className="text-blue-200 mt-4">{comunaData.descripcion}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a href="tel:+56900000000"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-7 rounded-xl transition-all shadow-lg">
                ☎ Llamar ahora
              </a>
              <Link href="/#calculadora" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3.5 px-7 rounded-xl transition-all">
                Calcular BTU gratis
              </Link>
            </div>
          </div>
        </section>

        {/* Barrios */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-950 mb-6">Sectores que atendemos en {comunaData.nombre}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {comunaData.barrios.map(b => (
                <div key={b} className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700">
                  📍 {b}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
