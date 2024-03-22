import Breadcrumbs from "@/app/components/Breadcrumbs";
import SearchBar from "@/app/components/Searchbar";
import { CreateTransaction } from "@/app/components/buttons";
import Filters from "@/app/components/transactions/Filters";
import TransactionTable from "@/app/components/transactions/TransactionTable";
import { lang } from "@/app/lib/const/string-en";
import { fetchData } from "@/app/lib/fetch";
import { auth } from "@/auth";

export default async function TransactionsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const { accounts, transactions } = await fetchData(session.user.email);
    return (
      <main className="mt-20 sm:mt-0 bg-neutral-200 flex flex-col justify-start items-start px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16 overflow-auto flex-1">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Transactions", href: "/transactions", active: true },
          ]}
        />
        <section className="w-full flex flex-row gap-4">
          <SearchBar placeholder={lang.searchTransactionText} />
          <CreateTransaction />
        </section>
        <Filters accounts={accounts} transactions={transactions} />
        <TransactionTable accounts={accounts} transactions={transactions} />
      </main>
    );
  }
}
