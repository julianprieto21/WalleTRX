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
        className="flex w-[100%] px-2 justify-center items-center bg-neutral-100 h-14 border border-neutral-200 rounded-lg gap-3 shadow-sm"
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

export default function LoginForm() {
  return (
    <section className="w-50 sm:w-96 bg-neutral-100 rounded-lg flex flex-col justify-center items-center shadow-xl border border-neutral-400">
      <h1 className="font-semibold text-4xl sm:text-6xl text-neutral-700 my-2">LOGIN</h1>
      <HLine
        width={80}
        color="neutral"
        text="Log with Social Accounts"
        margin={2}
      />
      <main className="w-[100%] h-[100%] mb-4 flex flex-row justify-end items-center">
        <LogInButton provider="google" />
        <LogInButton provider="github" />
      </main>
    </section>
  );
}
