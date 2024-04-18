import Breadcrumbs from "@/app/components/Breadcrumbs";
import TransactionForm from "@/app/components/transactions/TransactionForm";
import { CATEGORIES } from "@/app/lib/const/categories";
import { getDictionary } from "@/app/lib/dictionaries";
import { fetchAccountsFromUser, fetchTransactionFromId } from "@/app/lib/fetch";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: Props) {
  const dict = await getDictionary("es");
  const transactionID = params.id;
  const transaction = await fetchTransactionFromId(transactionID);
  const accounts = await fetchAccountsFromUser(transaction.user_id);
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: dict.menu.home, href: "/" },
          { label: dict.menu.transactions, href: "/transactions" },
          {
            label: dict.actions.edit,
            href: `/transactions/${transactionID}edit`,
            active: true,
          },
        ]}
      />
      <TransactionForm
        transaction={transaction}
        accounts={accounts}
        categories={CATEGORIES}
        dict={dict}
      />
    </main>
  );
}
