import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import SideNav from "./components/SideNav";

export const metadata: Metadata = {
  title: "Wallet App",
  description: "Created by Julian Prieto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col sm:flex-row m-0 p-0 w-full h-screen">
        <Providers>
          <SideNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
