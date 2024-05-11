import type { User } from "@lib/types";
import Link from "next/link";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import { getBalance } from "@lib/db";

const NoAccounts = () => {
  const { messages, nav, cards } = dict;
  return (
    <main className="size-96 flex flex-col">
      <p className="text-2xl font-semibold pl-1">{cards.accountSummary}</p>
      <p className="text-palette-200 text-center text-lg h-full grid place-content-center">
        {messages.noAccounts}
        <Link
          href={"/accounts/create"}
          className="font-bold hover:underline decoration-1"
        >
          {nav.accounts}
        </Link>
      </p>
    </main>
  );
};

const AccountsItem = ({
  account,
}: {
  account: {
    id: string;
    name: string;
    color: string;
    currency: string;
    total: number;
  };
}) => {
  return (
    <Link
      href={`/accounts/${account.id}`}
      className="hover:bg-palette-300 p-4 w-full flex flex-row justify-between items-center rounded-lg"
    >
      <div className="flex flex-row gap-2 justify-center items-center">
        <span
          className="size-3 sm:size-4 rounded-full"
          style={{ backgroundColor: account.color }}
        ></span>
        <h1 className="text-md xl:text-lg 2xl:text-xl text-palette-100">
          {account.name}
        </h1>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <p className="text-md xl:text-lg 2xl:text-xl text-palette-100">
          {formatBalance(account.total / 100, "auto", account.currency)}
        </p>
      </div>
    </Link>
  );
};

export function AccountsWidgetSkeleton() {
  const { accountSummary } = dict.cards;
  return (
    <main className="size-96">
      <p className="text-2xl font-semibold pl-1">{accountSummary}</p>
      <ul className="w-full h-full flex flex-col gap-2 overflow-y-auto overflow-x-clip mt-2"></ul>
    </main>
  );
}

export async function AccountsWidget({ user }: { user: User }) {
  const { accountSummary } = dict.cards;
  const balanceByAccount = (await getBalance({
    groupBy: "account",
    user: user,
  })) as {
    id: string;
    name: string;
    color: string;
    currency: string;
    total: number;
  }[];

  if (balanceByAccount.length === 0) {
    return <NoAccounts />;
  }
  return (
    <main className="size-96 overflow-auto relative">
      <p className="sticky inset-0 text-2xl font-semibold pl-1 bg-palette-400">
        {accountSummary}
      </p>
      <ul className="flex flex-col gap-2 mt-2">
        {balanceByAccount.map((acc, index) => {
          return (
            <li
              className="flex flex-row w-full justify-between items-center"
              key={index}
            >
              <AccountsItem account={acc} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
