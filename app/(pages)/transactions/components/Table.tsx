import { getAccounts, getTransactions } from "@lib/db";
import DataTable from "./DataTable";
import { dict } from "@lib/dictionaries";
import { FilterList, ArrowSeparateVertical } from "iconoir-react";

export function TableSkeleton() {
  const { table: text } = dict;
  return (
    <div className="mt-8 size-full overflow-x-auto">
      <table className="w-full text-sm text-left text-palette-100">
        <thead className="text-sm text-palette-500 font-light uppercase bg-palette-400">
          <tr>
            <th scope="col" className="px-6 py-3 border-r border-palette-400">
              {text.description}
            </th>
            <th scope="col" className="px-6 py-3 border-r border-palette-400">
              <div className="flex justify-between">
                {text.account}
                <FilterList />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 border-r border-palette-400">
              <div className="flex justify-between">
                {text.category}
                <FilterList />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 border-r border-palette-400">
              <div className="flex justify-between">
                {text.amount}
                <ArrowSeparateVertical />
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex justify-between">
                {text.date}
                <ArrowSeparateVertical />
              </div>
            </th>
            <th scope="col" className="pr-2 py-3"></th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export async function Table() {
  const transactions = await getTransactions();
  const accounts = await getAccounts();
  return (
    <div className="mt-8 size-full overflow-auto">
      <table className="w-full text-sm text-left text-palette-100">
        <DataTable transactions={transactions} accounts={accounts} />
      </table>
    </div>
  );
}
