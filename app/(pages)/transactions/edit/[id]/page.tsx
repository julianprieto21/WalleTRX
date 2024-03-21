import Breadcrumbs from "@/app/components/Breadcrumbs";
import TransactionForm from "@/app/components/transactions/TransactionForm";
import { CATEGORIES } from "@/app/lib/const/categories";
import {
  fetchTransactionFromId,
  fetchAccountsFromWallet,
} from "@/app/lib/fetch";
import { db } from "@vercel/postgres";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: Props) {
  const transactionID = params.id;
  const client = await db.connect();
  const transaction = await fetchTransactionFromId(client, transactionID);
  const accounts = await fetchAccountsFromWallet(client, transaction.wallet_id);
  return (
    <main className="mt-20 sm:mt-0 bg-neutral-200 flex flex-col justify-start items-start px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16 overflow-auto flex-1">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Transactions", href: "/transactions" },
          {
            label: "Edit",
            href: `/transactions/${transactionID}edit`,
            active: true,
          },
        ]}
      />
      <TransactionForm
        action="edit"
        transaction={transaction}
        accounts={accounts}
        categories={CATEGORIES}
      />
    </main>
  );
}
