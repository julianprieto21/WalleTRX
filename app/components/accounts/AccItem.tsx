"use client";
import { Account } from "@/app/lib/types";
import { formatBalance, getBalanceByDay } from "@/app/lib/utils";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import Link from "next/link";

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
  const initialBalance = history[0].balance;
  const lastBalance = history[history.length - 1].balance;
  const balanceChangePercentage =
    ((lastBalance - initialBalance) / initialBalance) * 100;
  const balanceSign = balanceChangePercentage > 0 ? "+" : "-"; //<StatUp /> : <StatDown />;
  return (
    <main className="flex flex-row items-center gap-4">
      <Link
        href={`/accounts/${account.account.id}`}
        key={account.account.id}
        className="w-full xl:w-1/2 h-auto xl:size-auto mx-auto xl:mx-0 rounded-xl bg-palette-300 peer cursor-pointer"
      >
        <section className="flex flex-row justify-between items-center pl-2">
          <div className="flex flex-col h-32 w-2/5 justify-start items-center p-3 gap-1">
            <h1 className="w-full flex flex-row gap-2 items-center font-semibold text-normal xl:text-lg text-palette-100">
              {account.account.name}
            </h1>
            <p className="w-full flex flex-row justify-start items-end gap-1 font-normal text-palette-200 text-md">
              {formatBalance(account.income + account.expense)}
              <strong className="font-medium text-palette-500 text-sm">
                {account.account.currency}
              </strong>
            </p>
            <p
              className={`flex flex-row justify-start gap-1 w-full text-sm ${
                balanceChangePercentage > 0 ? "text-income" : "text-expense"
              }`}
            >
              {balanceSign}%{" "}
              {balanceChangePercentage.toPrecision(4).replace("-", "")}
            </p>
          </div>
          <div className="flex w-3/5 h-28 p-3">
            <ResponsiveContainer>
              <LineChart data={history}>
                <Line
                  className="text-palette-500"
                  type="natural"
                  dataKey="balance"
                  stroke="currentColor"
                  activeDot={{ r: 6 }}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </Link>
      <span
        className="absolute rounded-full h-0 transition-all w-1 ml-2 peer-hover:h-24 delay-75"
        style={{ backgroundColor: account.account.color }}
      ></span>
      {/* <FastArrowRight
        strokeWidth={1}
        className="xl:peer-hover:size-14 block size-0 transition-all text-neutral-700 delay-100"
      /> */}
    </main>
  );
}
