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
import { useEffect, useState } from "react";
import { deleteTransaction } from "@lib/actions";
import { dict } from "@lib/dictionaries";

const FilterButton = () => {
  return <FilterList className="cursor-pointer" />;
};

const OrderButton = () => {
  return <ArrowSeparateVertical className="cursor-pointer" />;
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
  const { table: text } = dict;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const q = params.get("q");

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

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

  return (
    <>
      <thead className="sticky top-0 z-10 text-sm text-palette-500 font-light uppercase bg-palette-400">
        <tr>
          <th scope="col" className="px-6 py-3 ">
            {text.description}
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between">
              {text.account}
              <FilterButton />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between">
              {text.category}
              <FilterButton />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between">
              {text.amount}
              <OrderButton />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex justify-between">
              {text.date}
              <OrderButton />
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
