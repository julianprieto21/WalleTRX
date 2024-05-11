import EditForm from "@transactions/components/EditForm";
import Breadcrumbs from "@components/Breadcrumbs";
import { es as dict } from "@lib/dictionaries";
import { Transaction } from "@lib/types";
import { getTransaction } from "@lib/db";

type Props = {
  params: {
    tid: string;
  };
};

export default async function TransactionEditPage({ params }: Props) {
  const { nav, actions } = dict;
  const { tid } = params;
  const transaction = (await getTransaction({ tid: tid })) as Transaction;
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
      <EditForm transaction={transaction} />
    </main>
  );
}
