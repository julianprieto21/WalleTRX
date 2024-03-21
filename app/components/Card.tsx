import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  style: string;
}

export default function Card({ children, title, style }: Props) {
  return (
    <main className={`${style} flex bg-neutral-100 rounded-3xl shadow-lg`}>
      <div className="flex w-full justify-center items-start flex-col my-4 mx-4 sm:mx-6">
        <h1 className="xl:text-lg 2xl:text-2xl font-semibold pb-2 pl-2">{title}</h1>
        {children}
      </div>
    </main>
  );
}
