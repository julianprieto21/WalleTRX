import { getBalance } from "@lib/db";
import { dict } from "@lib/dictionaries";
import { formatBalanceForChart } from "@lib/utils";
import type { User } from "@lib/types";
import { LineChart } from "./LineChart";

// TODO: tratar de deshacerce de este componente.
export async function ChartWidget({ user }: { user: User }) {
  const balaceByDate = (await getBalance({ groupBy: "date", user: user })) as {
    month: string;
    total: string;
  }[];
  const formattedBalaces = formatBalanceForChart(balaceByDate);
  return <LineChart transactions={formattedBalaces} />;
}
