"use client";
import { Transaction } from "@/app/lib/types";
import { formatBalance, getBalanceFromTransactions } from "../../lib/utils";
import { useSearchParams } from "next/navigation";

export default function BalanceWidget({
  transactions,
  dict,
}: {
  transactions: Transaction[];
  dict: any;
}) {
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
      <p className="text-xl xl:text-4xl 2xl:text-5xl font-light">
        {dict.balance}:
      </p>
      <h1 className="text-4xl xl:text-7xl 2xl:text-8xl font-normal flex flex-row items-end gap-2 sm:gap-4">
        {formattedBalance}
        <p className="text-3xl xl:text-6xl 2xl:text-7xl font-light ">
          {currency}
        </p>
      </h1>
    </main>
  );
}
