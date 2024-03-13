import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export function ComingSoon() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-row gap-2">
      <WrenchScrewdriverIcon className="size-12 md:size-20 mt-4" />
      <h1 className="text-bold w-2/4 sm:w-3/5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        Coming Soon...
      </h1>
    </div>
  );
}
