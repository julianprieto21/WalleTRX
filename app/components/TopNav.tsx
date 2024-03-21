"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { lang } from "../lib/const/string-en";
import AppLogo from "@/public/app-logo-white.svg";

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
  const title = lang.appNameText.split("&");
  return (
    <nav
      id="top-nav"
      className="fixed sm:hidden h-20 w-full flex flex-col bg-gray-800 text-neutral-50"
    >
      <section className="z-20 w-full flex flex-row justify-between items-center px-3 py-4">
        <div className="flex flex-row gap-2 items-center">
          <img
            src={AppLogo.src}
            alt="Logo de la aplicación"
            className="size-12"
          ></img>
          <h1 className="font-thin text-3xl">
            {title[0]}
            <span className="font-semibold ">{title[1]}</span>
          </h1>
        </div>

        <Bars3Icon className="size-12" onClick={handleClick} />
      </section>

      <section
        className={`mt-20 z-10 absolute overflow-clip ${
          open ? "h-screen py-4" : "h-0 py-0"
        } flex flex-col w-full bg-neutral-900 gap-4`}
        onClick={handleClick}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <NavLinks isLogIn={false} />
      </section>
    </nav>
  );
}
