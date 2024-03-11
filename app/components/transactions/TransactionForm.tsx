// "use client";
import { createTransaction, editTransaction } from "@/app/lib/actions";
import { lang } from "@/app/lib/const/string-en";
import { Account, Transaction } from "@/app/lib/types";
import { AccountSelector, CategorySelector, TypeInput } from "./FormInputs";
import { CloseButton, SubmitButton } from "../buttons";

interface Props {
  action?: "create" | "edit";
  accounts: Account[];
  transaction?: Transaction;
  categories: string[];
}

function FormSchema({ accounts, transaction, categories }: Props) {
  const defaultDate = transaction
    ? new Date(transaction.created_at)
    : new Date();
  const formattedDate = defaultDate.toISOString().split("T")[0];
  const amountInCents = transaction?.amount;
  const amount = amountInCents ? Math.abs(amountInCents / 100) : "";
  return (
    <main className="flex flex-col gap-4 px-4 py-6">
      <TypeInput type={transaction?.type} />
      <input
        name="description"
        type="text"
        placeholder="Description"
        className="text-left h-12 rounded-md pl-2 border border-neutral-200"
        defaultValue={transaction?.description}
        required
      ></input>
      <section className="flex flex-row gap-6">
        <AccountSelector accounts={accounts} transaction={transaction} />
        <CategorySelector categories={categories} transaction={transaction} />
        {/* {transaction?.type === "transfer" ? (
          <>
            <ArrowLongRightIcon className="size-8 stroke-gray-300" />
            <AccountSelector accounts={accounts} />
          </>
        ) : transaction?.type === "income" ||
          transaction?.type === "expense" ? (
          <>
            <ArrowDownTrayIcon className="size-8 stroke-gray-300" />
            <CategorySelector
              categories={categories}
              transaction={transaction}
            />
          </>
        ) : (
          <>
            <ArrowUpTrayIcon className="size-8 stroke-gray-300" />
            <CategorySelector
              categories={categories}
              transaction={transaction}
            />
          </>
        )} */}

        <div className="flex justify-center items-center gap-2">
          <input
            id="recurrent"
            title="Recurrent Payment"
            type="checkbox"
          ></input>
          <label htmlFor="recurrent" className="cursor-pointer">
            {lang.recurrent}
          </label>
        </div>
      </section>
      <section className="flex flex-row gap-6 items-center">
        <input
          className="w-60 pl-2 h-12 rounded border border-neutral-200 text-center"
          name="amount"
          title="Amount"
          type="text"
          placeholder="Amount"
          defaultValue={amount}
          required
        ></input>
        <input
          className="w-34 h-12 rounded border border-neutral-200 flex justify-center px-2"
          name="date"
          type="date"
          title="Date"
          defaultValue={formattedDate}
          required
        ></input>
      </section>
      <footer className="flex flex-row justify-end gap-4">
        <CloseButton />
        <SubmitButton />
      </footer>
    </main>
  );
}

export default function TransactionForm({
  action,
  accounts,
  transaction,
  categories,
}: Props) {
  switch (action) {
    case "create":
      return (
        <form
          action={createTransaction}
          className="w-full bg-neutral-100 rounded-lg shadow-md"
        >
          <FormSchema accounts={accounts} categories={categories} />
        </form>
      );
    case "edit":
      if (!transaction) return null;
      const editTransactionWithId = editTransaction.bind(
        null,
        transaction.transaction_id
      );
      return (
        <form
          action={editTransactionWithId}
          className="w-full bg-neutral-100 rounded-lg shadow-md"
        >
          <FormSchema
            transaction={transaction}
            accounts={accounts}
            categories={categories}
          />
        </form>
      );
    default:
      null;
  }
}
