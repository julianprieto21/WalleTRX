import { lang } from "@/app/lib/const/string-en";
import { Transaction, Account } from "@/app/lib/types";

export function TypeInput({ type }: { type?: string | null }) {
  const incomeSelected = type === "income" ? true : false;
  const expenseSelected = type === "expense" ? true : false;
  const transferSelected = type === "transfer" ? true : false;

  return (
    <section className="flex w-full flex-row justify-evenly sm:justify-start sm:gap-4">
      <label
        htmlFor="income"
        className={`cursor-pointer p-2 lg:p-3 lg:text-lg rounded-lg hover:bg-green-200 hover:text-green-500 ${
          incomeSelected ? "bg-green-500 text-green-500" : ""
        }`}
      >
        <input
          name="type"
          id="income"
          title="Income"
          type="radio"
          value="income"
          defaultChecked={incomeSelected}
          required
          className="appearance-none"
        ></input>
        Income
      </label>

      <label
        htmlFor="expense"
        className={`cursor-pointer p-2 lg:p-3 lg:text-lg rounded-lg hover:bg-red-200 hover:text-red-500 ${
          incomeSelected ? "bg-red-500 text-red-500" : ""
        }`}
      >
        <input
          name="type"
          id="expense"
          title="Expense"
          type="radio"
          value="expense"
          defaultChecked={expenseSelected}
          required
          className="appearance-none"
        ></input>
        Expense
      </label>

      <label
        htmlFor="transfer"
        className={`cursor-pointer p-2 lg:p-3 lg:text-lg rounded-lg hover:bg-violet-200 hover:text-violet-500 ${
          incomeSelected ? "bg-violet-500 text-violet-500" : ""
        }`}
      >
        <input
          name="type"
          id="transfer"
          title="Transfer"
          type="radio"
          value="transfer"
          defaultChecked={transferSelected}
          required
          className="appearance-none"
        ></input>
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
      className="w-1/2 pl-1 h-8 rounded border border-neutral-200"
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
      className="w-1/2 pl-1 h-8 rounded border border-neutral-200"
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
