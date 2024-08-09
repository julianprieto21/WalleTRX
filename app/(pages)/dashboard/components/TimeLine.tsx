"use client";
import { dict } from "@lib/dictionaries";
import { Transaction } from "@lib/types";
import { formatBalance, formatDate, getDate } from "@lib/utils";
import { ApexOptions } from "apexcharts";
import { NavArrowDown } from "iconoir-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function formatData(transactions: Transaction[]) {
  const data: {
    date: Date;
    income: number;
    expense: number;
  }[] = [];
  transactions.map((trx) => {
    const date = getDate(trx.created_at);
    if (trx.category == "transfer") return;
    if (trx.type == "income") {
      data.push({
        date: date,
        income: trx.amount,
        expense: 0,
      });
    } else {
      data.push({
        date: date,
        income: 0,
        expense: trx.amount,
      });
    }
  });
  const groupedData: {
    date: Date;
    income: number;
    expense: number;
  }[] = [];
  data.map((old) => {
    const existing = groupedData.find(
      (reg) => reg.date.getTime() == old.date.getTime()
    );
    if (existing) {
      existing.income += old.income;
      existing.expense += old.expense;
    } else {
      groupedData.push({
        date: old.date,
        income: old.income,
        expense: old.expense,
      });
    }
  });
  const maxDate = new Date().getTime(); //Math.max(...data.map((item) => item.date.getTime()));
  const minDate = Math.min(...data.map((item) => item.date.getTime()));
  const dates = Array.from(
    { length: (maxDate - minDate) / 86400000 + 1 },
    (_, i) => new Date(minDate + i * 86400000)
  );
  const formattedData = dates.map((date) => {
    const income = data
      .filter((item) => item.date.getTime() == date.getTime())
      .reduce((acc, item) => acc + Math.abs(item.income), 0);
    const expense = data
      .filter((item) => item.date.toISOString() == date.toISOString())
      .reduce((acc, item) => acc + Math.abs(item.expense), 0);
    return {
      date: date,
      income: income,
      expense: expense,
    };
  });
  return formattedData;
}

export default function TimeLine({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const periods: { [key: string]: { offset: number } } = {
    "last-week": { offset: -7 },
    "last-month": { offset: -30 },
    "3-months": { offset: -90 },
    "6-months": { offset: -180 },
    "12-months": { offset: -365 },
    all: { offset: 0 },
  };

  const [data, setData] = useState<
    { date: Date; income: number; expense: number }[]
  >(formatData(transactions));
  const [usedData, setUsedData] =
    useState<{ date: Date; income: number; expense: number }[]>(data);
  const [incomeSeries, setIncomeSeries] = useState<number[]>([]);
  const [expenseSeries, setExpenseSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [period, setPeriod] = useState<string>("last-week");
  const { charts } = dict;

  useEffect(() => {
    const offset = periods[period].offset;
    setUsedData(data.slice(offset));
  }, [period]);

  useEffect(() => {
    const incomeSeries = usedData.map((item) => Math.abs(item.income));
    setIncomeSeries(incomeSeries);
    const expenseSeries = usedData.map((item) => Math.abs(item.expense));
    setExpenseSeries(expenseSeries);
    setLabels(
      usedData.map((item) => formatDate(item.date, { locale: "es-AR" }))
    );
  }, [usedData]);

  const state = {
    series: [
      {
        name: "Ingresos",
        data: incomeSeries,
        color: "#31C48D",
      },
      {
        name: "Gastos",
        data: expenseSeries,
        color: "#F05252",
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
        background: "#2A2927",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        show: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        curve: "straight",
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
      xaxis: {
        categories: labels,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: (val: number) => formatBalance(val / 100),
        },
      },
      theme: {
        mode: "dark",
      },
    } as ApexOptions,
  };
  return (
    <div className="size-full">
      <div className="2xl:h-[250px]">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height="100%"
          width="100%"
        />
      </div>

      <div className="grid grid-cols-1 items-center border-palette-250 border-t justify-between">
        <div className="flex justify-between items-center pt-5">
          <select
            title="Dropdown"
            id="dropdownDefault"
            className="text-sm font-medium bg-palette-300 text-palette-200 hover:text-palette-100 text-center inline-flex items-center"
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option defaultChecked value="last-week">
              {charts.selectors.last7Days}
            </option>
            <option value="last-month">{charts.selectors.lastMonth}</option>
            <option value="3-months">{charts.selectors.last3Months}</option>
            <option value="6-months">{charts.selectors.last6Months}</option>
            <option value="12-months">{charts.selectors.lastYear}</option>
            <option value="all">{charts.selectors.all}</option>
          </select>
          <h2 className="text-palette-500 text-2xl font-bold">
            {charts.timeline}
          </h2>
        </div>
      </div>
    </div>
  );
}
