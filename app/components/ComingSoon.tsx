import { Tools, LogOut } from "iconoir-react";

export function ComingSoon() {
  return (
    <main className="w-full sm:w-[80%] h-screen flex items-center justify-center flex-row gap-2 bg-neutral-200">
      <Tools className="size-12 md:size-20 2xl:size-28" />
      <h1 className="text-bold text-center text-2xl sm:text-4xl lg:text-6xl 2xl:text-8xl m-0 p-0">
        Coming Soon...
      </h1>
    </main>
  );
}
