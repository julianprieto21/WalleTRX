import React, { Suspense } from "react";
import User from "@components/User";
import {
  BalanceWidget,
  BalanceWidgetSkeleton,
} from "@components/wallet/BalanceWidget";
import {
  ExpenseWidget,
  ExpenseWidgetSkeleton,
} from "@components/wallet/ExpenseWidget";
import {
  IncomeWidget,
  IncomeWidgetSkeleton,
} from "@components/wallet/IncomeWidget";
import TransferWidget from "@components/wallet/TranferWidget";
import {
  AccountsWidget,
  AccountsWidgetSkeleton,
} from "@components/wallet/AccountsWidget";
import {
  ChartWidget,
  ChartWidgetSkeleton,
} from "./components/wallet/ChartWidget";
import { getUser } from "@lib/db";

export default async function HomePage() {
  const user = await getUser();
  if (!user) return;
  return (
    <main className="page items-center pb-10 sm:pb-0">
      <section className="sm:border-0 border-b border-palette-250 select-none w-full flex flex-row-reverse sm:flex-row items-center justify-center pt-8 xl:pt-10 2xl:pt-16 pb-4 px-4 sm:px-0">
        <User user={user} />
        <Suspense fallback={<BalanceWidgetSkeleton />}>
          <BalanceWidget user={user} />
        </Suspense>
      </section>
      <section className="w-4/5 flex flex-col items-center justify-center pt-8 xl:pt-6 2xl:pt-8 pb-4 xl:pb-0 2xl:pb-4 gap-6 xl:gap-4 2xl:gap-6 ">
        <div className="w-full flex flex-row justify-center gap-6 sm:gap-6 lg:gap-4">
          <Suspense fallback={<IncomeWidgetSkeleton />}>
            <IncomeWidget user={user} />
          </Suspense>
          <Suspense fallback={<ExpenseWidgetSkeleton />}>
            <ExpenseWidget user={user} />
          </Suspense>
        </div>
        <div className="flex flex-row items-center w-[90%] gap-4">
          <hr className="border-t border-palette-250 w-full"></hr>
          <TransferWidget />
          <hr className="border-t border-palette-250 w-full"></hr>
        </div>
      </section>
      <section className="size-full flex flex-col lg:flex-row items-center lg:justify-evenly xl:py-0 2xl:py-6 gap-10 px-4">
        <Suspense fallback={<AccountsWidgetSkeleton />}>
          <AccountsWidget user={user} />
        </Suspense>
        <Suspense fallback={<ChartWidgetSkeleton />}>
          <ChartWidget user={user} />
        </Suspense>
      </section>
    </main>
  );
}
