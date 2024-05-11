"use client";
import { es as dict } from "@lib/dictionaries";
import { DataTransferBoth, Download, Upload } from "iconoir-react";
import _ from "lodash";

export function TypeInput({ type }: { type?: string | null }) {
  const typeButtons = [
    {
      id: "income",
      name: dict.income,
      icon: <Download className="size-8" />,
      className: "peer/income hidden",
      color:
        "peer-checked/income:font-medium peer-checked/income:text-income peer-checked/income:border-income",
    },
    {
      id: "expense",
      name: dict.expense,
      icon: <Upload className="size-8" />,
      className: "peer/expense hidden",
      color:
        "peer-checked/expense:font-medium peer-checked/expense:text-expense peer-checked/expense:border-expense",
    },
    {
      id: "transfer",
      name: dict.transfer,
      icon: <DataTransferBoth className="size-8" />,
      className: "peer/transfer hidden",
      color:
        "peer-checked/transfer:font-medium peer-checked/transfer:text-transfer peer-checked/transfer:border-transfer",
    },
  ];

  return (
    <fieldset className="select-none flex w-full xl:w-3/5 3xl:w-1/2 flex-row justify-evenly lg:justify-start sm:gap-4 lg:gap-8">
      {typeButtons.map((button, index) => (
        <>
          <input
            name="type"
            id={button.id}
            className={button.className}
            type="radio"
            value={button.id}
            defaultChecked={type === button.id}
          ></input>
          <label
            key={index}
            htmlFor={button.id}
            className={`flex flex-col lg:flex-row lg:gap-2 justify-center items-center text-palette-250 ${button.color} cursor-pointer w-1/5 text-center p-2 lg:p-3 lg:text-lg rounded-lg border border-palette-250`}
          >
            {button.icon}
            <h1 className="hidden md:block">{button.name}</h1>
          </label>
        </>
      ))}
    </fieldset>
  );
}
