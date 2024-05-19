import { getBalance } from "@lib/db";
import { formatBalanceForChart } from "@lib/utils";
import type { User } from "@lib/types";
import { LineChart } from "./LineChart";

// TODO: tratar de deshacerce de este componente.
export async function ChartWidget({ user }: { user: User }) {
  const balaceByDate = (await getBalance({ groupBy: "date", user: user })) as {
    year: string;
    month: string;
    total: string;
  }[];
  const formattedBalaces = formatBalanceForChart(balaceByDate);
  return <LineChart transactions={formattedBalaces} />;
}
