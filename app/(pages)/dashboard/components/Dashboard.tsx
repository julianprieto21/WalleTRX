import {
  getBalanceByAccounts,
  getBalanceByCategory,
  getTransactions,
} from "@lib/db";
import AccountChart from "./AccountChart";
import CategoryChart from "./CategoryChart";
import MonthlyChart from "./MonthlyChart";
import TimeLine from "./TimeLine";
import Loader from "@components/Loader";

export function DashboardSkeleton() {
  return (
    <section className="size-full flex flex-row gap-10">
      <div className="h-full grid place-content-center w-[524px] bg-palette-300 rounded-lg shadow p-4 md:p-6">
        <Loader />
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="w-full h-[377px] flex flex-row gap-10">
          <div className="w-full grid place-content-center h-full bg-palette-300 rounded-lg shadow p-4 md:p-6">
            <Loader />
          </div>
          <div className="max-w-sm grid place-content-center w-full h-full bg-palette-300 rounded-lg shadow p-4 md:p-6">
            <Loader />
          </div>
        </div>
        <div className="w-full grid place-content-center h-[350px] bg-palette-300 rounded-lg shadow p-4 md:p-6">
          <Loader />
        </div>
      </div>
    </section>
  );
}

export async function Dashboard() {
  const transactions = await getTransactions();
  const accountsBalance = await getBalanceByAccounts();
  const categoryBalance = await getBalanceByCategory();
  return (
    <section className="size-full flex flex-row gap-10">
      <MonthlyChart transactions={transactions} />
      <div className="flex flex-col w-full gap-8">
        <div className="w-full flex flex-row gap-10">
          <CategoryChart categoryData={categoryBalance} />
          <AccountChart data={accountsBalance} />
        </div>
        <TimeLine transactions={transactions} />
      </div>
    </section>
  );
}
{
}
