import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";

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

export default function HomePage() {
  return <HomeClient />;
}

