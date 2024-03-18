"use server";
import React, { Suspense } from "react";
import { fetchData } from "./lib/fetch";
import { auth } from "@/auth";
import { getBalanceFromTransactions } from "@/app/lib/utils";
import WalletActions from "@/app/components/wallet/WalletActions";
import WalletInfo from "@/app/components/wallet/WalletInfo";
import MonthChart from "./components/wallet/MonthChart";
import HLine from "./components/HLine";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.email) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const { accounts, transactions } = await fetchData(session.user.email);
    const userName = session.user.name ? session.user.name : "";
    const userImageUrl = session.user.image ? session.user.image : "";
    return (
      <main className="bg-neutral-200 h-screen sm:w-[80%] flex flex-col justify-start sm:justify-center items-center sm:gap-6 lg:gap-8">
        <Suspense>
          <section className="w-full h-3/5 sm:h-2/5 lg:h-2/5 flex flex-col justify-center items-center">
            <WalletInfo
              userName={userName}
              userImageUrl={userImageUrl}
              accounts={accounts}
              transactions={transactions}
            />
            <HLine width={90} color="neutral" />
            <WalletActions transactions={transactions} />
          </section>
        </Suspense>
        <section className="hidden sm:flex flex-col justify-center items-center w-[100%] lg:gap-2">
          <HLine width={100} color="neutral" />
          <HLine width={100} color="neutral" />
        </section>

        <Suspense>
          <MonthChart transactions={transactions} />
        </Suspense>
      </main>
    );
  }
}
