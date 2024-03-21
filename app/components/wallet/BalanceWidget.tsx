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
    <main className="w-full sm:w-1/2 text-neutral-800 flex h-full items-start flex-col justify-end">
      <p className="text-xl sm:text-5xl font-light">{lang.balanceText}:</p>
      <h1 className="text-4xl sm:text-8xl font-normal flex flex-row items-end gap-2 sm:gap-4">
        {hide ? "..." : formattedBalance}
        <p className="text-3xl sm:text-7xl font-light ">{currency}</p>
      </h1>
    </main>
  );
}
