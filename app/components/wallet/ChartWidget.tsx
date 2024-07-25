import { getBalanceByDate } from "@lib/db";
import { formatBalanceForChart } from "@lib/utils";
import type { User } from "@lib/types";
import { LineChart } from "./LineChart";

export async function ChartWidget({ user }: { user: User }) {
  const transactions = await getBalanceByDate();

  const formattedData: { year: string; month: string; amount: number }[] = [];
  transactions.map((trx) => {
    const date = new Date(trx.timestamp).toISOString().slice(0, 10);
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    formattedData.push({
      year: year.toString(),
      month: month.toString(),
      amount: trx.amount,
    });
  });
  let grouppedData: { year: string; month: string; total: number }[] = [];
  formattedData.map((old) => {
    const existing = grouppedData.find(
      (reg) => reg.month == old.month && reg.year == old.year
    );
    if (existing) {
      existing.total += old.amount;
    } else {
      grouppedData.push({
        year: old.year,
        month: old.month,
        total: old.amount,
      });
    }
  });

  const data = formatBalanceForChart(grouppedData ?? []);
  return <LineChart transactions={data} />;
}
