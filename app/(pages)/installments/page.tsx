import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import InstallmentForm from "./components/InstallmentForm";
import { getAccounts, getInstallments, getTransactions } from "@lib/db";
import { Account } from "@lib/types";
import InstallmentsList from "./components/InstallmentsList";

export default async function TransactionFeePage() {
  const accounts = (await getAccounts()) as Account[];
  const installments = await getInstallments();
  const transactions = await getTransactions();
  const { nav: text } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16 no-scrollbar">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.installments, href: "/installments", active: true },
        ]}
      />
      <section className="grid grid-cols-3 grid-rows-2 gap-10 size-full mt-6">
        <div className="row-span-2 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <InstallmentsList
            installments={installments}
            transactions={transactions}
          />
        </div>
        <div className="col-span-2 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <InstallmentForm accounts={accounts} />
        </div>
        <div className="col-span-2 col-start-2 row-start-2 rounded-lg shadow-md bg-palette-300 px-6 py-5"></div>
      </section>
    </main>
  );
}
