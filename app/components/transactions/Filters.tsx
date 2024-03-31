"use client";
import { Account, Transaction } from "@/app/lib/types";
import { CATEGORIES } from "@/app/lib/const/categories";
import { useState } from "react";
import _ from "lodash";
import { formatDate } from "@/app/lib/utils";
import { Filter as FilterIcon, FilterSolid } from "iconoir-react";

interface FilterProps {
  name: string;
  options: any[];
  allText: string;
}

interface Props {
  accounts: Account[];
  transactions: Transaction[];
  dict: any;
}

function Filter({ name, options, allText }: FilterProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleMenu = () => {
    setOpen(!open);
  };
  const handleChange = (value: string) => {};
  return (
    <main onMouseEnter={handleMenu} onMouseLeave={handleMenu}>
      <button
        type="button"
        className={`relative w-48 px-4 py-1 rounded-xl border transition ${
          open
            ? "bg-palette-500 text-palette-300 border-palette-400 font-medium"
            : "border-palette-250 text-palette-200 font-light"
        }`}
      >
        <FilterIcon className={`absolute ${open ? "hidden" : "block"}`} />
        <FilterSolid className={`absolute ${open ? "block" : "hidden"}`} />
        {_.capitalize(name)}
      </button>
      <div
        className={`${
          open ? "h-48" : "h-0"
        }  absolute w-48 transition-all mt-2 rounded bg-neutral-900 text-neutral-300 overflow-auto`}
      >
        <ul className="px-3 py-1 flex flex-col gap-1">
          {options.map((option, index) => (
            <li key={index} className="flex flex-row gap-2">
              <input
                name={option.id ? option.id : option}
                id={name}
                type="checkbox"
              ></input>
              <label htmlFor={option.id ? option.id : option}>
                {option.name ? option.name : option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default function Filters({ accounts, transactions, dict }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const dates = _.uniq(
    transactions
      .map((transaction) =>
        formatDate({ dateStr: transaction.created_at.toDateString() })
      )
      .toSorted()
  ).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });
  const months = _.uniq(
    transactions
      .map((transaction) =>
        formatDate({
          dateStr: transaction.created_at.toDateString(),
          day: "undefined",
        })
      )
      .toSorted()
  ).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });
  return (
    <main
      className={`mt-4 hidden xl:flex flex-row gap-4 justify-center items-center w-auto`}
    >
      <Filter
        name={dict.filters.account}
        options={accounts}
        allText={dict.input.selector.all}
      />
      <Filter
        name={dict.filters.category}
        options={CATEGORIES}
        allText={dict.input.selector.all}
      />
      <Filter
        name={dict.filters.date}
        options={dates}
        allText={dict.input.selector.all}
      />
      <Filter
        name={dict.filters.month}
        options={months}
        allText={dict.input.selector.all}
      />
    </main>
  );
}
