"use client";
import { dict } from "@lib/dictionaries";
import { Xmark, Check } from "iconoir-react";
import Link from "next/link";

const { buttons } = dict;

export function SubmitBtn() {
  return (
    <button
      title="Confirmar"
      type="submit"
      className="group transition rounded-full sm:shadow-sm sm:border border-palette-250 hover:border-income text-palette-250 hover:bg-income flex justify-center items-center hover:text-palette-100 p-1 sm:px-2"
    >
      <Check className="size-10 sm:pr-2 sm:border-r border-palette-250 group-hover:border-palette-100" />
      <span className="hidden sm:block px-2 text-xl font-semibold">
        {buttons.confirm}
      </span>
    </button>
  );
}

export function CancelBtn() {
  return (
    <Link
      title="Cancelar"
      href={"/"}
      className="group transition rounded-full sm:shadow-sm sm:border border-palette-250 hover:border-expense text-palette-250 hover:bg-expense flex justify-center items-center hover:text-palette-100 p-1 sm:px-2"
    >
      <Xmark className="size-10 sm:pr-2 sm:border-r border-palette-250 group-hover:border-palette-100" />
      <span className="hidden sm:block px-2 text-xl font-semibold">
        {buttons.cancel}
      </span>
    </Link>
  );
}
