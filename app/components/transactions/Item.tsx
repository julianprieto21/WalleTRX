import { Account, Transaction } from "@/app/lib/types";
import { formatBalance } from "@/app/lib/utils";
import { CATEGORIES } from "@/app/lib/const/categories";
import { DeleteTransaction, EditTransaction } from "../buttons";
import { Download, Upload } from "iconoir-react";

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
      <Download className="size-5 text-neutral-50" />
    ) : (
      <Upload className="size-5 text-neutral-50" />
    );
  const bgColor = transaction.type === "income" ? "bg-income" : "bg-expense";
  return (
    <main className="mx-auto justify-between w-full flex flex-row px-4 py-4 bg-palette-300 rounded-3xl">
      <section className="flex flex-col gap-3">
        <section className="flex flex-row gap-4 justify-start text-palette-200 text-sm">
          <div className="px-3 py-1 font-normal rounded-xl bg-palette-250">
            <p>{account?.name}</p>
          </div>
          <div className="px-3 py-1 font-normal rounded-xl text-palette-200 bg-palette-250">
            <p>{category?.name}</p>
          </div>
        </section>
        <h1 className="font-semibold text-2xl pl-1 text-palette-100">
          {transaction.description}
        </h1>
        <h2 className="text-2xl flex flex-row justify-start items-center gap-2 font-light text-palette-200">
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
