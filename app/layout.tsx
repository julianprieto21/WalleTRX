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
    <html lang="en" className="h-full">
      <body className="m-0 p-0 h-full">
        <div className="flex flex-row">
          <Providers>
            <SideNav />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
