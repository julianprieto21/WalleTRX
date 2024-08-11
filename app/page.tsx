import React from "react";
import { getBalanceByAccounts, getBalanceByDate, getUser } from "@lib/db";
import MainCard from "@components/wallet/MainCard";
import Last5transactions from "@components/wallet/Last5Transactions";
import { dict } from "@lib/dictionaries";
import Accounts from "@(pages)/accounts/components/Accounts";
import Greetings from "@components/Greetings";
import { LineChart } from "@components/wallet/LineChart";

export default async function HomePage() {
  const { hello: helloText } = dict;
  const user = await getUser();
  const transactions = await getBalanceByDate();
  const balanceByAccounts = await getBalanceByAccounts();
  if (!user) return;
  return (
    <main className="page pt-8 2xl:pt-12 pb-6 px-4 2xl:px-10 gap-6 2xl:gap-10 no-scrollbar">
      <section className="flex flex-col gap-6 justify-between items-start w-full 2xl:items-center 2xl:flex-row 2xl:gap-0">
        <div className="mt-4">
          <span className="font-semibold text-5xl text-palette-100">
            {helloText}
            {", "}
            <span className="text-palette-500">{user.name.split(" ")[0]}!</span>
          </span>
          <Greetings />
        </div>
        <Accounts balanceByAccounts={balanceByAccounts} />
      </section>

      <section className="flex flex-col gap-8 2xl:grid 2xl:grid-cols-5 2xl:grid-rows-2 2xl:gap-10 2xl:size-full">
        <div className="card h-80 2xl:col-span-2 2xl:h-auto">
          <MainCard user={user} />
        </div>
        <div className="card h-80 2xl:col-span-3 2xl:col-start-3 2xl:h-auto">
          <Last5transactions />
        </div>
        <div className="card 2xl:col-span-5 2xl:row-start-2 2xl:h-auto">
          <LineChart transactions={transactions} />
        </div>
      </section>
    </main>
  );
}
