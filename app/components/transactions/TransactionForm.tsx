// "use client";
import { createTransaction, editTransaction } from "@/app/lib/actions";
import { Account, Transaction } from "@/app/lib/types";
import { Selector, TypeInput } from "./FormInputs";
import { CloseButton, SubmitButton } from "../buttons";
import _ from "lodash";

interface Props {
  action?: "create" | "edit";
  accounts: Account[];
  transaction?: Transaction;
  categories: any;
  dict: any;
}

function FormSchema({ accounts, transaction, categories, dict }: Props) {
  const defaultDate = transaction
    ? new Date(transaction.created_at)
    : new Date();
  const formattedDate = defaultDate.toISOString().split("T")[0];
  const amountInCents = transaction?.amount;
  const amount = amountInCents ? Math.abs(amountInCents / 100) : "";
  const account = accounts.find((acc) => acc.id === transaction?.account_id);
  return (
    <main className="flex flex-col gap-6 px-2 py-4 md:gap-4 md:px-4 lg:gap-6">
      <TypeInput type={transaction?.type} dict={dict} />
      <input
        name="description"
        type="text"
        placeholder="Description"
        className="text-left h-12 rounded-md pl-2 border border-neutral-200"
        defaultValue={transaction?.description}
        required
      ></input>
      <section className="flex flex-col w-full lg:w-4/5 md:flex-row gap-2 md:gap-6 justify-center md:justify-start items-center">
        <Selector
          list={accounts}
          transaction={transaction}
          inputId="account"
          text={dict.input.selector.account}
        />
        <Selector
          list={categories}
          transaction={transaction}
          inputId="category"
          text={dict.input.selector.category}
        />
        <div className="w-2/5 md:w-auto flex justify-center items-center gap-2 select-none">
          <input
            id="recurrent"
            title="Recurrent Payment"
            type="checkbox"
            className="hidden peer"
          ></input>
          <label
            htmlFor="recurrent"
            className="w-full md:w-auto text-center cursor-pointer border px-2 py-1 rounded-md text-neutral-300 peer-checked:text-sky-500 peer-checked:border-sky-400 peer-checked:bg-sky-200"
          >
            {dict.input.recurrent}
          </label>
        </div>
      </section>
      <section className="flex flex-row w-full lg:w-3/5 gap-2 items-center">
        <input
          className="w-2/5 sm:w-3/5 sm:pl-2 h-12 rounded border border-neutral-200 text-center"
          name="amount"
          title="Amount"
          type="text"
          placeholder={dict.input.amount}
          defaultValue={amount}
          required
        ></input>
        <input
          className="w-3/5 sm:w-2/5 h-12 rounded border border-neutral-200 flex justify-center px-2"
          name="date"
          type="date"
          title="Date"
          defaultValue={formattedDate}
          required
        ></input>
      </section>
      <footer className="flex flex-row justify-between sm:justify-end gap-4 px-2">
        <CloseButton text={dict.buttons.cancel} />
        <SubmitButton text={dict.buttons.confirm} />
      </footer>
    </main>
  );
}

export default function TransactionForm({
  action,
  accounts,
  transaction,
  categories,
  dict,
}: Props) {
  switch (action) {
    case "create":
      return (
        <form
          action={createTransaction}
          className="w-full bg-neutral-100 rounded-lg shadow-md"
        >
          <FormSchema accounts={accounts} categories={categories} dict={dict} />
        </form>
      );
    case "edit":
      if (!transaction) return null;
      const editTransactionWithId = editTransaction.bind(null, transaction.id);
      return (
        <form
          action={editTransactionWithId}
          className="w-full bg-neutral-100 rounded-lg shadow-md"
        >
          <FormSchema
            transaction={transaction}
            accounts={accounts}
            categories={categories}
            dict={dict}
          />
        </form>
      );
    default:
      null;
  }
}
