import { signIn } from "@auth";
import _ from "lodash";
import GoogleLogo from "./GoogleLogo";
import GithubLogo from "./GithubLogo";
import { dict } from "@lib/dictionaries";
import { redirect } from "next/navigation";

function LogInButton({ provider }: { provider: string }) {
  const logos: Record<string, JSX.Element> = {
    google: <GoogleLogo />,
    github: <GithubLogo />,
  };
  const Logo = logos[provider];
  return (
    <form
      className="flex w-64 justify-center hover:scale-105 mx-2 transition-all"
      action={async () => {
        "use server";
        await signIn(provider);
        redirect("/");
      }}
    >
      <button
        title="Provider logo"
        type="submit"
        className="w-[100%] px-2 bg-palette-100 h-14 rounded-md grid place-content-center"
      >
        {Logo}
      </button>
    </form>
  );
}

export default function LoginForm() {
  const { auth: text } = dict;
  return (
    <section className="w-4/5 p-4 gap-2 sm:w-[600px] rounded-lg flex flex-col justify-center items-center shadow-xl border border-palette-250">
      <h1 className="font-semibold text-4xl sm:text-6xl my-2">{text.login}</h1>
      <div className="inline-flex items-center justify-center w-full relative">
        <hr className="w-96 h-px my-8 bg-palette-250 border-0" />
        <span className="absolute px-3 font-medium text-palette-250 -translate-x-1/2 bg-palette-400 left-1/2">
          {text.secondaryLogin}
        </span>
      </div>
      <main className="w-[80%] h-[100%] my-4 gap-4 flex justify-end items-center">
        <LogInButton provider="google" />
        <LogInButton provider="github" />
      </main>
    </section>
  );
}
