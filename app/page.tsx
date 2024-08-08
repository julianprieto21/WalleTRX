import React, { Suspense } from "react";
import { getBalanceByDate, getUser } from "@lib/db";
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
  if (!user) return;
  return (
    <main className="page pt-8 2xl:pt-12 pb-6 px-4 2xl:px-10 gap-6 2xl:gap-10 no-scrollbar">
      <div className="mt-4">
        <span className="font-semibold text-5xl text-palette-100">
          {helloText},{" "}
          <span className="text-palette-500">{user.name.split(" ")[0]}!</span>
        </span>
        <Greetings />
      </div>

      <div className="shrink-0 mt-4 2xl:mt-0 h-auto 2xl:h-auto py-2 2xl:absolute 2xl:right-10 2xl:top-10 overflow-x-scroll no-scrollbar">
        <Accounts />
      </div>
      <section className="grid grid-cols-2 grid-rows-2 gap-10 size-full mt-4">
        <div className="rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <MainCard user={user} />
        </div>
        <div className="rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <Last5transactions />
        </div>
        <div className="col-span-2 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <LineChart transactions={transactions} />
        </div>
      </section>
    </main>
  );
}
