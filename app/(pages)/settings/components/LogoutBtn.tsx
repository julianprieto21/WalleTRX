import { dict } from "@lib/dictionaries";
import { signOut } from "@auth";

export function LogoutBtn() {
  const { logout } = dict.settings.options;
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-sm font-semibold">
        {logout.title}
        <p className="text-xs font-normal text-palette-200">
          {logout.description}
        </p>
      </h2>
      <form
        className="transition rounded-md h-auto w-32 flex flex-row border border-palette-250 hover:border-palette-300 bg-palette-300 text-palette-200 font-medium text-md hover:bg-palette-500 hover:text-palette-300 sm:justify-center lg:justify-start 2xl:h-10"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          title="Cerrar sesión"
          type="submit"
          className="size-full flex justify-center items-center"
        >
          <p className="block sm:hidden lg:block">{logout.title}</p>
        </button>
      </form>
    </div>
  );
}
