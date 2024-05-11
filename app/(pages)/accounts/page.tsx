import Breadcrumbs from "@components/Breadcrumbs";
import { CreateBtn } from "@components/CreateBtn";
import Search from "@components/Search";
import { es as dict } from "@lib/dictionaries";

export default function AccountsPage() {
  const { nav, buttons } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: nav.home, href: "/" },
          { label: nav.accounts, href: "/accounts", active: true },
        ]}
      />
      <div className="flex w-full h-10">
        <CreateBtn id="accounts" text={buttons.createAcc} />
      </div>
    </main>
  );
}
