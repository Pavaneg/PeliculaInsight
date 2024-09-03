import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./ui/Navbar";
import "./ui/globals.css";
import { SessionProvider } from "@/context/SessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pelicula Insight",
  description: "Tu catalogo de informacion de peliculas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}
