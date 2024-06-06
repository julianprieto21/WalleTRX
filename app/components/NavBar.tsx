import { NavLinks, NavLinksMobile } from "./NavLinks";
import { WalletSolid } from "iconoir-react";
import { dict } from "@lib/dictionaries";
import Link from "next/link";

export function SideNav() {
  const { nav } = dict;
  const title = dict.app.split("&");
  return (
    <>
      <aside className="relative hidden 2xl:flex w-1/6 flex-none flex-col items-center justify-center bg-palette-300 h-screen pb-2 overflow-auto">
        <section className="w-full flex flex-col items-center text-neutral-200 bg-palette-300 py-3 border-b border-palette-250">
          <Link href="/" title="Home">
            <WalletSolid className="size-36 text-palette-100" />
          </Link>
          <Link href="/" title="Home">
            <h1 className="flex flex-row justify-center font-light text-5xl text-palette-100">
              {title[0]}
              <strong className="font-semibold text-palette-500">
                {title[1]}
              </strong>
            </h1>
          </Link>
        </section>
        <div className="flex flex-col w-full h-[90%] justify-start gap-4 py-4">
          <NavLinks />
        </div>
        <footer className="w-full flex flex-col justify-center items-center border-t border-palette-250">
          <h1 className="text-sm text-center font-light text-neutral-500 pt-2">
            {nav.footer}
          </h1>
        </footer>
      </aside>
      {/* <nav className="2xl:hidden fixed bottom-0 w-full h-[72px] hidden flex-row border-t border-palette-250 bg-palette-400">
        <NavLinksMobile />
      </nav> */}
    </>
  );
}
