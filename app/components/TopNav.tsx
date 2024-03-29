"use client";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { Menu, WalletSolid } from "iconoir-react";

export function TopNav() {
  const [open, setOpen] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const navbarHeight = document.getElementById("top-nav")?.clientHeight || 0;
    const screenHeight = window.innerHeight;
    setMaxHeight(screenHeight - navbarHeight);
  });
  const title = "WALLE&TRX".split("&");
  return (
    <nav
      id="top-nav"
      className="fixed sm:hidden z-10 h-20 w-full flex flex-col bg-gray-800 text-neutral-50"
    >
      <section className="w-full flex flex-row justify-between items-center px-3 py-4">
        <div className="flex flex-row gap-2 items-center">
          <Link href={"/"}>
            <WalletSolid className="size-12" />
          </Link>

          <h1 className="font-thin text-3xl">
            {title[0]}
            <span className="font-semibold ">{title[1]}</span>
          </h1>
        </div>

        <Menu className="size-12" onClick={handleClick} />
      </section>

      <section
        className={`mt-20 absolute overflow-clip ${
          open ? "h-screen py-4" : "h-0 py-0"
        } flex flex-col w-full bg-neutral-900 gap-4`}
        onClick={handleClick}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <NavLinks
          isLogIn={false}
          dict={{
            menu: {
              home: "Inicio",
              transactions: "Transacciones",
              investments: "Inversiones",
              dashboard: "Tablero",
              accounts: "Cuentas",
              settings: "Ajustes",
            },
          }}
        />
      </section>
    </nav>
  );
}
