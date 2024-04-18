import Breadcrumbs from "@/app/components/Breadcrumbs";
import { fetchData } from "@/app/lib/fetch";
import { auth } from "@/auth";
import { CATEGORIES } from "@/app/lib/const/categories";
import TransactionForm from "@/app/components/transactions/TransactionForm";
import { getDictionary } from "@/app/lib/dictionaries";

export default async function CreatePage() {
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
            { label: dict.menu.transactions, href: "/transactions" },
            {
              label: dict.actions.create,
              href: "/transactions/create",
              active: true,
            },
          ]}
        />
        <TransactionForm
          accounts={accounts}
          categories={CATEGORIES}
          dict={dict}
        />
      </main>
    );
  }
}
