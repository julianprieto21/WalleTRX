import { getAccounts, getTransactions } from "@lib/db";
import DataTable from "./DataTable";
import { dict } from "@lib/dictionaries";

export function TableSkeleton() {
  const { table: text } = dict;
  return (
    <div className="mt-5 size-full overflow-x-auto">
      <table className="w-full text-sm text-left text-palette-100">
        <thead className="text-sm text-palette-500 font-light uppercase bg-palette-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              {text.description}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.account}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.category}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.amount}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.date}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.option}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export async function Table() {
  const transactions = await getTransactions();
  const accounts = await getAccounts();
  const { table: text } = dict;
  return (
    <div className="mt-5 size-full overflow-auto">
      <table className="w-full text-sm text-left text-palette-100">
        <thead className="sticky top-0 z-10 text-sm text-palette-500 font-light uppercase bg-palette-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {text.description}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.account}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.category}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.amount}
            </th>
            <th scope="col" className="px-6 py-3">
              {text.date}
            </th>
            <th scope="col" className="pr-2 py-3"></th>
          </tr>
        </thead>
        <DataTable transactions={transactions} accounts={accounts} />
      </table>
    </div>
  );
}
