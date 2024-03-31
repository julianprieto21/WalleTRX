import { LogOutButton } from "@/app/components/buttons";
import { getDictionary } from "@/app/lib/dictionaries";

export default async function SettingsPage() {
  const dict = await getDictionary("es");
  return (
    <main className="bg-palette-400 flex flex-col justify-center items-center px-4 sm:px-12 py-10 sm:pb-10 sm:pt-16 overflow-auto flex-1">
      <LogOutButton text={dict.auth.logout} />
    </main>
  );
}
