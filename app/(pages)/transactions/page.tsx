import { dict } from "@lib/dictionaries";
import Breadcrumbs from "@components/Breadcrumbs";
import Search from "@components/Search";
import { Table, TableSkeleton } from "./components/Table";
import { Suspense } from "react";
import { CreateBtn } from "@components/CreateBtn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memphis | " + dict.nav.transactions,
};

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
        <Suspense>
          <Search placeholder={buttons.searchTrx} />
        </Suspense>
        <CreateBtn id="transactions" text={buttons.createTrx} />
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </main>
  );
}
