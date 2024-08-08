import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import Converter from "./components/Converter";
import { CryptoTable, CryptoTableSkeleton } from "./components/CryptoTable";
import { Suspense } from "react";
import InvestmentSwitcher from "./components/InvestmentSwitcher";

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
      {/* <section className="w-full flex flex-row items-end justify-between overflow-auto gap-12">
        <article className="w-full h-full flex flex-col justify-start gap-10">
          <Suspense>
            <InvestmentSwitcher />
          </Suspense>
          <div className="shrink-0 rounded-lg h-80 w-full shadow-md bg-palette-300 px-6 py-5"></div>
          <div className="shrink-0 rounded-lg h-64 w-full shadow-md bg-palette-300 px-6 py-5"></div>
        </article>
        <article className="flex flex-col gap-4 h-full w-[880px] items-center">
          <Converter />
          <div className="flex flex-col gap-4 size-full items-center overflow-auto overflow-x-hidden">
            <Suspense fallback={<CryptoTableSkeleton />}>
              <CryptoTable />
            </Suspense>
          </div>
        </article>
      </section> */}
      <section className="grid grid-cols-5 grid-rows-1 gap-10 mt-6 size-full overflow-auto">
        <div className="col-span-2 flex flex-col justify-start gap-8">
          <Suspense>
            <InvestmentSwitcher />
          </Suspense>
          <div className="shrink-0 grow rounded-lg w-full shadow-md bg-palette-300 px-6 py-5"></div>
          <div className="shrink-0 grow rounded-lg w-full shadow-md bg-palette-300 px-6 py-5"></div>
        </div>
        <div className="col-span-3 col-start-3 flex flex-col justify-start gap-8">
          <Converter />
          <div className="flex flex-col gap-4 size-full items-center overflow-auto overflow-x-hidden">
            <Suspense fallback={<CryptoTableSkeleton />}>
              <CryptoTable />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
