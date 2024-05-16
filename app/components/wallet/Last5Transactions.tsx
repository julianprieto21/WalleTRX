import { getTransactions } from "@lib/db";
import { formatBalance } from "@lib/utils";
import _ from "lodash";

export default async function Last5transactions() {
  const transactions = await getTransactions();
  const last5 = transactions.slice(0, 5);
  return (
    <div className="flex flex-col rounded-lg h-96 w-full mt-10 shadow-md bg-palette-300 px-6 py-5">
      <h2 className="w-full text-right text-palette-100 text-xl font-medium">
        Últimas 5 transacciones
      </h2>
      <ul className="size-full flex flex-col">
        {last5.map((trx) => (
          <li
            key={trx.id}
            className="flex flex-row items-end border-b border-palette-250 justify-between px-2 py-1 h-full"
          >
            <p className="text-md font-semibold ">
              {_.capitalize(trx.description)}
            </p>
            <p>{formatBalance(trx.amount / 100)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
