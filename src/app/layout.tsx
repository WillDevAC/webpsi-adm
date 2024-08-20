import { Inter } from "next/font/google";

import type { Metadata } from "next";

import Providers from "@/providers/query.provider";

import "./globals.css";

import 'grapesjs/dist/css/grapes.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEB PSI - ADMIN",
  description: "Seu criador de sites inteligente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
