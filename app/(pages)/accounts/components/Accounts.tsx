import { getBalance, getUser } from "@lib/db";
import { User } from "@lib/types";
import { Plus } from "iconoir-react";
import Link from "next/link";
import AccountLink from "./AccountLink";

export default async function Accounts() {
  const user = (await getUser()) as User;
  const data = await getBalance({ groupBy: "account", user: user });
  if (!data) return;

  return (
    <div className="flex flex-row gap-8 w-fit">
      {data.slice(0, 5).map((account) => (
        <AccountLink a={account} />
      ))}
      <Link
        href={"/accounts/create"}
        className="hover:scale-105 grid place-content-center border shadow-md border-dashed border-palette-250 h-24 w-40 rounded-lg text-palette-250 hover:text-palette-500 text-md transition"
      >
        <Plus />
      </Link>
    </div>
  );
}
