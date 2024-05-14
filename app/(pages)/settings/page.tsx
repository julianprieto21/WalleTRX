import { LogoutBtn } from "@(pages)/login/components/LogoutBtn";
import { auth } from "@auth";
import { Session } from "next-auth";
import ClearHistory from "./components/ClearHistoryBtn";
import DeleteUser from "./components/DeleteUserBtn";
import UserInfo from "./components/UserInfo";

const LineH = () => (
  <div className="w-full h-0 border-t border-palette-250 my-4"></div>
);

export default async function SettingsPage() {
  const { user } = (await auth()) as Session;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <h2 className="font-medium text-palette-200 text-lg mb-2">
        Información de Usuario
      </h2>
      <UserInfo user={user} />
      <LineH />
      <h2 className="font-medium text-palette-200 text-lg mb-2">Sesión</h2>
      <div className="flex flex-col items-start gap-8 w-2/5 p-3 border rounded-md border-palette-200">
        <LogoutBtn />
      </div>

      <LineH />
      <h2 className="font-medium text-palette-200 text-lg mb-2">Danger Zone</h2>
      <div className="flex flex-col items-start gap-8 w-2/5 p-3 border rounded-md border-red-500">
        <ClearHistory />
        <DeleteUser />
      </div>
    </main>
  );
}
