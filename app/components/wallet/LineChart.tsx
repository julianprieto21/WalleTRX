"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function LineChart({
  transactions,
}: {
  transactions: { year: string; month: string; total: number }[];
}) {
  const datesList = transactions.map(
    (transaction) =>
      dict.months[parseInt(transaction.month)] + "-" + transaction.year.slice(2)
  );
  const balanceList = transactions.map(
    (transaction) => transaction.total / 100
  );
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
    <div className="w-full px-2 py-1">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        width="100%"
        height={275}
      />
    </div>
  );
}
