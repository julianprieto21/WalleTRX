"use client";
import { Transaction } from "@/app/lib/types";
import {
  DataTransferBoth,
  Download,
  NavArrowDown,
  Upload,
} from "iconoir-react";
import _ from "lodash";
import { useEffect, useState } from "react";

export function TypeInput({ type }: { type?: string | null }) {
  let incomeSelected = type === "income" ? true : false;
  let expenseSelected = type === "expense" ? true : false;
  let transferSelected = type === "transfer" ? true : false;

  return (
    <fieldset className="select-none flex w-full xl:w-3/5 3xl:w-1/2 flex-row justify-evenly lg:justify-start sm:gap-4 lg:gap-8">
      <input
        name="type"
        id="income"
        title="Income"
        type="radio"
        value="income"
        required
        defaultChecked={incomeSelected}
        className="peer/income hidden"
      ></input>
      <label
        htmlFor="income"
        className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center text-neutral-300 peer-checked/income:font-medium peer-checked/income:bg-green-200 peer-checked/income:text-green-500 peer-checked/income:border-green-300 cursor-pointer w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg border"
      >
        <Download className="size-8" />
        <h1 className="hidden md:block">Income</h1>
      </label>

      <input
        name="type"
        id="expense"
        title="Expense"
        type="radio"
        value="expense"
        required
        defaultChecked={expenseSelected}
        className="peer/expense hidden"
      ></input>
      <label
        htmlFor="expense"
        className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center text-neutral-300 peer-checked/expense:font-medium peer-checked/expense:bg-red-200 peer-checked/expense:text-red-500 peer-checked/expense:border-red-300 cursor-pointer w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg border"
      >
        <Upload className="size-8" />
        <h1 className="hidden md:block">Expense</h1>
      </label>

      <input
        name="type"
        id="transfer"
        title="Transfer"
        type="radio"
        value="transfer"
        required
        defaultChecked={transferSelected}
        className="peer/transfer hidden"
      ></input>
      <label
        htmlFor="transfer"
        className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center text-neutral-300 peer-checked/transfer:font-medium peer-checked/transfer:bg-violet-200 peer-checked/transfer:text-violet-500 peer-checked/transfer:border-violet-300 cursor-pointer w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg border"
      >
        <DataTransferBoth className="rotate-90 size-8" />
        <h1 className="hidden md:block">Transfer</h1>
      </label>
    </fieldset>
  );
}

export function Selector({
  list,
  transaction,
  inputId,
  text,
}: {
  list: any[];
  transaction?: Transaction;
  inputId: string;
  text: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<string>("");

  const handleInputClick = (option: string, value: string) => {
    setOpen(!open);
    setTextButton(option);
    setDefaultValue(value);
  };
  useEffect(() => {
    if (!transaction) {
      setTextButton("");
      setDefaultValue("");
      return;
    }
    switch (inputId) {
      case "account":
        const account = list.find((acc) => acc.id === transaction?.account_id);
        setTextButton(account ? account.name : "");
        setDefaultValue(
          account
            ? account.id + (account.wallet_id ? `&${account.wallet_id}` : "")
            : ""
        );
        break;
      case "category":
        const category = list.find((cat) => cat.id === transaction?.category);
        console.log(category);
        setTextButton(category?.name || "");
        setDefaultValue(category?.id || "");
        break;
      default:
        setTextButton("");
        setDefaultValue("");
    }
  }, [transaction, inputId, list]);
  return (
    <main className="w-4/5 md:w-2/5 flex flex-col gap-1 relative">
      <button
        type="button"
        className={`rounded transition flex flex-row justify-between items-center px-2 border bg-white text-gray-400 
        ${open ? "text-neutral-100 bg-zinc-800 font-semibold" : ""}
      }`}
        onClick={() => setOpen(!open)}
      >
        <h1 className={`${textButton ? "text-neutral-700 font-normal" : ""}`}>
          {textButton ? textButton : text}
        </h1>
        <NavArrowDown
          className={`${open ? "rotate-180" : ""} transition size-8`}
        />
      </button>

      <div
        className={`${
          open ? "absolute" : "hidden"
        } transition z-10 rounded bg-neutral-900 text-neutral-300 mt-10 w-full overflow-auto max-h-36`}
      >
        <ul className="w-full flex-col flex justify-center gap-2 py-2">
          {list.map((obj: any, index: number) => (
            <li key={index}>
              <input
                name={inputId}
                title={obj.name}
                id={obj.id}
                value={obj.id + `${obj.wallet_id ? `&${obj.wallet_id}` : ""}`}
                checked={
                  defaultValue ===
                  obj.id + (obj.wallet_id ? `&${obj.wallet_id}` : "")
                }
                type="radio"
                className="hidden peer"
                required
              ></input>
              <label
                className="pl-2 py-1 flex items-center gap-2 peer-checked:bg-neutral-800 peer-checked:text-neutral-50 hover:bg-neutral-800 hover:text-neutral-50"
                htmlFor={obj.id}
                onClick={() =>
                  handleInputClick(
                    obj.name,
                    obj.id + `${obj.wallet_id ? `&${obj.wallet_id}` : ""}`
                  )
                }
              >
                <span
                  className={`w-4 h-4 rounded-full`}
                  style={{ backgroundColor: obj.color }}
                ></span>
                {obj.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
