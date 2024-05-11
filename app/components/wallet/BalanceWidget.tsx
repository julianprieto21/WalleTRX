import { getBalance, getTransactions } from "@lib/db";
import { dict } from "@lib/dictionaries";
import type { User } from "@lib/types";
import { formatBalance } from "@lib/utils";

export function BalanceWidgetSkeleton() {
  const { balance: text } = dict;
  const currency = "ARS";
  return (
    <main className="w-full sm:w-1/2 text-neutral-100 flex h-full items-start flex-col justify-end">
      <p className="text-xl xl:text-4xl 2xl:text-5xl font-light ">{text}:</p>
      <h1 className="text-4xl xl:text-7xl 2xl:text-8xl font-light flex flex-row items-end gap-2 sm:gap-4 ">
        {formatBalance(0)}
        <p className="text-3xl xl:text-6xl 2xl:text-7xl font-medium text-palette-500">
          {currency}
        </p>
      </h1>
    </main>
  );
}

export async function BalanceWidget({ user }: { user: User }) {
  const { balance: text } = dict;
  const currency = "ARS";

  const balanceInCents = (await getBalance({
    groupBy: "user",
    user: user,
  })) as {
    user_id: string;
    total: number;
  }[];
  if (balanceInCents.length === 0) return <BalanceWidgetSkeleton />;
  const balance = balanceInCents[0].total;
  const formattedBalance = formatBalance(balance / 100, "auto");
  return (
    <main className="w-full sm:w-1/2 text-neutral-100 flex h-full items-start flex-col justify-end">
      <p className="text-xl xl:text-4xl 2xl:text-5xl font-light ">{text}:</p>
      <h1 className="text-4xl xl:text-7xl 2xl:text-8xl font-light flex flex-row items-end gap-2 sm:gap-4 ">
        {formattedBalance}
        <p className="text-3xl xl:text-6xl 2xl:text-7xl font-medium text-palette-500">
          {currency}
        </p>
      </h1>
    </main>
  );
}
