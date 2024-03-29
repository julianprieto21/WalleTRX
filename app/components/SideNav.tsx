import NavLinks from "./NavLinks";
import { auth } from "@/auth";
import HLine from "./HLine";
import { WalletSolid } from "iconoir-react";
import { getDictionary } from "../lib/dictionaries";

export default async function SideNav() {
  const dict = await getDictionary("es");
  const session = await auth();
  const title = dict.app.split("&");
  return (
    <aside className="hidden sm:flex w-1/5 flex-col items-center justify-center bg-neutral-900 h-screen sm:pb-2 overflow-auto">
      <section className="w-full flex flex-col items-center text-neutral-200 bg-gray-800 sm:py-4 sm:pb-2 lg:py-4 border-b border-gray-700">
        <WalletSolid className="xl:size-36 2xl:size-48" />
        <h1 className="flex flex-row justify-center font-thin xl:text-4xl 2xl:text-5xl">
          {title[0]}
          <strong className="font-semibold ">{title[1]}</strong>
        </h1>
      </section>
      <div className="hidden sm:flex flex-col w-full h-[90%] justify-around lg:justify-start lg:gap-2 3xl:gap-4 py-4">
        <NavLinks isLogIn={session ? true : false} dict={dict} />
      </div>
      <footer className="w-full hidden sm:flex  flex-col justify-center items-center">
        <HLine width={90} color="neutral" />
        <h1 className="text-xs md:text-sm text-center font-light text-neutral-500 pt-2">
          {dict.footer}
        </h1>
      </footer>
    </aside>
  );
}
