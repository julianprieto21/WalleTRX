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

export default function NavLinks({
  isLogIn,
  dict,
}: {
  isLogIn: boolean;
  dict: any;
}) {
  const pathName = usePathname();
  const mainLinks = [
    { name: dict.menu.home, href: "/", icon: Home },
    {
      name: dict.menu.transactions,
      href: "/transactions",
      icon: Notes,
    },
    {
      name: dict.menu.investments,
      href: "/investments",
      icon: GraphUp,
    },
    { name: dict.menu.dashboard, href: "/dashboard", icon: Reports },
    { name: dict.menu.accounts, href: "/accounts", icon: AppleWallet },
    { name: dict.menu.settings, href: "/settings", icon: Settings },
  ];
  return (
    <>
      {mainLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-20 sm:h-12 grow items-center justify-start gap-2 text-neutral-400 p-4 text-md hover> font-normal hover:bg-neutral-700 hover:text-neutral-50 sm:flex-none sm:justify-center lg:justify-start md:p-2 md:px-3 
                ${
                  pathName === link.href ? "bg-neutral-700 text-neutral-50" : ""
                } ${isLogIn ? "cursor-pointer" : " cursor-not-allowed"}`}
          >
            <LinkIcon className="size-10 xl:size-6 2xl:size-7" />
            <p className="block text-xl xl:text-sm 2xl:text-base sm:block">
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
