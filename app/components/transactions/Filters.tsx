"use client";
import { Account, Transaction } from "@/app/lib/types";
import { CATEGORIES } from "@/app/lib/const/categories";
import { lang } from "@/app/lib/const/string-en";
import { useState } from "react";
import _ from "lodash";
import { formatDate } from "@/app/lib/utils";
import { Filter as FilterIcon, FilterSolid } from "iconoir-react";

interface FilterProps {
  name: string;
  options: any[];
}

interface Props {
  accounts: Account[];
  transactions: Transaction[];
}

function Filter({ name, options }: FilterProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [all, setAll] = useState<boolean>(true);
  const handleMenu = () => {
    setOpen(!open);
  };
  const handleAllClick = () => {
    setAll(!all);
  };
  const handleChange = (value: string) => {};
  return (
    <main className="relative mt-4">
      <button
        onClick={handleMenu}
        className={`relative w-48 px-4 py-1 rounded-xl border transition ${
          open
            ? "bg-yellow-100 text-yellow-400 border-yellow-300 font-medium"
            : "border-neutral-300 text-neutral-400 font-light"
        }`}
      >
        <FilterIcon className={`absolute ${open ? "hidden" : "block"}`} />
        <FilterSolid className={`absolute ${open ? "block" : "hidden"}`} />
        {_.capitalize(name)}
      </button>
      <div
        onMouseLeave={handleMenu}
        className={`${
          open ? "h-48" : "h-0"
        }  absolute w-48 transition-all mt-2 rounded bg-neutral-900 text-neutral-300 overflow-auto`}
      >
        <ul className="px-3 py-1 flex flex-col gap-1">
          <li key={0} className="flex flex-row gap-2">
            <input
              name="all"
              id={name}
              type="checkbox"
              onChange={handleAllClick}
              defaultChecked
            ></input>
            <label htmlFor="all">{lang.allText}</label>
          </li>
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

export default function Filters({ accounts, transactions }: Props) {
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
    <main className="hidden xl:flex flex-row gap-4 justify-start items-start w-full">
      <Filter name="account" options={accounts} />
      <Filter name="category" options={CATEGORIES} />
      <Filter name="date" options={dates} />
      <Filter name="month" options={months} />
    </main>
  );
}
