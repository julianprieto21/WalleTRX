"use client";
import { lang } from "@/app/lib/const/string-en";
import { Account, Transaction } from "@/app/lib/types";
import { getBalanceFromTransactions } from "@/app/lib/utils";
import BalanceWidget from "@/app/components/wallet/BalanceWidget";
import { AccountSelector } from "@/app/components/wallet/AccountSelector";
import { useSearchParams } from "next/navigation";

function MainTitle({
  userName,
  userImageUrl,
}: {
  userName: string;
  userImageUrl: string;
}) {
  return (
    <div className="hidden sm:block w-1/2 pl-4 sm:pl-0">
      <div className="flex flex-row justify-evenly items-center text-left">
        <img
          src={userImageUrl}
          alt="Imagen de perfil del usuario"
          className="hidden md:block rounded-full"
        ></img>
        <h1 className="text-5xl sm:text-7xl font-semibold m-0 p-0">
          <p className="text-5xl sm:text-7xl font-thin">{lang.hiText},</p>
          {userName.split(" ")[0]}
        </h1>
      </div>
    </div>
  );
}

interface Props {
  userName: string;
  userImageUrl: string;
  transactions: Transaction[];
  accounts: Account[];
}

export default function WalletInfo({
  userName,
  userImageUrl,
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
      <MainTitle userName={userName} userImageUrl={userImageUrl} />
      <div className="flex flex-col items-center w-3/4 sm:w-1/2 gap-6 sm:gap-4">
        <BalanceWidget balance={balance} />
        <AccountSelector accounts={accounts} />
      </div>
    </div>
  );
}
