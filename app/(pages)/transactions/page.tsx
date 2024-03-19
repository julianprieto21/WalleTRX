import Breadcrumbs from "@/app/components/Breadcrumbs";
import SearchBar from "@/app/components/Searchbar";
import { CreateTransaction } from "@/app/components/buttons";
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
      <main className="bg-neutral-200 w-full sm:w-[80%] h-full flex flex-col justify-start items-start px-6 py-10 sm:px-12 sm:py-14 lg:px-16 ">
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
        <TransactionTable accounts={accounts} transactions={transactions} />
      </main>
    );
  }
}