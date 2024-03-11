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
    return (
      <main className="bg-neutral-200 w-full sm:w-[80%] h-screen flex flex-col justify-start items-center px-4 py-10 sm:px-16 sm:pb-6 sm:pt-10">
        <Suspense>
          <section className="w-full flex flex-col justify-center items-center">
            <WalletInfo
              userName={userName}
              accounts={accounts}
              transactions={transactions}
            />
            <HLine width={100} color="neutral" margin={2} />
            <WalletActions transactions={transactions} />
          </section>
        </Suspense>
        <section className="flex flex-col justify-center items-center w-[100%] gap-1 my-4 sm:my-4 md:my-8">
          <HLine width={100} color="neutral" margin={0} />
          <HLine width={100} color="neutral" margin={0} />
        </section>

        <Suspense>
          <MonthChart transactions={transactions} />
        </Suspense>
      </main>
    );
  }
}
