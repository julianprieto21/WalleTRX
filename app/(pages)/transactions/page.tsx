import { dict } from "@lib/dictionaries";
import Breadcrumbs from "@components/Breadcrumbs";
import Search from "@components/Search";
import { Table, TableSkeleton } from "./components/Table";
import Filters from "./components/Filters";
import { Suspense } from "react";
import { CreateBtn } from "@components/CreateBtn";

export default async function TransactionPage() {
  const { nav: text, buttons } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.transactions, href: "/transactions", active: true },
        ]}
      />
      <div className="flex gap-4 w-full">
        <Search placeholder={buttons.searchTrx} />
        <CreateBtn id="transaction" text={buttons.createTrx} />
      </div>

      <Filters />
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </main>
  );
}
