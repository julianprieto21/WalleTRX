"use client";
import { CATEGORIES } from "@lib/consts/categories";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import { ApexOptions } from "apexcharts";
import { NavArrowDown } from "iconoir-react";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CategoryChart({ data }: { data: any[] }) {
  const periods: { [key: string]: { offset: number } } = {
    "last-month": { offset: -1 },
    "3-months": { offset: -3 },
    "6-months": { offset: -6 },
    "12-months": { offset: -12 },
    all: { offset: -0 },
  };
  let formattedData;
  const [colors, setColors] = useState<string[]>([]);
  const [series, setSeries] = useState<{ x: string; y: number }[]>([]);
  const [period, setPeriod] = useState<string>("all");

  useEffect(() => {
    const offset = periods[period].offset;
    formattedData = data.slice(offset);
    formattedData = formattedData.filter((item) => item.total != 0);
    setSeries(
      formattedData.map((item) => {
        return {
          x: dict.categories[
            CATEGORIES.find((cat) => item.category == cat.id)?.id!
          ],
          y: Math.abs(item.total),
        };
      })
    );
    setColors(
      formattedData.map(
        (item) => CATEGORIES.find((cat) => item.category == cat.id)?.color!
      )
    );
  }, [data, period]);
  const state = {
    series: [{ data: series }],
    options: {
      colors: colors,
      stroke: {
        width: 0,
      },
      chart: {
        background: "#2A2927",
        toolbar: { show: false },
      },
      tooltip: {
        y: {
          formatter: (val: number) => formatBalance(val / 100),
        },
      },
      plotOptions: {
        treemap: {
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "26px",
        },
      },
      theme: {
        mode: "dark",
      },
    } as ApexOptions,
  };
  return (
    <div className="w-full h-fit bg-palette-300 rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-palette-100 pe-1">
            {dict.charts.category}
          </h5>
        </div>
      </div>

      <ReactApexChart
        options={state.options}
        series={state.series}
        type="treemap"
        height={240}
        width="100%"
      />

      <div className="grid grid-cols-1 items-center border-palette-250 border-t justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            className="text-sm font-medium text-palette-200  hover:text-palette-100 text-center inline-flex items-center "
            type="button"
          >
            {dict.charts.selectors.all}
            <NavArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
}
