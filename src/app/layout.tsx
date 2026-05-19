import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth/demoAuth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://climatech.cl"),
  title: {
    default: "ClimaTech | Mantenimiento de Aire Acondicionado en Santiago",
    template: "%s | ClimaTech",
  },
  description:
    "Empresa especializada en mantenimiento preventivo y correctivo de equipos de aire acondicionado en Santiago de Chile. Técnicos certificados SEC.",
  keywords: [
    "mantenimiento aire acondicionado",
    "HVAC Santiago",
    "técnico certificado SEC",
    "climatización Santiago",
  ],
  authors: [{ name: "ClimaTech HVAC" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "ClimaTech HVAC",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClimaTech | Mantenimiento HVAC Santiago",
    description:
      "Técnicos certificados para el mantenimiento de tus equipos HVAC. Respuesta en 24h.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} font-sans antialiased selection:bg-orange-200 selection:text-orange-900`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
