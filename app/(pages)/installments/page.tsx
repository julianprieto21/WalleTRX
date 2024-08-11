import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import InstallmentForm from "./components/InstallmentForm";
import { getAccounts, getInstallments, getTransactions } from "@lib/db";
import { Account } from "@lib/types";
import InstallmentsList from "./components/InstallmentsList";
// import SeriesChart from "./components/SeriesChart";

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
      <section className="flex flex-col gap-8 2xl:grid 2xl:grid-cols-3 2xl:grid-rows-2 2xl:gap-10 2xl:size-full mt-6">
        <div className="row-span-2 rounded-lg shadow-md bg-palette-300 px-4 py-5 2xl:px-6">
          <InstallmentsList
            installments={installments}
            transactions={transactions}
          />
        </div>
        <div className="col-span-2 rounded-lg shadow-md bg-palette-300 px-4 py-5 2xl:px-6">
          <InstallmentForm accounts={accounts} />
        </div>
        {/* <div className="col-span-2 col-start-2 row-start-2 rounded-lg shadow-md bg-palette-300 px-6 py-5">
          <SeriesChart installments={installments} />
        </div> */}
      </section>
    </main>
  );
}
