import { lang } from "@/app/lib/const/string-en";
import { Transaction, Account } from "@/app/lib/types";
import { formatDate, formatBalance } from "@/app/lib/utils";
import Breadcrumbs from "../Breadcrumbs";
import SearchBar from "../Searchbar";
import {
  CreateTransaction,
  DeleteTransaction,
  EditTransaction,
} from "../buttons";

interface Props {
  accounts: Account[];
  transactions: Transaction[];
}

export default function TransactionTable({ accounts, transactions }: Props) {
  const orderedTransactions = transactions.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  const getAccount = (accountId: string) => {
    if (accounts.find((account) => account.account_id === accountId)) {
      return accounts.find((account) => account.account_id === accountId)?.name;
    } else {
      return "-";
    }
  };
  return (
    <div className="w-[100%] mt-6 flex flex-col justify-center">
      <div className="rounded-lg bg-neutral-300 p-2">
        <table className="min-w-full">
          <thead className="rounded-lg text-left font-normal text-neutral-800">
            <tr>
              <th scope="col" className="px-4 py-5 font-bold text-lg">
                {lang.descriptionTableText}
              </th>
              <th scope="col" className="px-3 py-5 font-bold text-lg">
                {lang.categoryTableText}
              </th>
              <th scope="col" className="px-3 py-5 font-bold text-lg">
                {lang.account}
              </th>
              <th scope="col" className="px-3 py-5 font-bold text-lg">
                {lang.dateTableText}
              </th>
              <th scope="col" className="px-3 py-5 font-bold text-lg">
                {lang.amountTableText}
              </th>
            </tr>
          </thead>
          <tbody className="bg-neutral-100">
            {orderedTransactions?.map((transaction) => (
              <tr
                key={transaction.transaction_id}
                className="w-full border-b py-3 text-md last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-1 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    {transaction.description}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {transaction.category}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {getAccount(transaction.account_id)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatDate(transaction.created_at.toDateString())}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatBalance(transaction.amount / 100)}
                </td>
                <td className="py-2 pr-4 gap-6">
                  <div className="flex justify-end gap-3">
                    <DeleteTransaction id={transaction.transaction_id} />
                    <EditTransaction id={transaction.transaction_id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
