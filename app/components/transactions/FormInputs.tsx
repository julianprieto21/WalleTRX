import { lang } from "@/app/lib/const/string-en";
import { Transaction, Account } from "@/app/lib/types";

export function TypeInput({ type }: { type?: string | null }) {
  const incomeSelected = type === "income" ? true : false;
  const expenseSelected = type === "expense" ? true : false;
  const transferSelected = type === "transfer" ? true : false;

  return (
    <section className="flex flex-row gap-4">
      <input
        name="type"
        id="income"
        title="Income"
        type="radio"
        value="income"
        defaultChecked={incomeSelected}
        required
      ></input>
      <label htmlFor="income" className="cursor-pointer">
        Income
      </label>

      <input
        name="type"
        id="expense"
        title="Expense"
        type="radio"
        value="expense"
        defaultChecked={expenseSelected}
        required
      ></input>
      <label htmlFor="expense" className="cursor-pointer">
        Expense
      </label>

      <input
        name="type"
        id="transfer"
        title="Transfer"
        type="radio"
        value="transfer"
        defaultChecked={transferSelected}
        required
      ></input>
      <label htmlFor="transfer" className="cursor-pointer">
        Transfer
      </label>
    </section>
  );
}

export function AccountSelector({
  accounts,
  transaction,
}: {
  accounts: Account[];
  transaction?: Transaction;
}) {
  return (
    <select
      className="w-60 pl-1 h-8 rounded border border-neutral-200"
      name="account"
      title="Account"
      defaultValue={transaction?.account_id + "&" + transaction?.wallet_id}
      required
    >
      <option value="" defaultChecked hidden>
        {lang.account}
      </option>
      {accounts.map((account: Account, index: number) => (
        <option
          key={index + 1}
          value={account.account_id + "&" + account.wallet_id}
        >
          {account.name}
        </option>
      ))}
    </select>
  );
}

export function CategorySelector({
  categories,
  transaction,
}: {
  categories: string[];
  transaction?: Transaction;
}) {
  return (
    <select
      className="w-60 pl-1 h-8 rounded border border-neutral-200"
      name="category"
      title="Category"
      defaultValue={transaction?.category}
      required
    >
      <option value="" defaultChecked hidden>
        {lang.category}
      </option>
      {categories.map((category: string, index: number) => (
        <option key={index + 1} value={category.toLowerCase()}>
          {category}
        </option>
      ))}
    </select>
  );
}
