"use client";
import { lang } from "@/app/lib/const/string-en";
import { Transaction, Account } from "@/app/lib/types";
import { formatDate, formatBalance } from "@/app/lib/utils";
import { DeleteTransaction, EditTransaction } from "../buttons";
import { round } from "lodash";
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
    <div className="mt-6 2xl:mt-14 w-full flex flex-col items-center gap-4">
      {filteredTransactions.map((transaction) => (
        <Item
          key={transaction.id}
          transaction={transaction}
          account={getAccount(transaction.account_id)}
        ></Item>
      ))}
    </div>
  );
  //   <div className="mt-6 w-full flex flex-col justify-center">
  //     <div className="rounded-lg bg-neutral-300 p-2">
  //       <table className="w-full">
  //         <thead className="rounded-lg text-left font-normal text-neutral-800">
  //           <tr>
  //             <th
  //               scope="col"
  //               className="py-3 px-2 font-bold text-xl sm:text-lg 2xl:text-xl"
  //             >
  //               {lang.descriptionTableText}
  //             </th>
  //             <th
  //               scope="col"
  //               className="hidden md:table-cell px-3 py-5 font-bold text-lg 2xl:text-xl"
  //             >
  //               {lang.categoryTableText}
  //             </th>
  //             <th
  //               scope="col"
  //               className="hidden xl:table-cell px-3 py-5 font-bold text-lg 2xl:text-xl"
  //             >
  //               {lang.account}
  //             </th>
  //             <th
  //               scope="col"
  //               className="hidden lg:table-cell px-3 py-5 font-bold text-lg 2xl:text-xl"
  //             >
  //               {lang.dateTableText}
  //             </th>
  //             <th
  //               scope="col"
  //               className="hidden sm:table-cell px-3 py-5 font-bold text-lg 2xl:text-xl"
  //             >
  //               {lang.amountTableText}
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody className="bg-neutral-100 w-full">
  //           {filteredTransactions.map((transaction) => (
  //             <tr
  //               key={transaction.id}
  //               className="w-full border-b py-3 text-md last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
  //             >
  //               <td className="whitespace-nowrap py-1">
  //                 <div className="flex items-center gap-3 text-md px-4 md:text-md 2xl:text-lg">
  //                   {transaction.description}
  //                 </div>
  //               </td>
  //               <td className="hidden lg:table-cell whitespace-nowrap px-3 py-2 2xl:text-lg">
  //                 {transaction.category}
  //               </td>
  //               <td className="hidden xl:table-cell whitespace-nowrap px-3 py-2 2xl:text-lg">
  //                 {getAccount(transaction.account_id)}
  //               </td>
  //               <td className="hidden md:table-cell whitespace-nowrap px-3 py-2 2xl:text-lg">
  //                 {formatDate(transaction.created_at.toDateString())}
  //               </td>
  //               <td className="hidden sm:table-cell whitespace-nowrap px-3 py-2 sm:text-md 2xl:text-lg">
  //                 {formatBalance(transaction.amount / 100, "always")}
  //               </td>
  //               <td className="py-2 pr-4 gap-6">
  //                 <div className="flex justify-end gap-3">
  //                   <DeleteTransaction id={transaction.id} />
  //                   <EditTransaction id={transaction.id} />
  //                 </div>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}
