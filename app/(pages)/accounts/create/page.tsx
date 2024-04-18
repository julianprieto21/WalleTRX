import Breadcrumbs from "@/app/components/Breadcrumbs";
import { auth } from "@/auth";
import { getDictionary } from "@/app/lib/dictionaries";
import AccountForm from "@/app/components/accounts/AccountForm";

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
    return (
      <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
        <Breadcrumbs
          breadcrumbs={[
            { label: dict.menu.home, href: "/" },
            { label: dict.menu.accounts, href: "/accounts" },
            {
              label: dict.actions.create,
              href: "/accounts/create",
              active: true,
            },
          ]}
        />
        <AccountForm dict={dict} />
      </main>
    );
  }
}
