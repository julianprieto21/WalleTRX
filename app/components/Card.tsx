import { ReactNode } from "react";

export default function Card({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <main className="flex w-full sm:w-5/6 h-64 sm:h-96 lg:w-2/5 bg-neutral-100 rounded-3xl shadow-lg">
      <div className="flex w-full justify-center items-start flex-col mt-4 mx-4 sm:mx-6 mb-4">
        <h1 className="sm:text-2xl font-semibold pb-2 pl-2">{title}</h1>
        {children}
      </div>
    </main>
  );
}
