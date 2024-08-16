import { getTransactions } from "@lib/db";
import { formatBalance } from "@lib/utils";
import _ from "lodash";
import { ArrowUpLeft } from "iconoir-react";
import Link from "next/link";
import { dict } from "@lib/dictionaries";

export default async function Last5transactions() {
  const { charts } = dict;
  const transactions = await getTransactions();
  const last5 = transactions.slice(0, 5);
  return (
    <div className="2xl:flex flex-col size-full relative">
      <Link
        title="Ir a Transacciones"
        href={"/transactions"}
        className="absolute text-palette-250 hover:text-palette-100 transition left-0 top-0"
      >
        <ArrowUpLeft className="size-8 2xl:size-4" />
      </Link>
      <h2 className="text-right w-full text-palette-100 text-xl font-medium">
        {charts.lastFive}
      </h2>
      <ul className="size-full flex flex-col">
        {last5.map((trx) => (
          <li
            key={trx.id}
            className="flex flex-row items-end border-b border-palette-250 justify-between px-2 py-1 h-12 2xl:h-full"
          >
            <p className="text-md font-semibold truncate w-44 2xl:w-full">
              {_.capitalize(trx.description)}
            </p>
            <p>{formatBalance(trx.amount / 100)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
