import {
  Upload,
  Download,
  DataTransferBoth,
  MultiplePagesPlus,
} from "iconoir-react";
import { RadialBarChart } from "@components/wallet/RadialBarChart";
import { getBalanceByType, getBalanceByUser } from "@lib/db";
import { User } from "@lib/types";
import { formatBalance, isPendingInstallments } from "@lib/utils";
import Link from "next/link";
import { dict } from "@lib/dictionaries";

export default async function MainCard({ user }: { user: User }) {
  const { balance: balanceText } = dict;
  const radialBarChartData = await getBalanceByType();
  const generalBalance = await getBalanceByUser();
  const balance = generalBalance.length > 0 ? generalBalance[0].total : 0;
  const pendingInstallments = await isPendingInstallments();
  return (
    <div className="relative size-full">
      <h3 className="text-palette-100 text-3xl 2xl:text-4xl">
        <p className="text-neutral-500 font-bold text-base">{balanceText}:</p>
        {formatBalance(balance / 100)}
      </h3>
      <Link href={"/settings"}>
        <img
          alt=""
          className="absolute right-0 top-0 size-14 2xl:size-11 rounded-full"
          src={user.image_url}
        />
      </Link>

      <div className="h-auto w-60 2xl:w-80 absolute bottom-0 left-1 2xl:left-2">
        <RadialBarChart data={radialBarChartData} />
      </div>

      <div className="absolute bottom-0 right-0 grid grid-cols-2 grid-rows-3 gap-3">
        <Link href={"/transactions/create?t=expense"} className="col-start-2">
          <Upload className="text-expense text-4xl 2xl:text-3xl bg-palette-400 rounded-full hover:bg-expense hover:text-palette-100 transition p-2" />
        </Link>
        <Link
          href={"/transactions/create?t=income"}
          className="col-start-2 row-start-2"
        >
          <Download className="text-income text-4xl 2xl:text-3xl bg-palette-400 rounded-full hover:bg-income hover:text-palette-100 transition p-2" />
        </Link>
        <Link
          href={"/transactions/create?t=transfer"}
          className="col-start-2 row-start-3"
        >
          <DataTransferBoth className="text-transfer text-4xl 2xl:text-3xl rotate-90 bg-palette-400 rounded-full hover:bg-transfer hover:text-palette-100 transition p-2" />
        </Link>
        <Link
          href={"/installments"}
          className="col-start-1 row-start-3 relative"
        >
          <span
            className={`${
              pendingInstallments ? "" : "hidden"
            } rounded-full size-2 bg-palette-500 absolute z-10 right-0.5 top-0.5`}
          ></span>
          <MultiplePagesPlus className="text-blue-600 text-4xl 2xl:text-3xl rotate-90 bg-palette-400 rounded-full hover:bg-blue-600 hover:text-palette-100 transition p-2" />
        </Link>
      </div>
    </div>
  );
}
