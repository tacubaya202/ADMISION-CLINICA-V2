
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admisión y Expediente Clínico",
  description: "Formulario de admisión de pacientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
