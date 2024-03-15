"use client";
import { lang } from "@/app/lib/const/string-en";
import { Transaction, Account } from "@/app/lib/types";

export function TypeInput({ type }: { type?: string | null }) {
  let incomeSelected = false; // type === "income" ? true : false;
  let expenseSelected = false; //type === "expense" ? true : false;
  let transferSelected = false; //type === "transfer" ? true : false;
  // const handleClick = (type: string) => {
  //   console.log(type);
  //   switch (type) {
  //     case "income":
  //       incomeSelected = !incomeSelected;
  //       expenseSelected = false;
  //       transferSelected = false;
  //       break;
  //     case "expense":
  //       incomeSelected = false;
  //       expenseSelected = !expenseSelected;
  //       transferSelected = false;
  //       break;
  //     case "transfer":
  //       incomeSelected = false;
  //       expenseSelected = false;
  //       transferSelected = !transferSelected;
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <section className="flex w-full xl:w-3/5 3xl:w-1/2 flex-row justify-evenly lg:justify-start sm:gap-4 lg:gap-8">
      <label
        htmlFor="income"
        className={`cursor-pointer transition ease-linear w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg hover:bg-green-200 hover:text-green-500 ${
          incomeSelected ? "bg-green-200 text-green-500" : ""
        }`}
      >
        <input
          name="type"
          id="income"
          title="Income"
          type="radio"
          value="income"
          // defaultChecked={incomeSelected}
          // onChange={() => handleClick("income")}
          required
          className="appearance-auto"
        ></input>
        Income
      </label>

      <label
        htmlFor="expense"
        className={`cursor-pointer transition ease-linear w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg hover:bg-red-200 hover:text-red-500 ${
          expenseSelected ? "bg-red-200 text-red-500" : ""
        }`}
      >
        <input
          name="type"
          id="expense"
          title="Expense"
          type="radio"
          value="expense"
          // defaultChecked={expenseSelected}
          // onChange={() => handleClick("expense")}
          required
          className="appearance-auto"
        ></input>
        Expense
      </label>

      <label
        htmlFor="transfer"
        className={`cursor-pointer transition ease-linear w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg hover:bg-violet-200 hover:text-violet-500 ${
          transferSelected ? "bg-violet-200 text-violet-500" : ""
        }`}
      >
        <input
          name="type"
          id="transfer"
          title="Transfer"
          type="radio"
          value="transfer"
          // defaultChecked={transferSelected}
          // onChange={() => handleClick("transfer")}
          required
          className="appearance-auto"
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
