import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import { SideNav, TopNav } from "./components/Nav";

export const metadata: Metadata = {
  title: "WalleTRX",
  description:
    "Web application for keep track of personal finances. Created by Julian Prieto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="m-0 p-0 flex flex-col sm:flex-row h-full">
        <Providers>
          <SideNav />
          <TopNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
