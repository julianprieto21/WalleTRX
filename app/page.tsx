import React, { Suspense } from "react";
import { ChartWidget } from "./components/wallet/ChartWidget";
import { getUser } from "@lib/db";
import MainCard from "@components/wallet/MainCard";
import Last5transactions from "@components/wallet/Last5Transactions";
import { dict } from "@lib/dictionaries";

export default async function HomePage() {
  const { mainTitle } = dict;
  const user = await getUser();
  if (!user) return;
  return (
    <main className="page pt-12 pb-6 px-10">
      <h2 className="font-semibold text-5xl text-palette-100">
        {mainTitle},{" "}
        <span className="text-palette-500">{user.name.split(" ")[0]}</span>!
      </h2>
      <p className="text-palette-200 text-md mt-2">Buenos dias!</p>
      <div className="w-full flex flex-row gap-8">
        <Suspense
          fallback={
            <div className=" shrink-0 rounded-lg h-96 w-[620px] mt-10 shadow-md bg-palette-300 px-6 py-5"></div>
          }
        >
          <MainCard user={user} />
        </Suspense>
        <Suspense
          fallback={
            <div className="rounded-lg h-96 w-full mt-10 shadow-md bg-palette-300 px-6 py-5"></div>
          }
        >
          <Last5transactions />
        </Suspense>
      </div>
      <div className="flex-1 h-72 bg-palette-300 rounded-lg shadow-md mt-8">
        <ChartWidget user={user} />
      </div>
    </main>
  );
}
