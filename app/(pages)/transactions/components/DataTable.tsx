"use client";
import { Account, Transaction } from "@lib/types";
import { formatBalance, formatDate } from "@lib/utils";
import _ from "lodash";
import { useSearchParams } from "next/navigation";
import { MoreVert } from "iconoir-react";

export default function DataTable({
  transactions,
  accounts,
}: {
  transactions: Transaction[];
  accounts: Account[];
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const q = params.get("q");
  let filteredTransactions: Transaction[];

  if (q) {
    filteredTransactions = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(q.toLowerCase())
    );
  } else {
    filteredTransactions = transactions;
  }

  return (
    <tbody>
      {filteredTransactions.map((trx, index) => {
        const acc = accounts.find((acc) => trx.account_id == acc.id) ?? {
          name: "?",
        };
        return (
          <tr
            key={index}
            className="bg-palette-300 border-b border-palette-300"
          >
            <th
              scope="row"
              className="px-6 py-4 text-palette-100 whitespace-nowrap"
            >
              {_.upperFirst(trx.description)}
            </th>
            <td className="px-6 py-4 text-palette-100/50">{acc.name}</td>
            <td className="px-6 py-4 text-palette-100/50">
              {_.upperFirst(trx.category)}
            </td>
            <td className="px-6 py-4 text-palette-100/50">
              {formatBalance(trx.amount / 100)}
            </td>
            <td className="pl-6 py-4 text-palette-100/50">
              {formatDate({ date: trx.created_at })}
            </td>
            <td className="flex justify-between py-4">
              <MoreVert className="text-palette-200 hover:text-palette-100 cursor-pointer" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
