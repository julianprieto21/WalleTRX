"use client";

import { CATEGORIES } from "@lib/consts/categories";
import { SelectorInput } from "../../transactions/components/SelectorInput";
import { dict } from "@lib/dictionaries";
import { Account } from "@lib/types";
import { Download, Upload } from "iconoir-react";
import { useState } from "react";
import { SubmitBtn } from "../../transactions/components/FormBtns";
import { showToast } from "@lib/utils";
import { createInstallment } from "@lib/actions";

export default function InstallmentForm({ accounts }: { accounts: Account[] }) {
  const { input: text, toasts } = dict;
  const [type, setType] = useState<string>("");
  const PERIODS = [
    { id: "daily", name: dict.periods.daily },
    // { id: "weekly", name: dict.periods.weekly },
    { id: "monthly", name: dict.periods.monthly },
    { id: "yearly", name: dict.periods.yearly },
  ];
  const possibleQuantities = Array.from(
    { length: 24 },
    (_, index) => index + 1
  ); // 1, 2, 3, ..., 24
  return (
    <form
      className="flex flex-col justify-between h-full w-full"
      action={async (formData) => {
        try {
          await createInstallment(formData);
          showToast(toasts.success.createInstallment, "success");
        } catch (err) {
          showToast(toasts.error.createInstallment, "error");
          console.error(err);
        }
      }}
    >
      <h1 className="text-palette-500 text-2xl w-full font-bold">
        {dict.createInstallment}
      </h1>

      <fieldset className="flex flex-row items-center justify-start gap-4 mt-4">
        <input
          required
          name="type"
          id="income"
          className="hidden"
          type="radio"
          value="income"
          defaultChecked={type === "income"}
          onChange={(e) => setType(e.target.value)}
        ></input>
        <label
          htmlFor="income"
          className={`cursor-pointer p-2 border border-income rounded-full text-income ${
            type == "income" ? "bg-green-600/40" : "bg-transparent"
          }`}
        >
          <Download className="size-8" />
          <h1 className="hidden">income</h1>
        </label>
        <input
          required
          name="type"
          id="expense"
          className="hidden"
          type="radio"
          value="expense"
          defaultChecked={type === "expense"}
          onChange={(e) => setType(e.target.value)}
        ></input>
        <label
          htmlFor="expense"
          className={`cursor-pointer p-2 border border-expense rounded-full text-expense ${
            type == "expense" ? "bg-red-600/40" : "bg-transparent"
          }`}
        >
          <Upload className="size-8" />
          <h1 className="hidden">expense</h1>
        </label>

        <input
          name="name"
          type="text"
          placeholder={text.name}
          className="focus:border-palette-500 text-left h-12 rounded mx-2 pl-2 w-full border border-palette-250 bg-palette-400 text-palette-100 placeholder:text-palette-250"
          required
        ></input>
      </fieldset>

      <fieldset className="flex w-full flex-col gap-2 justify-center items-center mt-4 2xl:flex-row 2xl:justify-start 2xl:w-4/6 2xl:gap-6">
        <SelectorInput
          options={accounts}
          placeHolder={text.selector.account}
          id="account"
        />

        <SelectorInput
          options={CATEGORIES}
          placeHolder={text.selector.category}
          id="category"
        />
        <SelectorInput
          options={PERIODS}
          placeHolder="Seleccionar periodo"
          id="period"
        />
      </fieldset>
      <fieldset className="flex w-full flex-row gap-6 justify-start items-center mt-4 2xl:w-3/6">
        <input
          className="focus:border-palette-500 w-full pl-2 h-12 rounded border border-palette-250 text-palette-100 placeholder:text-palette-250 bg-palette-400 text-center"
          name="amount"
          title="Amount"
          type="text"
          placeholder={text.amount}
          required
        ></input>
        <select
          required
          title="Quantity"
          name="quantity"
          className="focus:border-palette-500 w-16 h-12 rounded border border-palette-250 text-palette-100 placeholder:text-palette-250 bg-palette-400 text-center"
        >
          <option value={0}>Ind.</option>
          {possibleQuantities.map((quantity, index) => {
            return (
              <option key={index} value={quantity}>
                {quantity}
              </option>
            );
          })}
        </select>
      </fieldset>
      <footer className="flex flex-row justify-end gap-4 px-2 mt-4">
        <SubmitBtn />
      </footer>
    </form>
  );
}
