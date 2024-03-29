import { LogOutButton } from "@/app/components/SideNav";
import { getDictionary } from "@/app/lib/dictionaries";

export default async function SettingsPage() {
  const dict = await getDictionary("es");
  return (
    <main className="size-full flex justify-center items-center">
      <LogOutButton text={dict.auth.logout} />
    </main>
  );
}
