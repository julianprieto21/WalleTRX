"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance, formatDate } from "@lib/utils";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function Chart({
  transactions,
}: {
  transactions: { date: Date; balance: number }[];
}) {
  const datesList = transactions.map((transaction) =>
    formatDate({ date: transaction.date })
  );
  const balanceList = transactions.map((transaction) => transaction.balance);
  const state = {
    series: [
      {
        name: dict.balance,
        data: balanceList,
      },
    ],
    options: {
      chart: {
        background: "#252422",
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      xaxis: {
        categories: datesList,
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      theme: {
        mode: "dark",
      },
      colors: ["#ffd100"],
      tooltip: {
        y: {
          formatter: (val: number) => formatBalance(val),
        },
      },
    } as ApexOptions,
  };
  return (
    <div className="">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={337}
        width="100%"
      />
    </div>
  );
}
