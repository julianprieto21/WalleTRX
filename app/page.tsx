"use server";
import React from "react";
import { fetchData } from "./lib/fetch";
import { auth } from "@/auth";
import WalletActions from "@/app/components/wallet/WalletActions";
import MonthChart from "@/app/components/cards/MonthChart";
import AccountSummary from "@/app/components/cards/AccountSummary";
import BalanceWidget from "./components/wallet/BalanceWidget";
import MainTitle from "@/app/components/wallet/MainTitle";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.email) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const { accounts, transactions } = await fetchData(session.user.email);
    const userName = session.user.name ? session.user.name : "";
    const userImageUrl = session.user.image ? session.user.image : "";
    return (
      <main className="bg-neutral-200 h-screen w-[80%] flex flex-col justify-start items-center pb-10">
        <section className="select-none w-full flex flex-row items-center justify-center border-b pt-16 border-neutral-400 pb-4">
          <MainTitle userName={userName} userImageUrl={userImageUrl} />
          <BalanceWidget transactions={transactions} />
        </section>
        <section className="w-full flex justify-center pt-8 pb-4">
          <WalletActions transactions={transactions} />
        </section>
        <section className="w-full h-1/2 lg:flex flex-col lg:flex-row lg:justify-evenly py-8">
          <MonthChart transactions={transactions} />
          <AccountSummary accounts={accounts} transactions={transactions} />
        </section>
      </main>
    );
  }
}
