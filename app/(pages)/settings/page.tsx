import { LogOutButton } from "@/app/components/buttons";
import { getDictionary } from "@/app/lib/dictionaries";

export default async function SettingsPage() {
  const dict = await getDictionary("es");
  return (
    <main className="page">
      <div className="grid place-content-center size-full">
        <LogOutButton text={dict.auth.logout} />
      </div>
    </main>
  );
}
