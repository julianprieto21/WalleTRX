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
import { getDictionary } from "./lib/dictionaries";

export default async function HomePage() {
  const session = await auth();
  const dict = await getDictionary("es");
  if (!session?.user?.email) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const { accounts, transactions } = await fetchData(session.user.email);
    const userName = session.user.name ? session.user.name : "";
    const userImageUrl = session.user.image ? session.user.image : "";
    return (
      <main className="mt-20 sm:mt-0 bg-neutral-200 flex flex-col justify-start items-center pb-10 sm:pb-0 overflow-auto flex-1">
        <section className="select-none w-full flex flex-row-reverse sm:flex-row items-center justify-center border-b pt-8 xl:pt-10 2xl:pt-16 border-neutral-400 pb-4 px-4 sm:px-0">
          <MainTitle
            userName={userName}
            userImageUrl={userImageUrl}
            dict={dict}
          />
          <BalanceWidget transactions={transactions} dict={dict} />
        </section>
        <section className="w-full flex justify-center pt-8 xl:pt-6 2xl:pt-8 pb-4 xl:pb-0 2xl:pb-4">
          <WalletActions transactions={transactions} />
        </section>
        <section className="w-full h-full flex flex-col lg:flex-row items-center lg:justify-evenly xl:py-0 2xl:py-8 gap-10 px-4">
          <Card
            title={dict.cards.accountSummary}
            style="w-full h-64 xl:h-60 2xl:h-96 lg:w-2/5"
          >
            <AccountSummary
              accounts={accounts}
              transactions={transactions}
              dict={dict}
            />
          </Card>
          <Card
            title={dict.cards.monthChart}
            style="w-full h-60 xl:h-78 2xl:h-96 lg:w-2/5"
          >
            <MonthChart transactions={transactions} />
          </Card>
        </section>
      </main>
    );
  }
}
