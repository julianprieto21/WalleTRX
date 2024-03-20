"use client";
import { lang } from "@/app/lib/const/string-en";
import { Transaction } from "@/app/lib/types";
import { formatBalance, getBalanceFromTransactions } from "@/app/lib/utils";
import {
  ArrowsRightLeftIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import HLine from "../HLine";
import { useSearchParams } from "next/navigation";

function TransferButton() {
  return (
    <>
      <Link
        title={lang.transferText}
        href={"transactions/create"} //?type=transfer"}
        className="flex rounded-3xl justify-center items-center bg-neutral-100 border hover:bg-violet-600 text-violet-700 hover:text-neutral-100 transition ease-in-out delay-10 p-2"
      >
        <ArrowsRightLeftIcon className="size-16 sm:size-12 lg:size-14" />
      </Link>
    </>
  );
}

function IncomeButton({ income }: { income: number }) {
  const formattedIncome = formatBalance(income / 100, "never");
  return (
    <div className="w-full flex rounded-3xl justify-between items-center bg-neutral-100">
      <div className="hidden justify-center sm:flex w-full">
        <p className="text-center sm:text-xl md:text-2xl xl:text-3xl font text-neutral-700 antialiased sm:px-4 xl:px-6 2xl:px-10 grow">
          {formattedIncome}
        </p>
      </div>

      <Link
        title={lang.incomeText}
        href={`/transactions/create`} //?type=income`}
        className="px-2 sm:pr-3 h-[100%] flex justify-center items-center py-2 rounded-3xl sm:rounded-s-none text-green-600 hover:bg-green-600/80 hover:text-neutral-200 transition ease-in-out delay-10"
      >
        <ArrowDownTrayIcon className="size-16 sm:size-12 lg:size-14" />
      </Link>
    </div>
  );
}

function ExpenseButton({ expense }: { expense: number }) {
  const expenseFormatted = formatBalance(expense / 100, "never");
  return (
    <div className="w-full flex rounded-3xl justify-between items-center bg-neutral-100">
      <Link
        title={lang.expenseText}
        href={`/transactions/create`} //?type=expense`}
        className="px-2 sm:pl-3 h-[100%] flex justify-center items-center py-2 rounded-3xl sm:rounded-e-none text-red-500 hover:bg-red-600/90 hover:text-neutral-200 transition ease-in-out delay-10"
      >
        <ArrowUpTrayIcon className="size-16 sm:size-12 lg:size-14" />
      </Link>

      <div className="hidden justify-center sm:flex w-full">
        <p className="text-center sm:text-xl md:text-2xl xl:text-3xl font text-neutral-700 antialiased sm:px-4 xl:px-6 2xl:px-10 grow">
          {expenseFormatted}
        </p>
      </div>
    </div>
  );
}

interface Props {
  transactions: Transaction[];
}

export default function WalletActions({ transactions }: Props) {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("account");
  let filteredTransactions = transactions;
  if (accountId) {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.account_id === accountId
    );
  }
  const { income, expense } = getBalanceFromTransactions(filteredTransactions);
  return (
    <main className="w-4/5 flex flex-col items-center justify-center gap-6 lg:gap-4 xl:gap-6">
      <div className="sm:w-3/5 flex flex-row justify-center gap-6 sm:gap-6 lg:gap-4">
        <IncomeButton income={income} />
        <ExpenseButton expense={expense} />
      </div>
      <div className="flex flex-row items-center w-[90%] gap-4">
        <HLine width={80} color="neutral" />
        <TransferButton />
        <HLine width={80} color="neutral" />
      </div>
    </main>
  );
}
