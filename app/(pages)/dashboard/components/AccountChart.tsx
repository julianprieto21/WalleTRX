"use client";
import { dict } from "@lib/dictionaries";
import { formatBalance } from "@lib/utils";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function AccountChart({
  data,
}: {
  data: { name: string; color: string; total: string }[];
}) {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    setSeries(data.map((item) => parseInt(item.total)));
    setLabels(data.map((item) => item.name));
    setColors(data.map((item) => item.color));
  }, []);
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
        enabled: false,
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
    <div className="size-full">
      <h2 className="text-palette-500 text-2xl w-full font-bold">
        {dict.charts.accounts}
      </h2>

      <div className="2xl:h-[250px] mt-6">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
