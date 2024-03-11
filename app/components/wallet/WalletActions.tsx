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
        <ArrowsRightLeftIcon className="w-12 h-12" />
      </Link>
    </>
  );
}

function IncomeButton({ income }: { income: number }) {
  const formattedIncome = formatBalance(income / 100);
  return (
    <>
      <div className="w-[90%] flex rounded-full justify-between items-center bg-neutral-100">
        <div className="w-[76%] justify-center hidden sm:flex">
          <p className="text-3xl font text-neutral-700 antialiased">
            {formattedIncome}
          </p>
        </div>

        <Link
          title={lang.incomeText}
          href={`/transactions/create`} //?type=income`}
          className="pr-4 pl-2 h-[100%] flex justify-center items-center py-2 rounded-e-full text-green-600 hover:bg-green-600/80 hover:text-neutral-200 transition ease-in-out delay-10"
        >
          <ArrowDownTrayIcon className="w-12 h-12  antialiased" />
        </Link>
      </div>
    </>
  );
}

function ExpenseButton({ expense }: { expense: number }) {
  const expenseFormatted = formatBalance(expense / 100);
  return (
    <>
      <div className="w-[90%] flex rounded-full justify-between items-center bg-neutral-100">
        <Link
          title={lang.expenseText}
          href={`/transactions/create`} //?type=expense`}
          className="pl-4 pr-2 h-[100%] flex justify-center items-center py-2 rounded-s-full text-red-500 hover:bg-red-600/90 hover:text-neutral-200 transition ease-in-out delay-10"
        >
          <ArrowUpTrayIcon className="w-12 h-12" />
        </Link>

        <div className="w-[76%] justify-center hidden sm:flex">
          <p className="text-3xl font text-neutral-700 antialiased">
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
    <div className="w-[60%] flex flex-col items-center justify-center gap-4">
      <HLine width={100} color="neutral" margin={2} />
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
