import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import Converter from "./components/Converter";
import { CryptoTable, CryptoTableSkeleton } from "./components/CryptoTable";
import { Suspense } from "react";

export default function investmentsPage() {
  const { nav: text } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.investments, href: "/investments", active: true },
        ]}
      />
      <section className="w-full flex flex-row items-end justify-between overflow-auto">
        <article className="w-max"></article>
        <article className="flex flex-col gap-4 h-full w-[880px] items-center">
          <Converter />
          <div className="mt-8 flex flex-col gap-4 size-full items-center overflow-auto">
            <Suspense fallback={<CryptoTableSkeleton />}>
              <CryptoTable />
            </Suspense>
          </div>
        </article>
      </section>
    </main>
  );
}
