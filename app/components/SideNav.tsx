import NavLinks from "./NavLinks";
import { lang } from "@/app/lib/const/string-en";
import { PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from "@/auth";
import HLine from "./HLine";

function LogOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        title="Log Out"
        type="submit"
        className="flex w-full h-[3rem] grow items-center justify-start gap-2 rounded-md text-neutral-800 bg-neutral-100 p-3 text-md font-medium hover:text-red-500 hover:bg-red-100"
      >
        <PowerIcon className="size-6" />
        <h1 className="font-semibold">Logout</h1>
      </button>
    </form>
  );
}

export default async function SideNav() {
  const session = await auth();

  return (
    <div className="w-[20%] flex flex-col items-center text-neutral-800 bg-neutral-600 h-screen py-2">
      <section className="text-4xl font-bold flex flex-row justify-center items-center gap-6 text-neutral-200">
        {session && session.user?.image ? (
          <img
            src={session.user.image}
            alt="Foto de perfil de usuario"
            className="rounded-full size-14"
          ></img>
        ) : (
          <UserIcon className="rounded-full size-14 bg-neutral-100 py-1 text-neutral-800" />
        )}
        <h1>{lang.appNameText.toLocaleUpperCase()}</h1>
      </section>
      <HLine width={90} color="neutral" margin={2} />
      <div className="flex flex-col gap-4 w-[85%] h-[90%]">
        <NavLinks />
        {session ? <LogOutButton /> : null}
      </div>
      <HLine width={90} color="neutral" margin={2} />
      <footer>
        <h1 className="text-sm font-light text-neutral-400">
          {lang.footerText}
        </h1>
      </footer>
    </div>
  );
}
