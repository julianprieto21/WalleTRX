import { dict } from "@lib/dictionaries";
import LoginForm from "@login/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memphis | " + dict.auth.login,
};

export default function LoginPage() {
  return (
    <main className="bg-palette-400 text-palette-100 flex flex-col flex-1 overflow-auto size-full">
      <div className="grid place-content-center size-full">
        <LoginForm />
      </div>
    </main>
  );
}
