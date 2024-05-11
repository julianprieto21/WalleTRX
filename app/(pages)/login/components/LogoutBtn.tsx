import { dict } from "@lib/dictionaries";
import { LogOut } from "iconoir-react";
import { signOut } from "@auth";

export function LogoutBtn() {
  const { auth } = dict;
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        title="Log out"
        type="submit"
        className="transition rounded-md flex h-[3rem] w-full grow items-center justify-start gap-2 text-palette-200 text-md font-normal hover:bg-palette-300 hover:text-expense sm:flex-none sm:justify-center lg:justify-start p-4 md:p-2 md:px-3"
      >
        <LogOut className="size-6" />
        <p className="block sm:hidden lg:block">{auth.logout}</p>
      </button>
    </form>
  );
}
