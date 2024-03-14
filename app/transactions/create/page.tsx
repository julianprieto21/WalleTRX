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
      <main className="bg-neutral-200 w-full sm:w-[80%] h-full flex flex-col justify-start items-start px-6 py-10 sm:px-16 sm:py-14">
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
