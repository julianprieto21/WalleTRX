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

const { nav, commingSoon } = dict;
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

export function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {mainLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-12 items-center gap-3 text-palette-100 text-md hover> font-normal hover:bg-palette-250 hover:text-palette-500 flex-none justify-start p-2 px-3 
            ${pathName === link.href ? "bg-palette-250 text-palette-500" : ""}
            ${link.disabled ? "pointer-events-none" : ""}`}
          >
            <LinkIcon className="size-8" />
            <h1 className="text-base text-palette-100 relative">
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

export function NavLinksMobile() {
  return (
    <>
      {mainLinks.slice(0, 5).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="grow grid place-content-center rounded-full py-2 text-palette-100 focus:text-palette-500"
          >
            <LinkIcon className="size-10" />
          </Link>
        );
      })}
    </>
  );
}
