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
        <ArrowsRightLeftIcon className="size-12 sm:size-12" />
      </Link>
    </>
  );
}

function IncomeButton({ income }: { income: number }) {
  const formattedIncome = formatBalance(income / 100);
  return (
    <>
      <div className="sm:w-[90%] flex rounded-3xl justify-between items-center bg-neutral-100">
        <div className="sm:w-[76%] justify-center flex">
          <p className="sm:text-xl md:text-2xl xl:text-3xl font text-neutral-700 antialiased px-2 sm:px-4">
            {formattedIncome}
          </p>
        </div>

        <Link
          title={lang.incomeText}
          href={`/transactions/create`} //?type=income`}
          className="pr-2 sm:pr-4 pl-2 h-[100%] flex justify-center items-center py-2 rounded-e-3xl text-green-600 hover:bg-green-600/80 hover:text-neutral-200 transition ease-in-out delay-10"
        >
          <ArrowDownTrayIcon className="size-10 sm:size-12" />
        </Link>
      </div>
    </>
  );
}

function ExpenseButton({ expense }: { expense: number }) {
  const expenseFormatted = formatBalance(expense / 100);
  return (
    <>
      <div className="sm:w-[90%] flex rounded-3xl justify-between items-center bg-neutral-100">
        <Link
          title={lang.expenseText}
          href={`/transactions/create`} //?type=expense`}
          className="pl-2 sm:pl-4 pr-2 h-[100%] flex justify-center items-center py-2 rounded-s-3xl text-red-500 hover:bg-red-600/90 hover:text-neutral-200 transition ease-in-out delay-10"
        >
          <ArrowUpTrayIcon className="size-10 sm:size-12" />
        </Link>

        <div className="sm:w-[76%] justify-center flex">
          <p className="sm:text-xl md:text-2xl xl:text-3xl font text-neutral-700 antialiased px-2 md:px-4">
            {expenseFormatted}
          </p>
        </div>
      </div>
    </>
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
  const balance = income - expense;
  return (
    <div className="w-full md:w-[60%] flex flex-col items-center justify-center gap-2 sm:gap-4 py-4 sm:pt-6">
      {/* <HLine width={100} color="neutral" margin={2} /> */}
      <div className="flex flex-row w-[100%] justify-center gap-4 px-4">
        <IncomeButton income={income} />
        <ExpenseButton expense={expense} />
      </div>
      <div className="flex flex-row items-center gap-8 w-3/4">
        <HLine width={100} color="neutral" margin={2} />
        <TransferButton />
        <HLine width={100} color="neutral" margin={2} />
      </div>
    </div>
  );
}
