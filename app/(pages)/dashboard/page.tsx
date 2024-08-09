import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import { Suspense } from "react";
import MonthlyChart from "./components/MonthlyChart";
import {
  getBalanceByAccounts,
  getBalanceByCategory,
  getTransactions,
} from "@lib/db";
import AccountChart from "./components/AccountChart";
import CategoryChart from "./components/CategoryChart";
import TimeLine from "./components/TimeLine";

export default async function DashboardPage() {
  const { nav: text } = dict;
  const transactions = await getTransactions();
  const accountsBalance = await getBalanceByAccounts();
  const categoryBalance = await getBalanceByCategory();
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.dashboard, href: "/dashboard", active: true },
        ]}
      />
      <section className="grid grid-cols-7 grid-rows-2 gap-8 size-full mt-6">
        <div className="col-span-2 row-span-2 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <MonthlyChart transactions={transactions} />
        </div>
        <div className="col-span-3 col-start-3 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <CategoryChart categoryData={categoryBalance} />
        </div>
        <div className="col-span-2 col-start-6 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <AccountChart data={accountsBalance} />
        </div>
        <div className="col-span-5 col-start-3 row-start-2 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <TimeLine transactions={transactions} />
        </div>
      </section>
    </main>
  );
}
