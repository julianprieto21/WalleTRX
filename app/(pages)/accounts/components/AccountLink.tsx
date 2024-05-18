"use client";

import { deleteAccount } from "@lib/actions";
import { dict } from "@lib/dictionaries";
import { formatBalance, showToast } from "@lib/utils";
import { Trash } from "iconoir-react";
import Link from "next/link";

export default function AccountLink({ a }: { a: any }) {
  const { toasts } = dict;
  return (
    <div className="relative h-24 w-40 rounded-lg p-2 shadow-md text-palette-100 hover:scale-105 transition bg-palette-300">
      <Link href={`/accounts/${a.id}`} key={a.id}>
        <p className="font-bold text-lg">{a.name}</p>
        <div
          className="w-4/5 h-0 border-t pb-1"
          style={{ borderColor: a.color }}
        ></div>
        <p className="font-light text-md">{formatBalance(a.total / 100)}</p>
      </Link>
      <form
        className="absolute right-1 bottom-0 z-10"
        action={async () => {
          try {
            await deleteAccount(a.id);
            showToast(toasts.successDeleteAccount, "success");
          } catch (err) {
            showToast(toasts.errorDeleteAccount, "error");
            console.error(err);
          }
        }}
      >
        <button type="submit" title="Delete account">
          <Trash className="size-5 text-palette-250 hover:text-red-500" />
        </button>
      </form>
    </div>
  );
}
