import NavLinks from "./NavLinks";
import { lang } from "@/app/lib/const/string-en";
import { PowerIcon, WalletIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import HLine from "./HLine";
import { LogOut } from "../lib/actions";
import AppLogo from "@/public/app-logo-white.svg";

export function LogOutButton() {
  return (
    <form action={LogOut}>
      <button
        title="Log Out"
        type="submit"
        className="flex h-[3rem] w-full grow items-center justify-start gap-2 text-neutral-400 text-md font-normal hover:bg-neutral-700 hover:text-red-500 sm:flex-none sm:justify-center lg:justify-start p-4 md:p-2 md:px-3"
      >
        <PowerIcon className="size-6" />
        <p className="block sm:hidden lg:block">Logout</p>
      </button>
    </form>
  );
}

export default async function SideNav() {
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.log(error);
  }
  const title = lang.appNameText.split("&");
  return (
    <aside className="hidden sm:flex w-1/5 flex-col items-center justify-center bg-neutral-900 h-screen sm:pb-2 overflow-auto">
      <section className="w-full flex flex-col items-center text-neutral-200 bg-gray-800 sm:py-4 sm:pb-2 lg:py-4 border-b border-gray-700">
        {/* <WalletIcon className="hidden md:size-36 lg:size-42 xl:size-48 antialiased sm:block" /> */}
        <img
          src={AppLogo.src}
          alt="Logo de la aplicación"
          className="xl:size-36 2xl:size-48"
        ></img>
        <h1 className="flex flex-row justify-center font-thin xl:text-4xl 2xl:text-5xl">
          {title[0]}
          <strong className="font-semibold ">{title[1]}</strong>
        </h1>
      </section>
      <div className="hidden sm:flex flex-col w-full h-[90%] justify-around lg:justify-start lg:gap-2 3xl:gap-4 py-4">
        <NavLinks isLogIn={session ? true : false} />
      </div>
      <footer className="w-full hidden sm:flex  flex-col justify-center items-center">
        <HLine width={90} color="neutral" />
        <h1 className="text-xs md:text-sm text-center font-light text-neutral-500 pt-2">
          {lang.footerText}
        </h1>
      </footer>
    </aside>
  );
}
