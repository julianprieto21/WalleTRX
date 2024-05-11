import Link from "next/link";
import { DataTransferBoth } from "iconoir-react";

export default function TransferWidget() {
  return (
    <Link
      href={"transactions/create?t=transfer"}
      className="flex rounded-3xl justify-center items-center bg-palette-300 hover:bg-transfer text-transfer hover:text-neutral-100 transition ease-in-out delay-10 p-2"
    >
      <DataTransferBoth className="rotate-90 size-16 xl:size-12 2xl:size-14" />
    </Link>
  );
}
