import { getChartData } from "@lib/db";
import AccountChart from "./AccountChart";
import CategoryChart from "./CategoryChart";
import MonthlyChart from "./MonthlyChart";
import TimeLine from "./TimeLine";

export default async function Dashboard() {
  const monthlyChartData = await getChartData(0);
  const categoryChartDate = await getChartData(1);
  const timeLineData = await getChartData(2);
  const accountChartData = await getChartData(3);
  return (
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
  );
}
