import { dict } from "@lib/dictionaries";
import { LogOut } from "iconoir-react";
import { signOut } from "@auth";

export function LogoutBtn() {
  const { auth } = dict;
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-sm font-semibold">
        Cerrar Sesión
        <p className="text-xs font-normal text-palette-200">
          Se cerrará la sesión actual. La información es guardada
          automaticamente.
        </p>
      </h2>
      <form
        className="transition rounded-md h-10 w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-palette-200 font-medium text-md hover:bg-palette-500 hover:text-palette-300 sm:justify-center lg:justify-start"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          title="Logout"
          type="submit"
          className="size-full flex justify-center items-center"
        >
          <p className="block sm:hidden lg:block">{auth.logout}</p>
        </button>
      </form>
    </div>
  );
}
