"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance, formatBalanceForChart } from "@lib/utils";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function LineChart({
  transactions,
}: {
  transactions: { timestamp: string; amount: number }[];
}) {
  const formattedData: { year: string; month: string; amount: number }[] = [];
  transactions.map((trx) => {
    const date = new Date(parseInt(trx.timestamp)).toISOString().slice(0, 10);
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

  const datesList = data.map(
    (transaction) =>
      dict.months[parseInt(transaction.month)] + "-" + transaction.year.slice(2)
  );
  const balanceList = data.map((transaction) => transaction.total / 100);
  const state = {
    series: [
      {
        name: dict.balance,
        data: balanceList,
      },
    ],
    options: {
      chart: {
        background: "#2A2927",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as "smooth",
        width: 2,
      },
      xaxis: {
        categories: datesList,
        labels: {
          show: true,
        },
      },
      yaxis: {
        show: true,
        forceNiceScale: true,

        labels: {
          formatter: (val: number) => formatBalance(val),
        },
      },
      theme: {
        mode: "dark" as "dark",
      },
      colors: ["#ffd100"],
      tooltip: {
        y: {
          formatter: (val: number) => formatBalance(val),
        },
      },
    },
  };
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="line"
      width="100%"
      height="100%"
    />
  );
}
