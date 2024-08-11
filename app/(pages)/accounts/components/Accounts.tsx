"use client";

import { deleteAccount } from "@lib/actions";
import { dict } from "@lib/dictionaries";
import { formatBalance, showToast } from "@lib/utils";
import { Plus, Trash } from "iconoir-react";
import Link from "next/link";

function AccountLink({ acc }: { acc: any }) {
  const { toasts } = dict;
  return (
    <main className="group  relative h-20 2xl:h-24 w-40 rounded-lg py-1 px-2 2xl:p-2 shadow-md text-palette-100 bg-palette-300">
      <Link href={`#`} key={acc.id}>
        <div className="w-full flex flex-row justify-between items-center gap-2">
          <p className="font-bold text-base 2xl:text-lg truncate">{acc.name}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            className="size-7"
          >
            <path
              fill="#FF9800"
              d="M5 35V13c0-2.2 1.8-4 4-4h30c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4"
            />
            <path
              fill="#ffd100"
              d="M43 21v-2H31c-1.1 0-2-.9-2-2s.9-2 2-2h1v-2h-1c-2.2 0-4 1.8-4 4s1.8 4 4 4h3v6h-3c-2.8 0-5 2.2-5 5s2.2 5 5 5h2v-2h-2c-1.7 0-3-1.3-3-3s1.3-3 3-3h12v-2h-7v-6zm-26 6h-3v-6h3c2.2 0 4-1.8 4-4s-1.8-4-4-4h-3v2h3c1.1 0 2 .9 2 2s-.9 2-2 2H5v2h7v6H5v2h12c1.7 0 3 1.3 3 3s-1.3 3-3 3h-2v2h2c2.8 0 5-2.2 5-5s-2.2-5-5-5"
            />
          </svg>
        </div>

        <div
          className="w-full h-0 border-t"
          style={{ borderColor: acc.color }}
        ></div>
        <p className="font-bold text-md text-palette-250 group-hover:text-palette-200 transition duration-300 mt-1">
          {formatBalance(acc.total / 100)}
        </p>
      </Link>
      <form
        className="hidden 2xl:block absolute right-3 bottom-0"
        action={async () => {
          try {
            await deleteAccount(acc.id);
            showToast(toasts.success.deleteAccount, "success");
          } catch (err) {
            showToast(toasts.error.deleteAccount, "error");
            console.error(err);
          }
        }}
      >
        <button type="submit" title="Delete account" className="z-10">
          <Trash className="size-5 text-palette-250 hover:text-red-500" />
        </button>
      </form>
    </main>
  );
}

export default function Accounts({
  balanceByAccounts,
}: {
  balanceByAccounts: any[];
}) {
  return (
    <div className="flex flex-row gap-4 2xl:gap-8 w-fit">
      {balanceByAccounts.slice(0, 5).map((account) => (
        <AccountLink key={account.id} acc={account} />
      ))}
      <Link
        href={"/accounts/create"}
        className="grid place-content-center border shadow-md border-dashed border-palette-250 h-20 2xl:h-24 w-40 rounded-lg text-palette-250 hover:text-palette-500 text-md transition"
      >
        <Plus />
      </Link>
    </div>
  );
}
