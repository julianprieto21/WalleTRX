import Breadcrumbs from "@/app/components/Breadcrumbs";
import AccountItem from "@/app/components/accounts/AccItem";
import { CreateAccount } from "@/app/components/buttons";
import { getDictionary } from "@/app/lib/dictionaries";
import { fetchData } from "@/app/lib/fetch";
import { groupByAccount } from "@/app/lib/utils";
import { auth } from "@/auth";

export default async function AccountsPage() {
  const session = await auth();
  const dict = await getDictionary("es");
  if (!session?.user?.email || !session?.user?.name) {
    return new Error("No se pudo recuperar los datos de sesion");
  } else {
    const { accounts, transactions } = await fetchData({mail: session.user.email, name: session.user.name});
    const balanceByAccounts = groupByAccount(accounts, transactions);
    return (
      <main className="bg-palette-400 flex flex-col justify-start items-start px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16 overflow-auto flex-1">
        <Breadcrumbs
          breadcrumbs={[
            { label: dict.menu.home, href: "/" },
            { label: dict.menu.accounts, href: "/accounts", active: true },
          ]}
        />
        <CreateAccount text={dict.buttons.createAcc} />
        <section className="flex w-full flex-col justify-center xl:justify-start gap-4 mt-6">
          {balanceByAccounts.map((acc, index) => (
            <AccountItem key={index} account={acc} />
          ))}
        </section>
      </main>
    );
  }
}
