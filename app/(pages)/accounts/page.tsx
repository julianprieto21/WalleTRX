import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import Accounts from "./components/Accounts";
import { getBalanceByAccounts } from "@lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memphis | " + dict.nav.accounts,
};

export default async function AccountsPage() {
  const { nav } = dict;
  const data = await getBalanceByAccounts();
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: nav.home, href: "/" },
          { label: nav.accounts, href: "/accounts", active: true },
        ]}
      />
      <section className="flex flex-col w-full mt-2">
        <Accounts balanceByAccounts={data} />
      </section>
    </main>
  );
}
