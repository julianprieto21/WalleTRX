"use client";
import { Account } from "@/app/lib/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { lang } from "@/app/lib/const/string-en";

export function AccountSelector({ accounts }: { accounts: Account[] }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("account", value);
      replace(`${pathName}?${params.toString()}`);
    } else {
      params.delete("account");
      replace(`${pathName}?${params.toString()}`);
    }
  };

  return (
    <select
      title="Account Selector"
      className="text-neutral-700 w-3/4 sm:w-[12rem] text-center bg-neutral-200 border-b border-neutral-400"
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("account") || ""}
    >
      <option key={0} value="">
        {lang.allText}
      </option>
      {accounts.map((account: Account, index: number) => (
        <option key={index + 1} value={account.account_id}>
          {account.name}
        </option>
      ))}
    </select>
  );
}
