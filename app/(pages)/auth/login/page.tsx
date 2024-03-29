import LoginForm from "@/app/components/login/LoginForm";
import { getDictionary } from "@/app/lib/dictionaries";

export default async function LoginPage() {
  const dict = await getDictionary("es");
  return (
    <section className="bg-neutral-200 sm:w-[80%] h-screen flex flex-col justify-center items-center">
      <LoginForm dict={dict} />
    </section>
  );
}
