"use client";
import { Transaction } from "@/app/lib/types";
import { formatBalance, getBalanceFromTransactions } from "../../lib/utils";
import { useSearchParams } from "next/navigation";
import { lang } from "@/app/lib/const/string-en";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function BalanceWidget({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [hide, setHide] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const accountId = searchParams.get("account");
  let filteredTransactions = transactions;
  if (accountId) {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.account_id === accountId
    );
  }
  const { income, expense } = getBalanceFromTransactions(filteredTransactions);
  const balance = income + expense;
  const formattedBalance = formatBalance(balance / 100, "auto");
  const currency = "ARS";
  return (
    <main className="w-1/2 text-neutral-800 flex h-full items-start flex-col justify-end">
      <div className="flex flex-row gap-2 items-end pl-2">
        <button
          title="Hide Balances"
          type="button"
          onClick={() => setHide(!hide)}
        >
          {hide ? (
            <EyeSlashIcon className="size-10 cursor-pointer" />
          ) : (
            <EyeIcon className="size-10 cursor-pointer" />
          )}
        </button>
        <p className="text-5xl font-light">{lang.balanceText}:</p>
      </div>

      <h1 className="text-8xl font-normal flex flex-row items-end gap-4">
        {hide ? "..." : formattedBalance}
        <p className="text-7xl font-light ">{currency}</p>
      </h1>
    </main>
  );
}
