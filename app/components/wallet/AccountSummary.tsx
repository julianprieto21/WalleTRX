"use client";
import { Account, Transaction } from "@/app/lib/types";
import { formatBalance } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavArrowRight } from "iconoir-react";

export default function AccountSummary({
  accounts,
  transactions,
  dict,
}: {
  accounts: Account[];
  transactions: Transaction[];
  dict: any;
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
  if (balanceByAccount.length === 0) {
    return (
      <div className="size-full flex justify-center items-center text-palette-100 text-center text-lg">
        <p>
          {dict.messages.noAccounts}
          <Link href={"/accounts"} className="font-bold ">
            {dict.menu.accounts}
          </Link>
        </p>
      </div>
    );
  }
  return (
    <ul className="w-full h-full flex flex-col gap-2 overflow-y-auto overflow-x-clip">
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
              onChange={() => {}}
            ></input>
            <label
              htmlFor={acc.account.id}
              onClick={(e) => handleClick(acc.account.id, e)}
              className="cursor-pointer w-full flex flex-row justify-between items-center p-3 xl:p-2 2xl:p-3 border border-palette-250 rounded-md hover:bg-palette-400 transition peer-checked:font-bold peer-checked:bg-palette-400 peer-checked:text-palette-100"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <span
                  className="size-3 sm:size-5 rounded-full"
                  style={{ backgroundColor: acc.account.color }}
                ></span>
                <h1 className="text-md xl:text-lg 2xl:text-xl text-palette-100">
                  {acc.account.name}
                </h1>
              </div>

              <div className="flex flex-row justify-center items-center gap-4">
                <p className="text-md xl:text-lg 2xl:text-xl text-palette-100">
                  {formatBalance(acc.balance, "auto")}
                </p>
              </div>
            </label>
            <Link
              href={`/accounts/${acc.account.id}`}
              className="w-[66px] h-full flex justify-center items-center text-palette-200 hover:translate-x-1 transition hover:text-palette-500"
            >
              <NavArrowRight className="size-8" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
