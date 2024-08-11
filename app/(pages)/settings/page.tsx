import { LogoutBtn } from "./components/LogoutBtn";
import { auth } from "@auth";
import { Session } from "next-auth";
import ClearHistory from "./components/ClearHistoryBtn";
import DeleteUser from "./components/DeleteUserBtn";
import UserInfo from "./components/UserInfo";
import Breadcrumbs from "@components/Breadcrumbs";
import { dict } from "@lib/dictionaries";

const LineH = () => (
  <div className="w-4/5 h-0 border-t border-palette-300 my-4"></div>
);

export default async function SettingsPage() {
  const { user } = (await auth()) as Session;
  const { nav: text, settings } = dict;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <Breadcrumbs
        breadcrumbs={[
          { label: text.home, href: "/" },
          { label: text.settings, href: "/settings", active: true },
        ]}
      />
      <section className="mt-6 flex flex-col items-center">
        <h2 className="pl-2 font-medium text-palette-200 text-lg mb-2 w-full text-left 2xl:w-3/5">
          {settings.userInfo}
        </h2>
        <div className="flex flex-col items-start gap-2 w-full p-3 border rounded-md border-palette-250 2xl:w-3/5">
          <UserInfo user={user} />
        </div>
        <LineH />
        <h2 className="pl-2 font-medium text-palette-200 text-lg mb-2 w-full text-left 2xl:w-3/5">
          {settings.session}
        </h2>
        <div className="flex flex-col items-start gap-8 w-full p-3 border rounded-md border-palette-250 2xl:w-3/5">
          <LogoutBtn />
        </div>

        <LineH />
        <h2 className="ml-2 font-medium text-palette-200 text-lg mb-2 w-full text-left 2xl:w-3/5">
          {settings.dangerZone}
        </h2>
        <div className="flex flex-col items-start gap-8 w-full p-3 border rounded-md border-red-500 2xl:w-3/5">
          <ClearHistory />
          <DeleteUser />
        </div>
      </section>
    </main>
  );
}
