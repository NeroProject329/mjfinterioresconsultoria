import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consultoria Digital - Transforme Seu Negócio",
  description:
    "Consultoria Digital especializada em estratégia e advocacia com mais de 12 anos de experiência. Atendemos 1.000.000+ clientes com 98% de satisfação. Descontos de até 97%.",
  keywords: [
    "consultoria digital",
    "advocacia",
    "estratégia empresarial",
    "consultoria empresarial",
    "serviços profissionais",
  ],
  authors: [{ name: "Consultoria & Advocacia" }],
  robots: "index, follow",
  openGraph: {
    title: "Consultoria Digital - Transforme Seu Negócio",
    description:
      "Consultoria Digital especializada com mais de 12 anos de experiência. Desconto de até 97% no Mega Feirão 2025.",
    type: "website",
    images: ["/smilling2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}