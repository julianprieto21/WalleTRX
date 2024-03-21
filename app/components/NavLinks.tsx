"use client";

import {
  WalletIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { lang } from "@/app/lib/const/string-en";
import HLine from "./HLine";

const mainLinks = [
  { name: `${lang.homeText}`, href: "/", icon: WalletIcon },
  {
    name: `${lang.transactionsText}`,
    href: "/transactions",
    icon: BanknotesIcon,
  },
  {
    name: `${lang.investmentsText}`,
    href: "/investments",
    icon: ArrowTrendingUpIcon,
  },
  { name: `${lang.dashboardText}`, href: "/dashboard", icon: ChartBarIcon },
  { name: `${"Accounts"}`, href: "/accounts", icon: RectangleStackIcon },
  { name: `${"Settings"}`, href: "/settings", icon: Cog6ToothIcon },
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
            <LinkIcon className="size-10 sm:size-7" />
            <p className="block text-xl sm:text-base sm:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
