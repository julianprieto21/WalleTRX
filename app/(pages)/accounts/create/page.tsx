import { dict } from "@lib/dictionaries";
import CreateForm from "../components/CreateForm";
import Breadcrumbs from "@components/Breadcrumbs";
import { getAccounts } from "@lib/db";
import { Account } from "@lib/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memphis | " + dict.actions.create + " " + dict.nav.accounts,
};

export default async function AccountCreatePage() {
  // TODO: Hacer check de si ya existe una cuenta con el mismo nombre
  // const accounts = (await getAccounts()) as Account[];
  const { nav: text, actions } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.accounts, href: "/accounts" },
          {
            label: actions.create,
            href: "/accounts/create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
