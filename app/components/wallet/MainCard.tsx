import { Upload, Download, DataTransferBoth } from "iconoir-react";
import { BarChart } from "@components/wallet/BarChart";
import { Suspense } from "react";
import { getBalance } from "@lib/db";
import { User } from "@lib/types";
import { formatBalance } from "@lib/utils";
import Link from "next/link";
import { dict } from "@lib/dictionaries";

const ActionLinks = () => {
  return (
    <>
      <Link href={"/transactions/create?t=expense"}>
        <Upload className="text-expense text-4xl 2xl:text-3xl bg-palette-400 rounded-full hover:bg-expense hover:text-palette-100 transition p-2" />
      </Link>
      <Link href={"/transactions/create?t=income"}>
        <Download className="text-income text-4xl 2xl:text-3xl bg-palette-400 rounded-full hover:bg-income hover:text-palette-100 transition p-2" />
      </Link>
      <Link href={"/transactions/create?t=transfer"}>
        <DataTransferBoth className="text-transfer text-4xl 2xl:text-3xl rotate-90 bg-palette-400 rounded-full hover:bg-transfer hover:text-palette-100 transition p-2" />
      </Link>
    </>
  );
};

export default async function MainCard({ user }: { user: User }) {
  const { balance: balanceText } = dict;
  const barChartData =
    (await getBalance({ groupBy: "type", user: user })) ?? [];
  const generalBalance =
    (await getBalance({ groupBy: "user", user: user })) ?? [];
  const balance = generalBalance.length > 0 ? generalBalance[0].total : 0;
  return (
    <div className="shrink-0 rounded-lg h-[85%] 2xl:h-96 w-full 2xl:w-[620px] mt-4 2xl:mt-10 shadow-md bg-palette-300 px-6 py-5 relative">
      <h3 className="text-palette-100 text-3xl 2xl:text-4xl">
        <p className="text-neutral-500 font-bold text-base">{balanceText}:</p>
        {formatBalance(balance / 100)}
      </h3>
      <Link href={"/settings"}>
        <img
          alt=""
          className="absolute right-0 top-2 mr-6 my-5 size-14 2xl:size-11 rounded-full"
          src={user.image_url}
        />
      </Link>

      <div className="h-auto w-60 2xl:w-80 absolute bottom-0 left-1 2xl:left-2">
        <BarChart data={barChartData} />
      </div>

      <div className="absolute bottom-0 right-0 flex flex-col gap-3 pr-6 pb-5">
        <ActionLinks />
      </div>
    </div>
  );
}
