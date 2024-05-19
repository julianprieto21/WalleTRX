"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppleWallet,
  GraphUp,
  Home,
  Notes,
  Reports,
  Settings,
} from "iconoir-react";
import { dict } from "@lib/dictionaries";

export default function NavLinks() {
  const { nav, commingSoon } = dict;
  const pathName = usePathname();
  const mainLinks = [
    { name: nav.home, href: "/", icon: Home },
    {
      name: nav.transactions,
      href: "/transactions",
      icon: Notes,
    },
    {
      name: nav.investments,
      href: "/investments",
      icon: GraphUp,
      disabled: true,
    },
    {
      name: nav.dashboard,
      href: "/dashboard",
      icon: Reports,
    },
    { name: nav.accounts, href: "/accounts", icon: AppleWallet },
    { name: nav.settings, href: "/settings", icon: Settings },
  ];
  return (
    <>
      {mainLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-20 sm:h-12 grow items-center justify-start gap-3 text-palette-100 p-4 text-md hover> font-normal hover:bg-palette-250 hover:text-palette-500 sm:flex-none sm:justify-center lg:justify-start md:p-2 md:px-3 
            ${pathName === link.href ? "bg-palette-250 text-palette-500" : ""}
            ${link.disabled ? "pointer-events-none" : ""}`}
          >
            <LinkIcon className="size-10 xl:size-6 2xl:size-8" />
            <h1 className="text-xl xl:text-sm 2xl:text-base text-palette-100 relative">
              {link.name}
              <p
                className={`${
                  link.disabled
                    ? "text-xs font-thin text-palette-500"
                    : "hidden"
                }`}
              >
                {commingSoon}
              </p>
            </h1>
          </Link>
        );
      })}
    </>
  );
}
