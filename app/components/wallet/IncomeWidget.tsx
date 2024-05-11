import { getBalance } from "@lib/db";
import type { User } from "@lib/types";
import { formatBalance } from "@lib/utils";
import { Download } from "iconoir-react";
import Link from "next/link";

export function IncomeWidgetSkeleton() {
  return (
    <div className="xl:w-2/6 2xl:w-2/5 flex rounded-3xl justify-between items-center bg-palette-300">
      <div className="hidden justify-center sm:block w-full">
        <p className="text-center xl:text-2xl 2xl:text-3xl 3xl:text-4xl font text-palette-100 antialiased grow">
          {formatBalance(0)}
        </p>
      </div>

      <button
        title="."
        className="px-2 sm:pr-3 h-[100%] flex justify-center items-center py-2 rounded-3xl sm:rounded-s-none text-income hover:bg-income hover:text-neutral-200 transition ease-in-out delay-10"
      >
        <Download className="size-16 xl:size-12 2xl:size-14" />
      </button>
    </div>
  );
}

export async function IncomeWidget({ user }: { user: User }) {
  const balanceInCents = (await getBalance({
    groupBy: "type",
    user: user,
  })) as {
    type: string;
    total: number;
  }[];
  const incomeData = balanceInCents.find((row) => {
    return row.type === "income";
  });
  const income = incomeData?.total ?? 0;
  const formattedIncome = formatBalance(income / 100, "never");
  return (
    <div className="xl:w-2/6 2xl:w-2/5 flex rounded-3xl justify-between items-center bg-palette-300">
      <div className="hidden justify-center sm:block w-full">
        <p className="text-center xl:text-2xl 2xl:text-3xl 3xl:text-4xl font text-palette-100 antialiased grow">
          {formattedIncome}
        </p>
      </div>

      <Link
        href={`/transactions/create?t=income`}
        className="px-2 sm:pr-3 h-[100%] flex justify-center items-center py-2 rounded-3xl sm:rounded-s-none text-income hover:bg-income hover:text-neutral-200 transition ease-in-out delay-10"
      >
        <Download className="size-16 xl:size-12 2xl:size-14" />
      </Link>
    </div>
  );
}
