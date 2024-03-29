"use client";
import { Transaction, Account } from "@/app/lib/types";
import { useSearchParams } from "next/navigation";
import Item from "./Item";

interface Props {
  accounts: Account[];
  transactions: Transaction[];
}

export default function TransactionTable({ accounts, transactions }: Props) {
  const orderedTransactions = transactions.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  const getAccount = (accountId: string) => {
    if (accounts.find((account) => account.id === accountId)) {
      return accounts.find((account) => account.id === accountId);
    } else {
      return undefined;
    }
  };
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const filteredTransactions = query
    ? orderedTransactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(query.toLowerCase())
      )
    : orderedTransactions;
  return (
    <div className="mt-6 2xl:mt-10 w-full flex flex-col items-center gap-4">
      {filteredTransactions.map((transaction) => (
        <Item
          key={transaction.id}
          transaction={transaction}
          account={getAccount(transaction.account_id)}
        ></Item>
      ))}
    </div>
  );
}
