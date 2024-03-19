import { ReactNode } from "react";

export default function Card({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <main className="flex w-5/6 lg:w-2/5 h-auto bg-neutral-100 rounded-3xl shadow-lg">
      <div className="flex w-full justify-center items-center flex-col mt-4 mx-6 mb-4">
        <h1 className="sm:text-2xl font-semibold pb-2">{title}</h1>
        {children}
      </div>
    </main>
  );
}
