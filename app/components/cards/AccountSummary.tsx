import { Account, Transaction } from "@/app/lib/types";
import Card from "../Card";
import { formatBalance } from "@/app/lib/utils";
import { lang } from "@/app/lib/const/string-en";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function AccountSummary({
  accounts,
  transactions,
}: {
  accounts: Account[];
  transactions: Transaction[];
}) {
  const balanceByAccount = accounts.map((acc) => {
    const registros = transactions.filter((t) => t.account_id === acc.id);
    const balance = registros.reduce((acc, t) => acc + t.amount, 0);
    return {
      account: acc,
      balance: balance / 100,
    };
  });
  return (
    <Card title={lang.accountSummaryText}>
      <ul className="w-full h-full flex flex-col gap-2">
        {balanceByAccount.map((acc) => {
          return (
            <li
              key={acc.account.id}
              className="flex flex-row justify-between items-center p-4 border rounded-lg"
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <span
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: acc.account.color }}
                ></span>
                <h1 className="font-medium text-md">{acc.account.name}</h1>
              </div>

              <div className="flex flex-row justify-center items-center gap-4">
                <p>{formatBalance(acc.balance, "auto")}</p>
                <Link
                  href={`/accounts/${acc.account.id}`}
                  className="w-6 h-6 flex justify-center items-center"
                >
                  <ChevronRightIcon className="size-4 text-neutral-400 hover:size-6 hover:text-neutral-800" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
