"use client";
import { dict } from "@lib/dictionaries";
import _ from "lodash";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function RadialBarChart({ data }: { data: any[] }) {
  const actualMonth = new Date().getMonth() + 1;
  const actualMonthText = dict.months[actualMonth];
  const amount = data.map((item) => {
    return Math.abs(parseInt(item.total));
  });
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
        offsetY: 115,
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
    <div className="w-full relative">
      <p className="absolute -left-4 bottom-6 w-[300px] text-center font-semibold text-3xl text-neutral-500">
        {actualMonthText}
      </p>
      <ReactApexChart
        options={state.options}
        series={[amount[1] / 100, amount[0] / 100]}
        type="donut"
        width={300}
        height={400}
      />
    </div>
  );
}
