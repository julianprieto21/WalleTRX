"use client";
import { Account, Transaction } from "@/app/lib/types";
import {
  DataTransferBoth,
  Download,
  NavArrowDown,
  Upload,
} from "iconoir-react";
import _ from "lodash";
import { useEffect, useState } from "react";

export function TypeInput({ type, dict }: { type?: string | null; dict: any }) {
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
        className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center text-palette-250 peer-checked/income:font-medium peer-checked/income:text-income peer-checked/income:border-income cursor-pointer w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg border border-palette-250"
      >
        <Download className="size-8" />
        <h1 className="hidden md:block">{dict.income}</h1>
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
        className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center text-palette-250 peer-checked/expense:font-medium peer-checked/expense:text-expense peer-checked/expense:border-expense cursor-pointer w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg border border-palette-250"
      >
        <Upload className="size-8" />
        <h1 className="hidden md:block">{dict.expense}</h1>
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
        className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center text-palette-250 peer-checked/transfer:font-medium peer-checked/transfer:text-transfer peer-checked/transfer:border-transfer cursor-pointer w-1/5  text-center p-2 lg:p-3 lg:text-lg rounded-lg border border-palette-250"
      >
        <DataTransferBoth className="rotate-90 size-8" />
        <h1 className="hidden md:block">{dict.transfer}</h1>
      </label>
    </fieldset>
  );
}

export function Selector({
  list,
  object,
  inputId,
  text,
}: {
  list: any[];
  object?: any;
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
    if (!object) {
      setTextButton("");
      setDefaultValue("");
      return;
    }
    switch (inputId) {
      case "account":
        const account = list.find((acc) => acc.id === object.id);
        setTextButton(account ? account.name : "");
        setDefaultValue(account ? account.id : "");
        break;
      case "category":
        const category = list.find((cat) => cat.id === object.category);
        setTextButton(category?.name || "");
        setDefaultValue(category?.id || "");
        break;
      case "currency":
        const currency = list.find((curr) => curr.id === object.currency);
        setTextButton(currency?.name || "");
        setDefaultValue(currency?.id || "");
      default:
        setTextButton("");
        setDefaultValue("");
    }
  }, [object, inputId, list]);
  return (
    <main className="w-4/5 md:w-2/5 flex flex-col gap-1 relative">
      <button
        type="button"
        className={`rounded transition flex flex-row justify-between font-medium items-center px-2 border border-palette-250 bg-palette-300 text-palette-200 
        ${open ? "text-palette-400 bg-palette-500" : ""}
      }`}
        onClick={() => setOpen(!open)}
      >
        <h1 className={`${textButton ? "text-palette-100 font-normal" : ""}`}>
          {textButton ? textButton : text}
        </h1>
        <NavArrowDown
          className={`${open ? "rotate-180" : ""} transition size-8`}
        />
      </button>

      <div
        className={`${
          open ? "absolute" : "hidden"
        } transition z-10 rounded bg-palette-400 text-palette-100 mt-10 w-full overflow-auto max-h-36`}
      >
        <ul className="w-full flex-col flex justify-center gap-2 py-2">
          {list.map((obj: any, index: number) => (
            <li key={index}>
              <input
                name={inputId}
                title={obj.name}
                id={obj.id}
                value={obj.id}
                checked={defaultValue === obj.id}
                type="radio"
                className="hidden peer"
                required
              ></input>
              <label
                className="pl-2 py-1 flex items-center gap-2 peer-checked:bg-palette-300 peer-checked:text-palette-100 hover:bg-palette-300"
                htmlFor={obj.id}
                onClick={() => handleInputClick(obj.name, obj.id)}
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
