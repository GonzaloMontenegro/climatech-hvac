export function LocalSchema({ comunaNombre, servicio }: { comunaNombre: string; servicio: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "LocalBusiness"],
    "name": "ClimaTech HVAC",
    "description": `${servicio} de equipos de clima y aire acondicionado en ${comunaNombre}, Santiago de Chile.`,
    "url": "https://climatech.cl",
    "telephone": "+56900000000",
    "email": "contacto@climatech.cl",
    "image": "https://climatech.cl/og-image.jpg",
    "priceRange": "$$",
    "servesCuisine": null,
    "areaServed": comunaNombre,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Recoleta 1234",
      "addressLocality": comunaNombre,
      "addressRegion": "Región Metropolitana",
      "postalCode": "8420000",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.4073,
      "longitude": -70.6502
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
