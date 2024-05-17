"use client";
import { dict } from "@lib/dictionaries";
import { SelectorInput } from "./SelectorInput";
import { TypeInput } from "./TypeInput";
import { CancelBtn, SubmitBtn } from "./FormBtns";
import { Account, Transaction } from "@lib/types";
import { editTransaction } from "@lib/actions";
import { toast } from "sonner";
import { showToast } from "@lib/utils";
import { CATEGORIES } from "@lib/consts/categories";

export default function EditForm({
  transaction,
  accounts,
}: {
  transaction: Transaction;
  accounts: Account[];
}) {
  const type = transaction.type;
  const date = transaction.created_at.toISOString().split("T")[0];
  const { input: text, toasts } = dict;
  return (
    <form
      action={async (formData) => {
        try {
          await editTransaction(transaction.id, formData);
          showToast(toasts.successEditTransaction, "success");
        } catch (err) {
          showToast(toasts.errorEditTransaction, "error");
          console.error(err);
        }
      }}
      className="w-full bg-palette-300 rounded-lg shadow-md"
    >
      <main className="flex flex-col gap-6 px-2 py-4 md:gap-4 md:px-4 lg:gap-6">
        <TypeInput type={type} />
        <input
          name="description"
          type="text"
          placeholder={text.description}
          defaultValue={transaction.description}
          className="text-left h-12 rounded pl-2 border border-palette-250 bg-palette-400 text-palette-100 placeholder:text-palette-250"
          required
        ></input>
        <section className="flex flex-col w-full lg:w-4/5 md:flex-row gap-2 md:gap-6 justify-center md:justify-start items-center">
          <SelectorInput
            options={accounts}
            placeHolder={text.selector.account}
            id="account"
            selected={transaction.account_id}
          />
          <SelectorInput
            options={CATEGORIES}
            placeHolder={text.selector.category}
            id="category"
            selected={transaction.category}
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
              className="w-full md:w-auto text-center cursor-pointer border border-palette-250 text-palette-250 px-2 py-1 rounded peer-checked:text-palette-500 peer-checked:border-palette-500 peer-checked:bg-palette-400"
            >
              {text.recurrent}
            </label>
          </div>
        </section>
        <section className="flex flex-row w-full lg:w-3/5 gap-2 items-center">
          <input
            className="w-2/5 sm:w-3/5 sm:pl-2 h-12 rounded border border-palette-250 text-palette-100 placeholder:text-palette-250 bg-palette-400 text-center"
            name="amount"
            title="Amount"
            type="text"
            placeholder={text.amount}
            defaultValue={Math.abs(transaction.amount) / 100}
            required
          ></input>
          <input
            className="w-3/5 sm:w-2/5 h-12 rounded border border-palette-250 text-palette-100 placeholder:text-palette-250 bg-palette-400 flex justify-center px-2"
            name="date"
            type="date"
            title="Date"
            defaultValue={date}
            required
          ></input>
        </section>
        <footer className="flex flex-row justify-between sm:justify-end gap-4 px-2">
          <CancelBtn />
          <SubmitBtn />
        </footer>
      </main>
    </form>
  );
}
