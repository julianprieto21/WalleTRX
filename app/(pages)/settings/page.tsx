import { LogoutBtn } from "@(pages)/login/components/LogoutBtn";
import { auth } from "@auth";
import { Session } from "next-auth";

const LineH = () => (
  <div className="w-full h-0 border-t border-palette-250 my-2"></div>
);

export default async function SettingsPage() {
  const { user } = (await auth()) as Session;
  return (
    <main className="page px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16">
      <h2 className="font-medium text-palette-200 text-lg mb-2">
        Información de Usuario
      </h2>
      <img
        src={user?.image ?? ""}
        alt="usuario"
        className="ml-4 mb-1 size-12 rounded-full"
      />
      <ul className="ml-2 text-palette-100 text-sm">
        <li>Nombre: {user?.name}</li>
        <li>Email: {user?.email}</li>
      </ul>
      <LineH />
      <LogoutBtn />
    </main>
  );
}
