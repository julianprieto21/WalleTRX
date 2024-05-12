import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import MonthlyChart from "./components/MonthlyChart";
import { getChartData } from "@lib/db";
import CategoryChart from "./components/CategoryChart";
import TimeLine from "./components/TimeLine";
import AccountChart from "./components/AccountChart";

export default async function DashboardPage() {
  const { nav: text } = dict;
  const monthlyChartData = await getChartData(0);
  const categoryChartDate = await getChartData(1);
  const timeLineData = await getChartData(2);
  const accountChartData = await getChartData(3);
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.dashboard, href: "/dashboard", active: true },
        ]}
      />
      <section className="size-full flex flex-row gap-10">
        <MonthlyChart data={monthlyChartData} />
        <div className="flex flex-col w-full gap-8">
          <div className="w-full flex flex-row gap-10">
            <CategoryChart data={categoryChartDate} />
            <AccountChart data={accountChartData} />
          </div>
          <TimeLine data={timeLineData} />
        </div>
      </section>
    </main>
  );
}
