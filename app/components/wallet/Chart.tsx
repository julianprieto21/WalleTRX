"use client";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { formatDate, formatBalance } from "../../../_app/lib/utils";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any;
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-palette-400 p-2 rounded-md shadow-lg">
        <strong className="label text-palette-100">
          {formatDate({ dateStr: label })}
        </strong>
        <p className="desc text-palette-100">
          {formatBalance(payload[0].value, "auto")}
        </p>
      </div>
    );
  }

  return null;
};

export default function Chart({
  transactions,
}: {
  transactions: { date: Date; balance: number }[];
}) {
  return (
    <ResponsiveContainer className="mt-2">
      <LineChart
        data={transactions}
        margin={{
          top: 0,
          right: 5,
          left: 5,
          bottom: 0,
        }}
      >
        <Tooltip
          content={<CustomTooltip active={true} payload={0} label="" />}
        />
        <XAxis dataKey="date" />
        <Line
          className="text-palette-500"
          type="monotone"
          dataKey="balance"
          stroke="currentColor"
          activeDot={{ r: 6 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
