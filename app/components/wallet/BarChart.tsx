"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import _ from "lodash";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function BarChart({ data }: { data: any[] }) {
  const { transactions: transactionsText, balance } = dict;
  const series = data.map((item) => {
    const color = item.type == "income" ? "#31C48D" : "#F05252";
    return {
      name:
        item.type == "income"
          ? transactionsText.income
          : transactionsText.expense,
      data: [Math.abs(parseInt(item.total))],
      color: color,
    };
  });
  const state = {
    series: series,
    options: {
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "100%",
          borderRadiusApplication: "end" as "end",
          borderRadius: 4,
        },
      },
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
        categories: [`${balance} [month]`],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      theme: {
        mode: "dark" as "dark",
      },
      tooltip: {
        y: {
          formatter: (val: number) => formatBalance(val / 100),
        },
      },
    },
  };
  return (
    <div className="w-full px-2 py-1">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
        height={200}
      />
    </div>
  );
}
