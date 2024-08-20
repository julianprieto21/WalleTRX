"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function formatData(transactions: { timestamp: string; amount: number }[]) {
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
  let balance;
  const transactionDates = grouppedData
    .map((item) => [item.year, item.month])
    .slice(-12);
  const array = transactionDates.map((date) => {
    const transactionsOfDay = grouppedData.filter(
      (transaction) =>
        parseInt(transaction.month) <= parseInt(date[1]) &&
        parseInt(transaction.year) <= parseInt(date[0])
    );
    balance = transactionsOfDay.reduce(
      (acc, transaction) => acc + transaction.total,
      0
    );
    return {
      year: date[0],
      month: date[1],
      total: balance,
    };
  });
  const balanceList = array.map((transaction) => transaction.total / 100);
  const dates = Array.from(
    { length: 12 },
    (_, i) => new Date(new Date().getTime() - i * 30 * 24 * 60 * 60 * 1000)
  );
  const labels = dates.map((date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString();
    return dict.months[month] + "-" + year.slice(2);
  });
  const balanceListFilled = balanceList
    .reverse()
    .concat(Array(12 - balanceList.length).fill(0));

  return [labels.reverse(), balanceListFilled.reverse()];
}

export function LineChart({
  transactions,
}: {
  transactions: { timestamp: string; amount: number }[];
}) {
  const [labels, values] = formatData(transactions);
  const state = {
    series: [
      {
        name: dict.balance,
        data: values as number[],
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
        categories: labels,
        labels: {
          show: true,
        },
      },
      yaxis: {
        show: true,
        forceNiceScale: true,
        min: 0,
        labels: {
          formatter: (val: number) =>
            formatBalance(val, "auto", "ARS", "compact"),
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
    <div className="h-72">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        width="100%"
        height="100%"
      />
    </div>
  );
}
