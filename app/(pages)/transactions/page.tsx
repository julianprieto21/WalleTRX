import Breadcrumbs from "@/app/components/Breadcrumbs";
import SearchBar from "@/app/components/Searchbar";
import { CreateTransaction } from "@/app/components/buttons";
import Filters from "@/app/components/transactions/Filters";
import TransactionTable from "@/app/components/transactions/TransactionTable";
import { getDictionary } from "@/app/lib/dictionaries";
import { fetchData } from "@/app/lib/fetch";
import { auth } from "@/auth";

export default async function TransactionsPage() {
  const session = await auth();
  const dict = await getDictionary("es");
  if (!session?.user?.id || !session?.user?.name || !session?.user?.email) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    };
    const { accounts, transactions } = await fetchData(user);
    return (
      <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
        <Breadcrumbs
          breadcrumbs={[
            { label: dict.menu.home, href: "/" },
            {
              label: dict.menu.transactions,
              href: "/transactions",
              active: true,
            },
          ]}
        />
        <section className="w-full flex flex-row gap-4">
          <SearchBar placeholder={dict.buttons.searchTrx} />
          <CreateTransaction text={dict.buttons.createTrx} />
        </section>
        <Filters accounts={accounts} transactions={transactions} dict={dict} />
        <TransactionTable accounts={accounts} transactions={transactions} />
      </main>
    );
  }
}
