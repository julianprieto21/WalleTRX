"use client";
import { lang } from "@/app/lib/const/string-en";
import { Account, Transaction } from "@/app/lib/types";
import { getBalanceFromTransactions } from "@/app/lib/utils";
import BalanceWidget from "@/app/components/wallet/BalanceWidget";
import { AccountSelector } from "@/app/components/wallet/AccountSelector";
import { useSearchParams } from "next/navigation";

function MainTitle({ userName }: { userName: string }) {
  return (
    <div className="hidden sm:block w-1/2 pl-4 sm:pl-0">
      <div className="flex flex-col justify-center items-center text-left">
        <h1 className="text-5xl sm:text-7xl font-semibold m-0 p-0">
          <h1 className="text-5xl sm:text-7xl font-thin">{lang.hiText},</h1>
          {userName.split(" ")[0]}
        </h1>
      </div>
    </div>
  );
}

interface Props {
  userName: string;
  transactions: Transaction[];
  accounts: Account[];
}

export default function WalletInfo({
  userName,
  transactions,
  accounts,
}: Props) {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("account");
  let filteredTransactions = transactions;
  if (accountId) {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.account_id === accountId
    );
  }
  const { income, expense } = getBalanceFromTransactions(filteredTransactions);
  const balance = income + expense;
  return (
    <div className="w-full xl:w-3/4 h-1/4 lg:h-4/6 sm:h-1/2 flex flex-row items-center justify-center pb-4">
      <MainTitle userName={userName} />
      <div className="flex flex-col items-center w-3/4 sm:w-1/2 gap-6 sm:gap-4">
        <BalanceWidget balance={balance} />
        <AccountSelector accounts={accounts} />
      </div>
    </div>
  );
}
