"use client";
import { CATEGORIES } from "@lib/consts/categories";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import { ApexOptions } from "apexcharts";
import { NavArrowDown } from "iconoir-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function AccountChart({ data }: { data: any[] }) {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    setSeries(data.map((item) => parseInt(item.total)));
    setLabels(data.map((item) => item.name));
    setColors(data.map((item) => item.color));
  }, [data]);
  const state = {
    series: series,
    options: {
      colors: colors,
      stroke: {
        colors: ["#2A2927"],
        width: 1,
      },
      chart: {
        background: "#2A2927",
      },
      tooltip: {
        y: {
          formatter: (val: number) => formatBalance(val / 100),
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: labels,
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      theme: {
        mode: "dark",
      },
      xaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
      },
    } as ApexOptions,
  };
  return (
    <div className="max-w-sm w-full h-fit bg-palette-300 rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-palette-100 pe-1">
            {dict.charts.accounts}
          </h5>
        </div>
      </div>

      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        height={327}
        width="100%"
      />

      {/* <div className="grid grid-cols-1 items-center border-palette-250 border-t justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            className="text-sm font-medium text-palette-200  hover:text-palette-100 text-center inline-flex items-center "
            type="button"
          >
            Todo
            <NavArrowDown />
          </button>
        </div>
      </div> */}
    </div>
  );
}
