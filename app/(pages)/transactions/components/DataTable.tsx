"use client";
import { Account, Transaction } from "@lib/types";
import { formatBalance, formatDate, getLocalDate, showToast } from "@lib/utils";
import _ from "lodash";
import { useSearchParams } from "next/navigation";
import {
  EditPencil,
  MoreVert,
  Trash,
  FilterList,
  ArrowSeparateVertical,
} from "iconoir-react";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { deleteTransaction } from "@lib/actions";
import { dict } from "@lib/dictionaries";
import { CATEGORIES } from "@lib/consts/categories";

const FilterButton = ({
  setter,
  options,
}: {
  setter: (arg0: string) => void;
  options: { name: string; id: string }[];
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setter(event.target.value);
  };

  return (
    <>
      {/* <FilterList className="cursor-pointer" onClick={handleClick} /> */}
      <select
        title="selector"
        className="bg-palette-400"
        onChange={handleChange}
      >
        <option value="all">Todos</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

const OrderButton = ({
  state,
  setter,
}: {
  state: boolean | null;
  setter: (arg0: boolean) => void;
}) => {
  return (
    <ArrowSeparateVertical
      className="cursor-pointer"
      onClick={() => setter(!state)}
    />
  );
};

const DataRow = ({
  trx,
  acc,
}: {
  trx: Transaction;
  acc: Account | { name: string };
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { toasts } = dict;
  const datetime = new Date(parseInt(trx.created_at));
  return (
    <tr key={trx.id} className="bg-palette-300 border-b border-palette-300">
      <th
        scope="row"
        className="px-6 py-4 text-palette-100 whitespace-nowrap border-r border-palette-400"
      >
        {_.upperFirst(trx.description)}
      </th>
      <td className="px-6 py-4 text-palette-100/50 border-r border-palette-400">
        {acc.name}
      </td>
      <td className="px-6 py-4 text-palette-100/50 border-r border-palette-400">
        {dict.categories[trx.category]}
      </td>
      <td className="px-6 py-4 text-palette-100/50 border-r border-palette-400">
        {formatBalance(trx.amount / 100)}
      </td>
      <td className="pl-6 py-4 text-palette-100/50">{formatDate(datetime)}</td>
      <td className="relative flex justify-between py-4">
        <button title="Options" onClick={() => setPopoverOpen(!popoverOpen)}>
          <MoreVert
            className={`${
              popoverOpen
                ? "text-palette-500"
                : "text-palette-200 hover:text-palette-100"
            }`}
          />
        </button>
        <div
          className={`flex-row justify-between items-center px-3 absolute right-12 top-4 w-20 h-8 bg-palette-250 rounded-md shadow-md ${
            popoverOpen ? "flex" : "hidden"
          }`}
        >
          <Link
            href={`/transactions/edit/${trx.id}`}
            title="Edit transaction"
            onClick={() => setPopoverOpen(false)}
            className="text-palette-300 hover:text-palette-200 transition"
          >
            <EditPencil />
          </Link>
          <form
            action={async () => {
              try {
                await deleteTransaction(trx.id);
                showToast(toasts.success.deleteTransaction, "success");
              } catch (err) {
                showToast(toasts.error.deleteTransaction, "error");
                console.error(err);
              }
            }}
          >
            <button
              title="Delete transaction"
              type="submit"
              onClick={() => setPopoverOpen(false)}
              className="text-palette-300 hover:text-red-500 transition"
            >
              <Trash />
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
};

export default function DataTable({
  transactions,
  accounts,
}: {
  transactions: Transaction[];
  accounts: Account[];
}) {
  const { table: text, categories: categoriesText } = dict;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const q = params.get("q");

  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);

  const [accountFilter, setAccountFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // FALSE: ascending, TRUE: descending, NULL: default order (by date)
  const [amountOrder, setAmountOrder] = useState<boolean | null>(null);
  const [dateOrder, setDateOrder] = useState<boolean | null>(null);

  const categories = CATEGORIES.map((category) => ({
    name: categoriesText[category.id],
    id: category.id,
  }));

  useEffect(() => {
    if (q) {
      setFilteredTransactions(
        transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(q.toLowerCase())
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [q]);

  useEffect(() => {
    if (accountFilter && accountFilter !== "all") {
      setFilteredTransactions(
        transactions.filter(
          (transaction) => transaction.account_id == accountFilter
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [accountFilter]);

  useEffect(() => {
    if (categoryFilter && categoryFilter !== "all") {
      setFilteredTransactions(
        transactions.filter(
          (transaction) => transaction.category == categoryFilter
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [categoryFilter]);

  useEffect(() => {
    if (!amountOrder) {
      // ascending
      setFilteredTransactions(
        filteredTransactions.sort((a, b) => a.amount - b.amount)
      );
    } else {
      // descending
      setFilteredTransactions(
        filteredTransactions.sort((a, b) => b.amount - a.amount)
      );
    }
  }, [amountOrder]);

  useEffect(() => {
    if (!dateOrder) {
      // ascending
      setFilteredTransactions(
        filteredTransactions.sort(
          (a, b) => parseInt(a.created_at) - parseInt(b.created_at)
        )
      );
    } else {
      // descending
      setFilteredTransactions(
        filteredTransactions.sort(
          (a, b) => parseInt(b.created_at) - parseInt(a.created_at)
        )
      );
    }
  }, [dateOrder]);

  return (
    <>
      <thead className="sticky top-0 z-10 text-sm text-palette-500 font-light uppercase bg-palette-400">
        <tr>
          <th scope="col" className="px-6 py-3 ">
            {text.description}
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between relative">
              {text.account}
              <FilterButton setter={setAccountFilter} options={accounts} />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between relative">
              {text.category}
              <FilterButton setter={setCategoryFilter} options={categories} />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between">
              {text.amount}
              <OrderButton state={amountOrder} setter={setAmountOrder} />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between">
              {text.date}
              <OrderButton state={dateOrder} setter={setDateOrder} />
            </div>
          </th>
          <th scope="col" className="pr-2 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((trx, index) => {
          const acc = accounts.find((acc) => trx.account_id == acc.id) ?? {
            name: "?",
          };
          return <DataRow key={index} trx={trx} acc={acc} />;
        })}
      </tbody>
    </>
  );
}
