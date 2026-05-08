import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import { AuthProvider } from "@/lib/auth/demoAuth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClimaTech HVAC — Climatización Inteligente en Santiago",
  description: "Venta, instalación y mantenimiento garantizado de equipos HVAC en Santiago de Chile. Atendemos Recoleta, Providencia y Santiago Centro.",
  keywords: ["aire acondicionado", "climatización", "HVAC", "Recoleta", "Santiago"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased selection:bg-orange-200 selection:text-orange-900`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'} />
    </html>
  );
}
