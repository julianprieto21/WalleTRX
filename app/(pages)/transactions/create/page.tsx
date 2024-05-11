import { es as dict } from "@lib/dictionaries";
import CreateForm from "../components/CreateForm";
import Breadcrumbs from "@components/Breadcrumbs";
import { getAccounts } from "@lib/db";
import { Account } from "@lib/types";

export default async function TransactionCreatePage() {
  const accounts = (await getAccounts()) as Account[];
  const { nav: text, actions } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.transactions, href: "/transactions" },
          {
            label: actions.create,
            href: "/transactions/create",
            active: true,
          },
        ]}
      />
      <CreateForm accounts={accounts} />
    </main>
  );
}
