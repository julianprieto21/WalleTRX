import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export function ComingSoon() {
  return (
    <div className="w-[80%] h-[100%] flex items-center justify-center flex-row gap-8">
      <WrenchScrewdriverIcon className="size-24 mt-4" />
      <h1 className="text-bold text-9xl">Coming Soon...</h1>
    </div>
  );
}
