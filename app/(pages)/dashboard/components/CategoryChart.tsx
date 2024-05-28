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

export default function CategoryChart({
  categoryData,
}: {
  categoryData: { category: string; total: number }[];
}) {
  const periods: { [key: string]: { offset: number } } = {
    "last-month": { offset: -1 },
    "3-months": { offset: -3 },
    "6-months": { offset: -6 },
    "12-months": { offset: -12 },
    all: { offset: -0 },
  };
  const { charts } = dict;

  const [data, setData] =
    useState<{ category: string; total: number }[]>(categoryData);
  const [usedData, setUsedData] =
    useState<{ category: string; total: number }[]>(data);
  const [colors, setColors] = useState<string[]>([]);
  const [series, setSeries] = useState<{ x: string; y: number }[]>([]);
  const [period, setPeriod] = useState<string>("all");

  useEffect(() => {
    const offset = periods[period].offset;
    setUsedData(data.slice(offset));
  }, [period]);

  useEffect(() => {
    setSeries(
      usedData
        .filter((item) => item.total != 0)
        .map((item) => {
          return {
            x: dict.categories[
              CATEGORIES.find((cat) => item.category == cat.id)?.id!
            ],
            y: Math.abs(item.total),
          };
        })
    );
    setColors(
      usedData.map(
        (item) => CATEGORIES.find((cat) => item.category == cat.id)?.color!
      )
    );
  }, [usedData]);
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
            {charts.category}
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
          <select
            title="Dropdown"
            id="dropdownDefault"
            className="text-sm font-medium bg-palette-300 text-palette-200 hover:text-palette-100 text-center inline-flex items-center"
            onChange={(e) => setPeriod(e.target.value)}
          >
            {/* <option value="last-month">{charts.selectors.lastMonth}</option>
            <option value="3-months">{charts.selectors.last3Months}</option>
            <option value="6-months">{charts.selectors.last6Months}</option>
            <option value="12-months">{charts.selectors.lastYear}</option> */}
            <option defaultChecked value="all">
              {charts.selectors.all}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
