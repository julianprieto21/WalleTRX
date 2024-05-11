import { getBalance } from "@lib/db";
import { dict } from "@lib/dictionaries";
import { formatBalanceForChart } from "@lib/utils";
import type { User } from "@lib/types";
import { Chart } from "./Chart";

export function ChartWidgetSkeleton() {
  const { monthChart: text } = dict.cards;
  return (
    <div className="flex size-96 flex-col">
      <p className="text-2xl font-semibold pl-1">{text}</p>
      <Chart transactions={[]} />
    </div>
  );
}

export async function ChartWidget({ user }: { user: User }) {
  const balaceByDate = (await getBalance({ groupBy: "date", user: user })) as {
    created_at: Date;
    total: number;
  }[];
  const { monthChart: text } = dict.cards;
  const formattedBalaces = formatBalanceForChart(balaceByDate);
  return (
    <div className="flex size-96 flex-col">
      <p className="text-2xl font-semibold pl-1">{text}</p>
      <Chart transactions={formattedBalaces} />
    </div>
  );
}
