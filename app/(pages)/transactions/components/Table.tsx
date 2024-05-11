import { getAccounts, getTransactions } from "@lib/db";
import DataTable from "./DataTable";

export function TableSkeleton() {
  return (
    <div className="mt-5 size-full overflow-x-auto">
      <table className="w-full text-sm text-left text-palette-100">
        <thead className="text-sm text-palette-500 font-light uppercase bg-palette-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Descripcion
            </th>
            <th scope="col" className="px-6 py-3">
              Cuenta
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Monto
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Opciones
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

  return (
    <div className="mt-5 size-full overflow-auto">
      <table className="w-full text-sm text-left text-palette-100">
        <thead className="sticky top-0 z-10 text-sm text-palette-500 font-light uppercase bg-palette-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Descripcion
            </th>
            <th scope="col" className="px-6 py-3">
              Cuenta
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Monto
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="pr-2 py-3"></th>
          </tr>
        </thead>
        <DataTable transactions={transactions} accounts={accounts} />
      </table>
    </div>
  );
}
