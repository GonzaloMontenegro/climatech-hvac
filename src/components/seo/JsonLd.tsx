interface LocalBusinessJsonLdProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  areaServed?: string[];
  services?: string[];
}

export function LocalBusinessJsonLd({
  name = "ClimaTech HVAC",
  description = "Empresa especializada en mantenimiento preventivo y correctivo de equipos de aire acondicionado en Santiago de Chile.",
  url = "https://climatech.cl",
  telephone = "+56 9 XXXX XXXX",
  address = {
    streetAddress: "Recoleta",
    addressLocality: "Santiago",
    addressRegion: "Región Metropolitana",
    postalCode: "8420000",
    addressCountry: "CL",
  },
  areaServed = ["Recoleta", "Providencia", "Santiago Centro", "Ñuñoa", "Las Condes", "Independencia"],
  services = [
    "Mantenimiento preventivo de aire acondicionado",
    "Mantenimiento correctivo HVAC",
    "Limpieza de filtros de aire acondicionado",
    "Carga de gas refrigerante",
    "Revisión eléctrica de equipos HVAC",
    "Instalación de equipos de climatización",
  ],
}: LocalBusinessJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Mantenimiento HVAC",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s,
        },
      })),
    },
    priceRange: "$$",
    openingHours: "Mo-Sa 08:00-18:00",
    image: `${url}/og-image.jpg`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Para páginas de servicio por comuna
interface ServicePageJsonLdProps {
  servicio: string;
  comuna: string;
}

export function ServicePageJsonLd({ servicio, comuna }: ServicePageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${servicio} de aire acondicionado en ${comuna}`,
    description: `Servicio profesional de ${servicio.toLowerCase()} de equipos HVAC en ${comuna}, Santiago. Técnicos certificados SEC con respuesta en 24 horas.`,
    provider: {
      "@type": "LocalBusiness",
      name: "ClimaTech HVAC",
      url: "https://climatech.cl",
    },
    areaServed: { "@type": "City", name: comuna },
    serviceType: servicio,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
