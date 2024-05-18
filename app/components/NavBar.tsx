import NavLinks from "./NavLinks";
import {
  WalletSolid,
  AppleWallet,
  GraphUp,
  Home,
  Notes,
  Reports,
  Settings,
} from "iconoir-react";
import Link from "next/link";
import { dict } from "@lib/dictionaries";

export function SideNav() {
  const { footer: footerText } = dict.nav;
  const title = dict.app.split("&");
  return (
    <aside className="relative hidden 2xl:flex w-1/6 flex-none flex-col items-center justify-center bg-palette-300 h-screen sm:pb-2 overflow-auto">
      <section className="w-full flex flex-col items-center text-neutral-200 bg-palette-300 sm:py-4 sm:pb-2 lg:py-3 border-b border-palette-250">
        <WalletSolid className="xl:size-36 2xl:size-36 text-palette-100" />
        <h1 className="flex flex-row justify-center font-light xl:text-4xl 2xl:text-5xl text-palette-100">
          {title[0]}
          <strong className="font-semibold text-palette-500">{title[1]}</strong>
        </h1>
      </section>
      <div className="hidden sm:flex flex-col w-full h-[90%] justify-around lg:justify-start lg:gap-2 3xl:gap-4 py-4">
        <NavLinks />
      </div>
      <footer className="w-full hidden sm:flex flex-col justify-center items-center border-t border-palette-250">
        <h1 className="text-xs md:text-sm text-center font-light text-neutral-500 pt-2">
          {footerText}
        </h1>
      </footer>
    </aside>
  );
}
