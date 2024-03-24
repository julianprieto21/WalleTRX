"use client";
import { Account } from "@/app/lib/types";
import { formatBalance, formatDate, getBalanceByDay } from "@/app/lib/utils";
import {
  ArrowRightIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  ResponsiveContainer,
  LineChart,
  Tooltip,
  XAxis,
  Line,
  BarChart,
  Bar,
} from "recharts";

interface Props {
  account: {
    account: Account;
    income: number;
    expense: number;
    history: any;
  };
}
export default function AccountItem({ account }: Props) {
  const history = getBalanceByDay(account.history);
  return (
    <main className="flex flex-row items-center gap-4">
      <div
        key={account.account.id}
        className="w-full xl:w-1/2 h-auto xl:size-auto mx-auto xl:mx-0 rounded-xl bg-neutral-50 hover:bg-neutral-300 transition peer"
      >
        <section className="flex flex-row justify-between items-center">
          <span
            className="rounded-full h-24 transition-all w-1 ml-2"
            style={{ backgroundColor: account.account.color }}
          ></span>
          <div className="flex flex-col h-28 w-2/5 justify-start items-center p-3">
            <h1 className="w-full flex flex-row gap-2 items-center font-semibold text-normal xl:text-lg">
              {account.account.name}
            </h1>
            <p className="w-full font-light text-neutral-500 text-md">
              {formatBalance(account.income)}
            </p>
            <p className="w-full font-medium text-neutral-500">
              {account.account.currency}
            </p>
          </div>
          <div className="flex w-3/5 h-28 p-3">
            <ResponsiveContainer>
              <LineChart data={history}>
                <Line
                  type="natural"
                  dataKey="balance"
                  stroke="#8884d8"
                  activeDot={{ r: 6 }}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <ChevronRightIcon className="xl:peer-hover:block hidden size-16 text-neutral-400" />
      <div className="absolute left-[78rem] xl:peer-hover:block hidden w-96 h-52">
        {/* <IncomeExpenseChart /> Añadir grafico de barras? u otro?*/}
      </div>
    </main>
  );
}
