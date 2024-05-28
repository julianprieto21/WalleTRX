import { getBalanceByAccounts } from "@lib/db";
import { Plus } from "iconoir-react";
import Link from "next/link";
import AccountLink from "./AccountLink";

export default async function Accounts() {
  const data = await getBalanceByAccounts()
  if (!data) return;

  return (
    <div className="flex flex-row gap-4 2xl:gap-8 w-fit">
      {data.slice(0, 5).map((account) => (
        <AccountLink key={account.id} a={account} />
      ))}
      <Link
        href={"/accounts/create"}
        className="2xl:hover:scale-105 grid place-content-center border shadow-md border-dashed border-palette-250 h-20 2xl:h-24 w-40 rounded-lg text-palette-250 hover:text-palette-500 text-md transition"
      >
        <Plus />
      </Link>
    </div>
  );
}
