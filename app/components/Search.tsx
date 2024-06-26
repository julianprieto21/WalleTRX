"use client";
import { Search as SearchIcon } from "iconoir-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, 250);

  return (
    <div className="relative flex w-[100%]">
      <input
        className="peer block w-full rounded-md bg-palette-250 py-[9px] pl-10 text-sm outline-2 placeholder:text-palette-200 text-palette-100"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-palette-200 peer-focus:text-palette-100" />
    </div>
  );
}
