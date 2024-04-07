import LoginForm from "@/app/components/login/LoginForm";
import { getDictionary } from "@/app/lib/dictionaries";

export default async function LoginPage() {
  const dict = await getDictionary("es");
  return (
    <main className="page">
      <div className="grid place-content-center size-full">
        <LoginForm dict={dict} />
      </div>
    </main>
  );
}
