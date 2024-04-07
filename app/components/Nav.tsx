import NavLinks from "./NavLinks";
import { auth } from "@/auth";
import HLine from "./HLine";
import { WalletSolid } from "iconoir-react";
import { getDictionary } from "../lib/dictionaries";
import {
  AppleWallet,
  GraphUp,
  Home,
  Notes,
  Reports,
  Settings,
} from "iconoir-react";
import Link from "next/link";

export async function SideNav() {
  const dict = await getDictionary("es");
  const session = await auth();
  const title = dict.app.split("&");
  return (
    <aside className="hidden sm:flex w-1/5 flex-none flex-col items-center justify-center bg-palette-300 h-screen sm:pb-2 overflow-auto">
      <section className="w-full flex flex-col items-center text-neutral-200 bg-palette-300 sm:py-4 sm:pb-2 lg:py-3 border-b border-palette-250">
        <WalletSolid className="xl:size-36 2xl:size-48 text-palette-100" />
        <h1 className="flex flex-row justify-center font-light xl:text-4xl 2xl:text-5xl text-palette-100">
          {title[0]}
          <strong className="font-semibold text-palette-500">{title[1]}</strong>
        </h1>
      </section>
      <div className="hidden sm:flex flex-col w-full h-[90%] justify-around lg:justify-start lg:gap-2 3xl:gap-4 py-4">
        <NavLinks isLogIn={session ? true : false} dict={dict} />
      </div>
      <footer className="w-full hidden sm:flex  flex-col justify-center items-center">
        <HLine />
        <h1 className="text-xs md:text-sm text-center font-light text-neutral-500 pt-2">
          {dict.footer}
        </h1>
      </footer>
    </aside>
  );
}

export async function TopNav() {
  const dict = await getDictionary("es");
  const session = await auth();
  const title = dict.app.split("&");
  return (
    <>
      <header className="relative sm:hidden z-10 h-20 w-full flex flex-row justify-center items-center gap-20 border-b border-palette-300 bg-palette-400 text-palette-500">
        <section className="w-1/2 flex flex-row justify-center items-center gap-6">
          <Link href={"/transactions"}>
            <Notes className="size-10" />
          </Link>
          <Link href={"/investments"}>
            <GraphUp className="size-10" />
          </Link>
        </section>
        <main className="absolute mt-10 size-20 flex justify-center items-center rounded-full shadow-md bg-palette-300 text-palette-100">
          <Link href={"/"}>
            <Home className="size-14" />
          </Link>
        </main>
        <section className="w-1/2 flex flex-row justify-center items-center gap-6">
          <Link href={"/accounts"}>
            <AppleWallet className="size-10" />
          </Link>
          <Link href={"/dashboard"}>
            <Reports className="size-10" />
          </Link>
        </section>
      </header>
      <Link
        href={"/settings"}
        className="z-20 sm:hidden absolute right-4 bottom-4 bg-palette-400 text-palette-100 rounded-full size-14 flex justify-center items-center shadow-md"
      >
        <Settings className="size-10" />
      </Link>
    </>
  );
}
