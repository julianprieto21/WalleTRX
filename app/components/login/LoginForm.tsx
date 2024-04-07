import { signIn } from "@/auth";
import _ from "lodash";
import GoogleLogo from "@/public/google-logo.svg";
import GithubLogo from "@/public/github-logo.svg";
import HLine from "../HLine";

function LogInButton({ provider }: { provider: string }) {
  return (
    <form
      className="flex w-full justify-center hover:scale-105 mx-2"
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button
        type="submit"
        className="flex w-[100%] px-2 justify-center items-center text-palette-400 bg-neutral-100 h-14 border border-neutral-200 rounded-lg gap-3 shadow-sm"
      >
        {
          <img
            src={provider === "google" ? GoogleLogo.src : GithubLogo.src}
            alt={`Logo de ${provider}`}
            width={140}
            height={140}
            className="size-8"
          ></img>
        }
        <h1 className="text-md">{_.capitalize(provider)}</h1>
      </button>
    </form>
  );
}

export default function LoginForm({ dict }: { dict: any }) {
  return (
    <section className="w-4/5 p-4 gap-2 sm:w-[600px] rounded-lg flex flex-col justify-center items-center shadow-xl border border-palette-250">
      <h1 className="font-semibold text-4xl sm:text-6xl my-2">
        {dict.auth.login}
      </h1>
      <HLine text={dict.auth.secondaryLogin} />
      <main className="w-[80%] h-[100%] my-4 gap-4 flex flex-col justify-end items-center">
        <LogInButton provider="google" />
        {/* <LogInButton provider="github" /> */}
      </main>
    </section>
  );
}
