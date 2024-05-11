import Breadcrumbs from "@components/Breadcrumbs";
import { getAccount } from "@lib/db";
import { es as dict } from "@lib/dictionaries";
import { Account } from "@lib/types";

type Props = {
  params: {
    aid: string;
  };
};

export default async function AccountPage({ params }: Props) {
  const { aid } = params;
  const account = (await getAccount({ aid: aid })) as Account;
  const { nav } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: nav.home, href: "/" },
          { label: nav.accounts, href: "/accounts" },
          { label: account.name, href: `/accounts/${aid}`, active: true },
        ]}
      />
    </main>
  );
}
