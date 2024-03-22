import { Account, Transaction } from "@/app/lib/types";
import { formatBalance } from "@/app/lib/utils";
import { CATEGORIES } from "@/app/lib/const/categories";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { DeleteTransaction, EditTransaction } from "../buttons";

interface Props {
  transaction: Transaction;
  account?: Account;
}

export default function Item({ transaction, account }: Props) {
  const category = CATEGORIES.find(
    (category) => category.id === transaction.category
  );
  const icon =
    transaction.type === "income" ? (
      <ArrowDownTrayIcon className="size-5 text-neutral-50" />
    ) : (
      <ArrowUpTrayIcon className="size-5 text-neutral-50" />
    );
  const bgColor = transaction.type === "income" ? "bg-green-500" : "bg-red-500";
  return (
  <main className="mx-auto justify-between w-full flex flex-row px-4 py-4 bg-neutral-100 rounded-3xl shadow-sm">
      <section className="flex flex-col gap-3">
        <section className="flex flex-row gap-4 justify-start text-neutral-50 text-sm">
          <div className="px-3 py-1 font-normal rounded-2xl bg-neutral-800">
            <p>{account?.name}</p>
          </div>
          <div className="px-3 py-1 font-normal rounded-2xl text-neutral-50 bg-neutral-800">
            <p>{category?.name}</p>
          </div>
        </section>
        <h1 className="font-semibold text-2xl pl-1">
          {transaction.description}
        </h1>
        <h2 className="text-2xl flex flex-row justify-start items-center gap-2 font-light">
          <span className={`rounded-full p-2 ${bgColor}`}>{icon}</span>
          {formatBalance(transaction.amount / 100, "never")}
        </h2>
      </section>
      <section className="flex flex-col justify-between">
        <DeleteTransaction id={transaction.id} />
        <EditTransaction id={transaction.id} />
      </section>
    </main>
  );
}
