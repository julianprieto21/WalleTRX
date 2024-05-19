import Link from "next/link";
import { WindowXmark } from "iconoir-react";
import { dict } from "@lib/dictionaries";

export default function NotFound() {
  const { notFound: text } = dict.nav;
  return (
    <main className="pt-12 pb-6 px-10 grid place-content-center bg-palette-400 text-palette-100 size-full">
      <h2 className="flex flex-row items-center gap-8 text-7xl text-center font-semibold text-palette-500">
        <WindowXmark />
        404: {text.title}
      </h2>
      <Link
        href="/"
        className="text-2xl text-center text-palette-250 hover:text-palette-100 hover:underline transition"
      >
        {text.action}
      </Link>
    </main>
  );
}
