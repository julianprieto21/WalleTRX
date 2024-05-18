import { getBalance, getUser } from "@lib/db";
import { User } from "@lib/types";
import { formatBalance } from "@lib/utils";
import { Plus } from "iconoir-react";
import Link from "next/link";

export default async function Accounts() {
  const user = (await getUser()) as User;
  const data = await getBalance({ groupBy: "account", user: user });
  if (!data) return;
  return (
    <div className="flex flex-row gap-8 w-fit">
      {data.slice(0, 5).map((a, index) => (
        <Link
          href={`/accounts/${a.id}`}
          key={index}
          className="h-24 w-40 rounded-lg p-2 shadow-md text-palette-100 hover:scale-105 transition bg-palette-300"
        >
          <p className="font-bold text-lg">{a.name}</p>
          <div
            className="w-4/5 h-0 border-t pb-1"
            style={{ borderColor: a.color }}
          ></div>
          <p className="font-light text-md">{formatBalance(a.total / 100)}</p>
        </Link>
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
