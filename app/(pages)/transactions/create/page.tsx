import Breadcrumbs from "@/app/components/Breadcrumbs";
import { fetchData } from "@/app/lib/fetch";
import { auth } from "@/auth";
import { CATEGORIES } from "@/app/lib/const/categories";
import TransactionForm from "@/app/components/transactions/TransactionForm";

export default async function CreatePage() {
  const session = await auth();
  if (!session?.user?.email) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const { accounts } = await fetchData(session.user.email);
    return (
      <main className="mt-20 sm:mt-0 bg-neutral-200 flex flex-col justify-start items-start px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16 overflow-auto flex-1">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Transactions", href: "/transactions" },
            { label: "Create", href: "/transactions/create", active: true },
          ]}
        />
        <TransactionForm
          action="create"
          accounts={accounts}
          categories={CATEGORIES}
        />
      </main>
    );
  }
}
