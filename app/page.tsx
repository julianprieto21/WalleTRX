"use server";
import React from "react";
import { fetchData } from "./lib/fetch";
import { auth } from "@/auth";
import WalletActions from "@/app/components/wallet/WalletActions";
import MonthChart from "@/app/components/wallet/MonthChart";
import AccountSummary from "@/app/components/wallet/AccountSummary";
import BalanceWidget from "./components/wallet/BalanceWidget";
import MainTitle from "@/app/components/wallet/MainTitle";
import Card from "./components/Card";
import { lang } from "./lib/const/string-en";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.email) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const { accounts, transactions } = await fetchData(session.user.email);
    const userName = session.user.name ? session.user.name : "";
    const userImageUrl = session.user.image ? session.user.image : "";
    return (
      <main className="mt-20 sm:mt-0 bg-neutral-200 flex flex-col justify-start items-center pb-10 sm:pb-0 overflow-auto flex-1">
        <section className="select-none w-full flex flex-row-reverse sm:flex-row items-center justify-center border-b pt-8 sm:pt-16 border-neutral-400 pb-4 px-4 sm:px-0">
          <MainTitle userName={userName} userImageUrl={userImageUrl} />
          <BalanceWidget transactions={transactions} />
        </section>
        <section className="w-full flex justify-center pt-8 pb-4">
          <WalletActions transactions={transactions} />
        </section>
        <section className="w-full h-auto flex flex-col lg:flex-row items-center lg:justify-evenly py-8 gap-10 sm:gap-0 px-4 sm:px-0">
          <Card
            title={lang.accountSummaryText}
            style="w-full h-64 sm:h-96 lg:w-2/5"
          >
            <AccountSummary accounts={accounts} transactions={transactions} />
          </Card>
          <Card
            title={lang.monthChartText}
            style="w-full h-64 sm:h-96 lg:w-2/5"
          >
            <MonthChart transactions={transactions} />
          </Card>
        </section>
      </main>
    );
  }
}
