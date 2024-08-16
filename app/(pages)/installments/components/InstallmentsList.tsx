"use client";

import { addPayment, deleteInstallment } from "@lib/actions";
import { dict } from "@lib/dictionaries";
import { Transaction } from "@lib/types";
import { formatBalance, showToast } from "@lib/utils";
import { EditPencil, Plus, Trash } from "iconoir-react";
import _ from "lodash";

export default function InstallmentsList({
  installments,
  transactions,
}: {
  installments: any[];
  transactions: Transaction[];
}) {
  const { toasts } = dict;
  return (
    <main className="">
      <h1 className="text-palette-500 text-2xl w-full font-bold">
        {dict.activesInstallments}
      </h1>
      <ul className="flex flex-col gap-4 mt-6">
        {installments
          .filter((item) => item.finished == false)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((installment, index) => {
            const { period } = installment;
            const actualDay = new Date().getDate();
            const actualMonth = new Date().getMonth();
            const actualYear = new Date().getFullYear();
            let alreadyPaid = false;

            if (period == "monthly") {
              alreadyPaid = transactions
                .filter(
                  (item) =>
                    new Date(parseInt(item.created_at)).getMonth() ==
                    actualMonth
                )
                .some((transaction) => {
                  return transaction.installment_id == installment.id;
                });
            }
            if (period == "daily") {
              alreadyPaid = transactions
                .filter(
                  (item) =>
                    new Date(parseInt(item.created_at)).getDate() == actualDay
                )
                .some((transaction) => {
                  return transaction.installment_id == installment.id;
                });
            }
            if (period == "yearly") {
              alreadyPaid = transactions
                .filter(
                  (item) =>
                    new Date(parseInt(item.created_at)).getFullYear() ==
                    actualYear
                )
                .some((transaction) => {
                  return transaction.installment_id == installment.id;
                });
            }
            return (
              <li
                key={index}
                className="relative flex flex-row justify-between items-center w-full h-20 border rounded-lg p-2 border-palette-250 hover:bg-palette-400 hover:border-palette-300 transition duration-75"
              >
                <span
                  className={`${
                    alreadyPaid ? "hidden" : ""
                  } rounded-full size-3 bg-palette-500 absolute z-10 -left-1.5 -top-1.5`}
                ></span>
                <div>
                  <h2>
                    {_.capitalize(installment.name)}
                    {" - "}
                    <span>
                      {installment.quantity_paid}/{installment.quantity}
                    </span>
                  </h2>
                  <p>
                    {dict.installmentsOf}{" "}
                    {formatBalance(installment.amount / 100)}
                  </p>
                </div>

                <div className="flex flex-row gap-2 items-center h-full w-24">
                  <button
                    title="Pagar"
                    disabled={alreadyPaid}
                    onClick={async () => {
                      await addPayment(installment);
                      showToast(toasts.success.createTransaction, "success");
                    }}
                    className={`grid place-content-center w-2/3 h-full rounded-md border border-palette-300 bg-palette-400 text-palette-250 ${
                      alreadyPaid
                        ? "hover:border-palette-250 hover:text-palette-250"
                        : "hover:border-green-600 hover:text-green-600"
                    }`}
                  >
                    <Plus className="size-8" />
                    <span className="sr-only">.</span>
                  </button>
                  <div className="flex flex-col gap-1 w-1/3 h-full">
                    <button
                      title="Editar"
                      className="grid place-content-center w-full h-full border rounded-md border-palette-300 bg-palette-400 text-palette-250 hover:border-palette-500 hover:text-palette-500"
                    >
                      <EditPencil className="size-4" />
                      <span className="sr-only">.</span>
                    </button>
                    <button
                      title="Eliminar"
                      onClick={() => deleteInstallment(installment.id)}
                      className="grid place-content-center w-full h-full border rounded-md border-palette-300 bg-palette-400 text-palette-250 hover:border-red-600 hover:text-red-600"
                    >
                      <Trash className="size-4" />
                      <span className="sr-only">.</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
