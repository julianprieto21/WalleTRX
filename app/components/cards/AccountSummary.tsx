"use client";
import { Account, Transaction } from "@/app/lib/types";
import Card from "../Card";
import { formatBalance } from "@/app/lib/utils";
import { lang } from "@/app/lib/const/string-en";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AccountSummary({
  accounts,
  transactions,
}: {
  accounts: Account[];
  transactions: Transaction[];
}) {
  const balanceByAccount = accounts.map((acc) => {
    const registros = transactions.filter((t) => t.account_id === acc.id);
    const balance = registros.reduce((acc, t) => acc + t.amount, 0);
    return {
      account: acc,
      balance: balance / 100,
    };
  });
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleClick = (value: string, event: any) => {
    const params = new URLSearchParams(searchParams);
    const acc = params.get("account");
    if (acc === value) {
      params.delete("account");
      replace(`${pathName}?${params.toString()}`);
      return;
    }
    if (value) {
      params.set("account", value);
      replace(`${pathName}?${params.toString()}`);
    } else {
      params.delete("account");
      replace(`${pathName}?${params.toString()}`);
    }
  };
  return (
    <Card title={lang.accountSummaryText}>
      <ul className="w-full h-full flex flex-col gap-2">
        {balanceByAccount.map((acc, index) => {
          return (
            <li
              className="flex flex-row w-full justify-between items-center"
              key={index}
            >
              <input
                id={acc.account.id}
                title="Account Input"
                name="acc-input"
                type="radio"
                className="peer hidden"
                checked={acc.account.id === searchParams.get("account")}
              ></input>
              <label
                htmlFor={acc.account.id}
                onClick={(e) => handleClick(acc.account.id, e)}
                className="cursor-pointer w-full flex flex-row justify-between items-center p-3 border rounded-lg hover:font-semibold transition delay-75 peer-checked:font-bold peer-checked:bg-neutral-700 peer-checked:text-neutral-50"
              >
                <div className="flex flex-row gap-2 justify-center items-center">
                  <span
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: acc.account.color }}
                  ></span>
                  <h1 className="text-xl">{acc.account.name}</h1>
                </div>

                <div className="flex flex-row justify-center items-center gap-4">
                  <p className="text-xl">
                    {formatBalance(acc.balance, "auto")}
                  </p>
                </div>
              </label>
              <Link
                href={`/accounts/${acc.account.id}`}
                className="w-[66px] h-full flex justify-center items-center text-neutral-400 hover:translate-x-1 transition hover:text-neutral-800"
              >
                <ChevronRightIcon className="size-8" />
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
