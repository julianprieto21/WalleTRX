import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@components/SessionProvider";
import { SideNav } from "@components/NavBar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "WalleTRX",
  description:
    "Aplicación web para llevar un seguimiento de las finanzas personales. Creada por Julián Prieto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="flex m-0 p-0 flex-row h-full">
        <SessionProvider>
          <SideNav />
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
