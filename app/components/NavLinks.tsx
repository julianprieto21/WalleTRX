"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { lang } from "@/app/lib/const/string-en";
import {
  AppleWallet,
  GraphUp,
  Home,
  Notes,
  Reports,
  Settings,
} from "iconoir-react";

const mainLinks = [
  { name: `${lang.homeText}`, href: "/", icon: Home },
  {
    name: `${lang.transactionsText}`,
    href: "/transactions",
    icon: Notes,
  },
  {
    name: `${lang.investmentsText}`,
    href: "/investments",
    icon: GraphUp,
  },
  { name: `${lang.dashboardText}`, href: "/dashboard", icon: Reports },
  { name: `${lang.accountsText}`, href: "/accounts", icon: AppleWallet },
  { name: `${lang.settingsText}`, href: "/settings", icon: Settings },
];

export default function NavLinks({ isLogIn }: { isLogIn: boolean }) {
  const pathName = usePathname();
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
