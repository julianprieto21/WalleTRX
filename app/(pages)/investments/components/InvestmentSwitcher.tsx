"use client";

import { dict } from "@lib/dictionaries";
import { ArrowSeparate } from "iconoir-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function InvestmentSwitcher() {
  const [cryptoActive, setCryptoActive] = useState(true);
  const { switcher } = dict;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    setCryptoActive(!cryptoActive);
    const params = new URLSearchParams(searchParams);
    const q = cryptoActive ? "cryptos" : "t=stocks";
    params.set("mode", q);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const q = cryptoActive ? "cryptos" : "stocks";
    params.set("mode", q);
    replace(`${pathname}?${params.toString()}`);
  }, [cryptoActive]);

  return (
    <div className="flex flex-row gap-6 items-center justify-center">
      <button
        className={`h-12 bg-palette-300 text-palette-200 w-full rounded-lg grid place-content-center text-xl ${
          cryptoActive
            ? "text-palette-500 "
            : "text-palette-250 hover:text-palette-200"
        }`}
        onClick={
          !cryptoActive ? () => setCryptoActive(!cryptoActive) : () => {}
        }
      >
        {switcher.crypto}
      </button>
      <div
        // onClick={handleClick}
        className="shrink-0 bg-palette-300 hover:text-palette-500 text-palette-200 size-12 grid place-content-center rounded-lg"
      >
        <ArrowSeparate className="size-7 " />
      </div>
      <button
        className={`h-12 bg-palette-300 w-full rounded-lg grid place-content-center text-xl ${
          cryptoActive ? "text-palette-250" : "text-palette-250"
        }`}
        // onClick={cryptoActive ? () => setCryptoActive(!cryptoActive) : () => {}}
      >
        {switcher.stocks}
      </button>
    </div>
  );
}
