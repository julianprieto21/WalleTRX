import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-2/5 h-auto bg-neutral-100 rounded-3xl shadow-lg">
      <div className="flex w-full justify-center items-center flex-col m-6">
        {children}
      </div>
    </main>
  );
}
