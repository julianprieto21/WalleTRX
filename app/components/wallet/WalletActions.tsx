"use client";
import { Transaction } from "@/app/lib/types";
import { formatBalance, getBalanceFromTransactions } from "@/app/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DataTransferBoth, Download, Upload } from "iconoir-react";

function TransferButton() {
  return (
    <>
      <Link
        href={"transactions/create"} //?type=transfer"}
        className="flex rounded-3xl justify-center items-center bg-palette-300 hover:bg-transfer text-transfer hover:text-neutral-100 transition ease-in-out delay-10 p-2"
      >
        <DataTransferBoth className="rotate-90 size-16 xl:size-12 2xl:size-14" />
      </Link>
    </>
  );
}

function IncomeButton({ income }: { income: number }) {
  const formattedIncome = formatBalance(income / 100, "never");
  return (
    <div className="xl:w-2/6 2xl:w-2/5 flex rounded-3xl justify-between items-center bg-palette-300">
      <div className="hidden justify-center sm:block w-full">
        <p className="text-center xl:text-2xl 2xl:text-3xl 3xl:text-4xl font text-palette-100 antialiased grow">
          {formattedIncome}
        </p>
      </div>

      <Link
        href={`/transactions/create`} //?type=income`}
        className="px-2 sm:pr-3 h-[100%] flex justify-center items-center py-2 rounded-3xl sm:rounded-s-none text-income hover:bg-income hover:text-neutral-200 transition ease-in-out delay-10"
      >
        <Download className="size-16 xl:size-12 2xl:size-14" />
      </Link>
    </div>
  );
}

function ExpenseButton({ expense }: { expense: number }) {
  const expenseFormatted = formatBalance(expense / 100, "never");
  return (
    <div className="xl:w-2/6 2xl:w-2/5 flex rounded-3xl justify-between items-center bg-palette-300">
      <Link
        href={`/transactions/create`} //?type=expense`}
        className="px-2 sm:pl-3 h-[100%] flex justify-center items-center py-2 rounded-3xl sm:rounded-e-none text-expense hover:bg-expense hover:text-neutral-200 transition ease-in-out delay-10"
      >
        <Upload className="size-16 xl:size-12 2xl:size-14" />
      </Link>

      <div className="hidden justify-center sm:block w-full">
        <p className="text-center xl:text-2xl 2xl:text-3xl 3xl:text-4xl font text-palette-100 antialiased grow">
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
    <main className="w-4/5 flex flex-col items-center justify-center gap-6 xl:gap-4 2xl:gap-6">
      <div className="w-full flex flex-row justify-center gap-6 sm:gap-6 lg:gap-4">
        <IncomeButton income={income} />
        <ExpenseButton expense={expense} />
      </div>
      <div className="flex flex-row items-center w-[90%] gap-4">
        <hr className="border-t border-palette-250 w-full"></hr>
        <TransferButton />
        <hr className="border-t border-palette-250 w-full"></hr>
      </div>
    </main>
  );
}
