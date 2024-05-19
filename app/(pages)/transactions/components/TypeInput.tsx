"use client";
import { dict } from "@lib/dictionaries";
import { DataTransferBoth, Download, Upload } from "iconoir-react";
import _ from "lodash";

export function TypeInput({ type }: { type?: string | null }) {
  const { transactions: text } = dict;
  const typeButtons = [
    {
      id: "income",
      name: text.income,
      icon: <Download className="size-8" />,
      className: "peer/income hidden",
      color:
        "peer-checked/income:font-medium peer-checked/income:text-income peer-checked/income:border-income",
    },
    {
      id: "expense",
      name: text.expense,
      icon: <Upload className="size-8" />,
      className: "peer/expense hidden",
      color:
        "peer-checked/expense:font-medium peer-checked/expense:text-expense peer-checked/expense:border-expense",
    },
    {
      id: "transfer",
      name: text.transfer,
      icon: <DataTransferBoth className="size-8" />,
      className: "peer/transfer hidden",
      color:
        "peer-checked/transfer:font-medium peer-checked/transfer:text-transfer peer-checked/transfer:border-transfer",
    },
  ];

  return (
    <fieldset className="select-none flex w-full 2xl:w-1/2 flex-row justify-evenly 2xl:justify-start gap-4 2xl:gap-8">
      {typeButtons.map((button, index) => (
        <div key={index} className="w-full">
          <input
            name="type"
            id={button.id}
            className={button.className}
            type="radio"
            value={button.id}
            defaultChecked={type === button.id}
          ></input>
          <label
            htmlFor={button.id}
            className={`w-full flex flex-col 2xl:flex-row 2xl:gap-2 justify-center items-center text-palette-250 ${button.color} cursor-pointer w-1/5 text-center p-2 2xl:p-3 2xl:text-lg rounded-lg border border-palette-250`}
          >
            {button.icon}
            <h1 className="hidden 2xl:block">{button.name}</h1>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
