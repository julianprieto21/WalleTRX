import EditForm from "@transactions/components/EditForm";
import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";
import { Account, Transaction } from "@lib/types";
import { getAccounts, getTransaction } from "@lib/db";
import { Metadata } from "next";

type Props = {
  params: {
    tid: string;
  };
};

export const metadata: Metadata = {
  title: "Memphis | " + dict.actions.edit + " " + dict.nav.transactions,
};

export default async function TransactionEditPage({ params }: Props) {
  const { nav, actions } = dict;
  const { tid } = params;
  const transaction = (await getTransaction({ tid: tid })) as Transaction;
  const accounts = (await getAccounts()) as Account[];
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: nav.home, href: "/" },
          { label: nav.transactions, href: "/transactions" },
          {
            label: actions.edit,
            href: `/transactions/edit/${tid}`,
            active: true,
          },
        ]}
      />
      <EditForm transaction={transaction} accounts={accounts} />
    </main>
  );
}
