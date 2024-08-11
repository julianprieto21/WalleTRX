"use client";
import { dict } from "@lib/dictionaries";
import _ from "lodash";
import dynamic from "next/dynamic";
import { parse } from "path";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function RadialBarChart({ data }: { data: any[] }) {
  const actualMonth = new Date().getMonth() + 1;
  const actualMonthText = dict.months[actualMonth];
  let income = data.filter((item) => item.type === "income")[0]?.total ?? "0";
  let expense = data.filter((item) => item.type === "expense")[0]?.total ?? "0";
  income = Math.abs(parseInt(income));
  expense = Math.abs(parseInt(expense));
  const state = {
    options: {
      legend: {
        show: false,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut: {
            size: "60%",
          },
        },
      },
      chart: {
        offsetX: -15,
        offsetY: 135,
        background: "transparent",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#31C48D", "#F05252"],
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },

      stroke: {
        width: 0,
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  return (
    <div className="w-full">
      <div className="size-[250px] 2xl:h-[300px] 2xl:w-[300px] relative">
        <ReactApexChart
          options={state.options}
          series={[income / 100, expense / 100]}
          type="donut"
          width="100%"
          height="100%"
        />
        <p className="absolute bottom-0 2xl:bottom-6 left-0 w-[222px] 2xl:w-[272px] text-center font-semibold text-3xl text-neutral-500">
          {actualMonthText}
        </p>
      </div>
    </div>
  );
}
