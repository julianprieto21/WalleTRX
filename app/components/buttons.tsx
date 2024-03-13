import {
  XMarkIcon,
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { lang } from "@/app/lib/const/string-en";
import { deleteTransaction } from "@/app/lib/actions";
import Link from "next/link";

export function CloseButton() {
  return (
    <>
      <Link
        href={"/"}
        title="Close"
        className="transition duration-75 rounded-full shadow-sm border hover:border-red-500 text-neutral-600 hover:bg-red-500 flex justify-center items-center hover:text-neutral-100 px-2"
      >
        <XMarkIcon width={40} height={40} className="pr-2 border-r" />
        <span className="px-2 text-xl font-semibold">{lang.cancel}</span>
      </Link>
    </>
  );
}

export function SubmitButton() {
  return (
    <button
      title="Submit"
      type="submit"
      className="transition duration-75 rounded-full shadow-sm border hover:border-green-500 text-neutral-600 hover:bg-green-500 flex justify-center items-center hover:text-neutral-100 px-2"
    >
      <CheckIcon width={40} height={40} className="pr-2 border-r" />
      <span className="px-2 text-xl font-semibold">{lang.acceptText}</span>
    </button>
  );
}

export function CreateTransaction() {
  return (
    <Link
      href={`/transactions/create`}
      className="rounded-lg relative md:w-[16rem] flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
    >
      <PlusIcon className="block md:hidden size-10 text-white" />
      <p className="text-neutral-50 font-semibold text-left pl-4 hover:hidden hidden md:block md:text-sm lg:text-md xl:text-lg">
        {lang.addTransactionText}
      </p>
      <span className="hidden absolute right-0 h-full w-10 rounded-lg bg-green-500 sm:flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-200">
        <PlusIcon width={40} height={40} className="svg w-8 text-white" />
      </span>
    </Link>
  );
}

export function DeleteTransaction({ id }: { id: string }) {
  const deleteTransactionWithId = deleteTransaction.bind(null, id);
  return (
    <form
      action={deleteTransactionWithId}
      className="flex justify-center items-center border border-neutral-200 rounded shadow hover:shadow-none text-neutral-500 hover:text-neutral-700"
    >
      <button type="submit" title="Delete Transaction">
        <TrashIcon className="size-8 sm:size-10 2xl:size-12 px-2" />
      </button>
    </form>
  );
}

export function EditTransaction({ id }: { id: string }) {
  return (
    <Link
      href={`/transactions/${id}/edit`}
      className="flex justify-center items-center border border-neutral-200 rounded shadow hover:shadow-none text-neutral-500 hover:text-neutral-700"
    >
      <PencilIcon className="size-8 sm:size-10 2xl:size-12 px-2" />
    </Link>
  );
}
