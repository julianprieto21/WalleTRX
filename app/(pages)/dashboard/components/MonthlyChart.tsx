"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import { ApexOptions } from "apexcharts";
import { NavArrowDown } from "iconoir-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyChart({ data }: { data: any[] }) {
  const periods: { [key: string]: { offset: number } } = {
    "3-months": { offset: -3 },
    "6-months": { offset: -6 },
    "12-months": { offset: -12 },
    all: { offset: -0 },
  };
  const {
    transactions: transactionText,
    balance: balanceText,
    months,
    charts,
  } = dict;

  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [Yaxis, setYaxis] = useState<string[]>([]);
  const [XaxisIncome, setXaxisIncome] = useState<number[]>([]);
  const [XaxisExpense, setXaxisExpense] = useState<number[]>([]);
  const [period, setPeriod] = useState<string>("all");

  useEffect(() => {
    const offset = periods[period].offset;
    const formattedData = data.slice(offset);
    setIncome(
      formattedData.reduce((acc, cur) => acc + parseInt(cur.income), 0)
    );
    setExpense(
      formattedData.reduce((acc, cur) => acc + parseInt(cur.expense), 0)
    );
    setYaxis(formattedData.map((item) => months[item.month]));
    setXaxisIncome(
      formattedData.map((item) => Math.abs(parseInt(item.income) / 100))
    );
    setXaxisExpense(
      formattedData.map((item) => Math.abs(parseInt(item.expense) / 100))
    );
    setBalance(
      formattedData.reduce((acc, cur) => acc + parseInt(cur.income), 0) +
        formattedData.reduce((acc, cur) => acc + parseInt(cur.expense), 0)
    );
  }, [data, period]);

  const state = {
    series: [
      {
        name: transactionText.income,
        color: "#31C48D",
        data: XaxisIncome,
      },
      {
        name: transactionText.expense,
        color: "#F05252",
        data: XaxisExpense,
      },
    ] as ApexAxisChartSeries,
    options: {
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      chart: {
        background: "#2A2927",
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      xaxis: {
        categories: Yaxis,
        labels: {
          show: false,
          style: {
            fontFamily: "Inter, sans-serif",
            cssclassName:
              "text-xs font-normal fill-gray-500 dark:fill-gray-400",
            formatter: function (val: number) {
              return "$" + val;
            },
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssclassName:
              "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
      },
      theme: {
        mode: "dark",
      },
      colors: ["#ffd100"],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => formatBalance(val),
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      fill: {
        opacity: 1,
      },
    } as ApexOptions,
  };

  return (
    <div className="max-w-sm w-full bg-palette-300 rounded-lg shadow p-4 md:p-6 h-fit">
      <div className="flex justify-between border-palette-250 border-b pb-3">
        <dl>
          <dt className="text-base font-normal text-palette-200 pb-1">
            {balanceText}
          </dt>
          <dd className="leading-none text-3xl font-bold text-palette-100">
            {formatBalance(balance / 100)}
          </dd>
        </dl>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-palette-200 pb-1">
            {transactionText.income}
          </dt>
          <dd className="leading-none text-xl font-bold text-green-400 ">
            {formatBalance(income / 100)}
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-palette-200 pb-1">
            {transactionText.expense}
          </dt>
          <dd className="leading-none text-xl font-bold text-red-500">
            {formatBalance(expense / 100)}
          </dd>
        </dl>
      </div>

      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={510}
        width="100%"
      />

      <div className="grid grid-cols-1 items-center border-palette-250 border-t justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            className="text-sm font-medium text-palette-200  hover:text-palette-100 text-center inline-flex items-center "
            type="button"
          >
            {charts.selectors.all}
            <NavArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
}
