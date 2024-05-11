import { getBalance } from "@lib/db";
import type { User } from "@lib/types";
import { formatBalance } from "@lib/utils";
import { Upload } from "iconoir-react";
import Link from "next/link";

export function ExpenseWidgetSkeleton() {
  return (
    <div className="xl:w-2/6 2xl:w-2/5 flex rounded-3xl justify-between items-center bg-palette-300">
      <button
        title="."
        className="px-2 sm:pl-3 h-[100%] flex justify-center items-center py-2 rounded-3xl sm:rounded-e-none text-expense hover:bg-expense hover:text-neutral-200 transition ease-in-out delay-10"
      >
        <Upload className="size-16 xl:size-12 2xl:size-14" />
      </button>

      <div className="hidden justify-center sm:block w-full">
        <p className="text-center xl:text-2xl 2xl:text-3xl 3xl:text-4xl font text-palette-100 antialiased grow">
          {formatBalance(0)}
        </p>
      </div>
    </div>
  );
}

export async function ExpenseWidget({ user }: { user: User }) {
  const balanceInCents = (await getBalance({
    groupBy: "type",
    user: user,
  })) as {
    type: string;
    total: number;
  }[];
  const expenseData = balanceInCents.find((row) => {
    return row.type === "expense";
  });
  const expense = expenseData?.total ?? 0;
  const expenseFormatted = formatBalance(expense / 100, "never");
  return (
    <div className="xl:w-2/6 2xl:w-2/5 flex rounded-3xl justify-between items-center bg-palette-300">
      <Link
        href={`/transactions/create?t=expense`}
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
