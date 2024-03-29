import { deleteTransaction } from "@/app/lib/actions";
import Link from "next/link";
import { Check, EditPencil, Plus, Trash, Xmark } from "iconoir-react";

export function CloseButton({ text }: { text: string }) {
  return (
    <>
      <Link
        href={"/"}
        className="transition duration-75 rounded-full sm:shadow-sm sm:border hover:border-red-500 text-neutral-600 hover:bg-red-500 flex justify-center items-center hover:text-neutral-100 p-1 sm:px-2"
      >
        <Xmark className="size-10 sm:pr-2 sm:border-r" />
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
      className="transition duration-75 rounded-full sm:shadow-sm sm:border hover:border-green-500  text-neutral-600 hover:bg-green-500 flex justify-center items-center hover:text-neutral-100 p-1 sm:px-2"
    >
      <Check className="size-10 sm:pr-2 sm:border-r" />
      <span className="hidden sm:block px-2 text-xl font-semibold">{text}</span>
    </button>
  );
}

export function CreateTransaction({ text }: { text: string }) {
  return (
    <Link
      href={`/transactions/create`}
      className="rounded-lg relative md:w-[16rem] flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
    >
      <Plus className="block md:hidden size-10 text-white" />
      <p className="text-neutral-50 font-semibold text-left pl-4 hover:hidden hidden md:block md:text-sm lg:text-md xl:text-lg">
        {text}
      </p>
      <span className="hidden absolute right-0 h-full w-10 rounded-lg bg-green-500 sm:flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-200">
        <Plus width={40} height={40} className="svg w-8 text-white" />
      </span>
    </Link>
  );
}

export function DeleteTransaction({ id }: { id: string }) {
  const deleteTransactionWithId = deleteTransaction.bind(null, id);
  return (
    <form
      action={deleteTransactionWithId}
      className="flex justify-center items-center text-neutral-300 hover:text-neutral-500"
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
      className="flex justify-center items-cente text-neutral-300 hover:text-neutral-500"
    >
      <EditPencil className="size-8" />
    </Link>
  );
}

export function CreateAccount({ text }: { text: string }) {
  return (
    <Link
      href={`/accounts/create`}
      className="rounded-lg relative w-full xl:w-1/4 h-10 flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
    >
      <p className="text-neutral-50 font-semibold text-left pl-4 hover:hidden md:block md:text-sm lg:text-md xl:text-lg">
        {text}
      </p>
      <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-200">
        <Plus width={40} height={40} className="svg w-8 text-white" />
      </span>
    </Link>
  );
}
