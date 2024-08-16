import { Plus } from "iconoir-react";
import Link from "next/link";

export function CreateBtn({ id, text }: { id: string; text: string }) {
  return (
    <Link
      title="Crear transacción"
      href={`/${id}/create`}
      className="rounded-lg relative md:w-[16rem] flex items-center bg-income group"
    >
      <Plus className="block md:hidden size-10 text-palette-100" />
      <p className="text-neutral-50 font-semibold text-left pl-4 group-hover:hidden hidden md:block md:text-sm lg:text-md xl:text-lg">
        {text}
      </p>
      <span className="hidden absolute right-0 h-full w-10 rounded-lg bg-income sm:flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-200">
        <Plus width={40} height={40} className="svg w-8 text-palette-100" />
      </span>
    </Link>
  );
}
