import { deleteTransaction } from "@/app/lib/actions";
import Link from "next/link";
import { Check, EditPencil, Plus, Trash, Xmark } from "iconoir-react";
import { LogOut } from "../lib/actions";
import { LogOut as LogOutIcon } from "iconoir-react";

export function CloseButton({ text }: { text: string }) {
  return (
    <>
      <Link
        href={"/"}
        className="group transition rounded-full sm:shadow-sm sm:border border-palette-250 hover:border-expense text-palette-250 hover:bg-expense flex justify-center items-center hover:text-palette-100 p-1 sm:px-2"
      >
        <Xmark className="size-10 sm:pr-2 sm:border-r border-palette-250 group-hover:border-palette-100" />
        <span className="hidden sm:block px-2 text-xl font-semibold">
          {text}
        </span>
      </Link>
    </>
  );
}

export function SubmitButton({ text }: { text: string }) {
  return (
    <button
      title="Submit"
      type="submit"
      className="group transition rounded-full sm:shadow-sm sm:border border-palette-250 hover:border-income  text-palette-250 hover:bg-income flex justify-center items-center hover:text-palette-100 p-1 sm:px-2"
    >
      <Check className="size-10 sm:pr-2 sm:border-r border-palette-250 group-hover:border-palette-100" />
      <span className="hidden sm:block px-2 text-xl font-semibold">{text}</span>
    </button>
  );
}

export function CreateTransaction({ text }: { text: string }) {
  return (
    <Link
      href={`/transactions/create`}
      className="rounded-lg relative md:w-[16rem] flex items-center bg-income group"
    >
      <Plus className="block md:hidden size-10 text-palette-100" />
      <p className="text-neutral-50 font-semibold text-left pl-4 hover:hidden hidden md:block md:text-sm lg:text-md xl:text-lg">
        {text}
      </p>
      <span className="hidden absolute right-0 h-full w-10 rounded-lg bg-income sm:flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-200">
        <Plus width={40} height={40} className="svg w-8 text-palette-100" />
      </span>
    </Link>
  );
}

export function DeleteTransaction({ id }: { id: string }) {
  const deleteTransactionWithId = deleteTransaction.bind(null, id);
  return (
    <form
      action={deleteTransactionWithId}
      className="flex justify-center items-center text-palette-200 hover:text-palette-500"
    >
      <button type="submit" title="Delete Transaction">
        <Trash className="size-8" />
      </button>
    </form>
  );
}

export function EditTransaction({ id }: { id: string }) {
  return (
    <Link
      href={`/transactions/edit/${id}`}
      className="flex justify-center items-cente text-palette-200 hover:text-palette-500"
    >
      <EditPencil className="size-8" />
    </Link>
  );
}

export function CreateAccount({ text }: { text: string }) {
  return (
    <Link
      href={`/accounts/create`}
      className="rounded-lg relative w-full xl:w-1/4 h-10 flex items-center bg-income group"
    >
      <p className="text-palette-100 font-semibold text-left pl-4 hover:hidden md:block md:text-sm lg:text-md xl:text-lg">
        {text}
      </p>
      <span className="absolute right-0 h-full w-10 rounded-lg bg-income flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-200">
        <Plus width={40} height={40} className="svg w-8 text-palette-100" />
      </span>
    </Link>
  );
}

export function LogOutButton({ text }: { text: string }) {
  return (
    <form action={LogOut}>
      <button
        title="Log Out"
        type="submit"
        className="transition rounded-md flex h-[3rem] w-full grow items-center justify-start gap-2 text-palette-200 text-md font-normal hover:bg-palette-300 hover:text-expense sm:flex-none sm:justify-center lg:justify-start p-4 md:p-2 md:px-3"
      >
        <LogOutIcon className="size-6" />
        <p className="block sm:hidden lg:block">{text}</p>
      </button>
    </form>
  );
}
