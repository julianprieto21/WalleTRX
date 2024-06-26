import Breadcrumbs from "@components/Breadcrumbs";
import { CreateBtn } from "@components/CreateBtn";
import { dict } from "@lib/dictionaries";
import { Suspense } from "react";
import Accounts from "./components/Accounts";

export default function AccountsPage() {
  const { nav } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: nav.home, href: "/" },
          { label: nav.accounts, href: "/accounts", active: true },
        ]}
      />
      <section className="flex flex-col w-full mt-2">
        <Suspense>
          <Accounts />
        </Suspense>
      </section>
    </main>
  );
}
