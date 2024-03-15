"use client";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import { Suspense, useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { LogOutButton } from "./SideNav";

interface Props {
  imageUrl?: string;
}

export function TopNav({ imageUrl }: Props) {
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
  return (
    <nav id="top-nav" className="top-nav sm:hidden w-full flex flex-col">
      <section className="w-full flex flex-row justify-between items-center p-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Foto de perfil de usuario"
            className="rounded-full size-14 md:hidden"
          ></img>
        ) : (
          <UserIcon className="block sm:hidden rounded-full size-14 bg-neutral-100 py-1 text-neutral-800" />
        )}
        <Bars3Icon className="size-12" onClick={handleClick} />
      </section>

      <section
        className={`mt-20 z-10 absolute overflow-hidden transition-all delay-100 ${
          open ? "h-full py-4" : "h-0 py-0"
        } flex flex-col w-full bg-neutral-900 gap-4`}
        onClick={handleClick}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <NavLinks isLogIn={false} />
        {imageUrl ? <LogOutButton /> : null}
      </section>
    </nav>
  );
}
