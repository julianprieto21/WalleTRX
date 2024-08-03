import React, { Suspense } from "react";
import { ChartWidget } from "./components/wallet/ChartWidget";
import { getUser } from "@lib/db";
import MainCard from "@components/wallet/MainCard";
import Last5transactions from "@components/wallet/Last5Transactions";
import { dict } from "@lib/dictionaries";
import Accounts from "@(pages)/accounts/components/Accounts";
import Greetings from "@components/Greetings";

export default async function HomePage() {
  const { hello: helloText } = dict;
  const user = await getUser();
  if (!user) return;
  return (
    <main className="page pt-8 2xl:pt-12 pb-6 px-4 2xl:px-10 gap-6 2xl:gap-10">
      <div className="mt-4">
        <span className="font-semibold text-5xl text-palette-100">
          {helloText},{" "}
          <span className="text-palette-500">{user.name.split(" ")[0]}!</span>
        </span>
        <Greetings />
      </div>

      <div className="shrink-0 mt-4 2xl:mt-0 h-auto 2xl:h-auto p-2 2xl:absolute 2xl:right-10 2xl:top-10 overflow-x-scroll">
        <Accounts />
      </div>
      <div className="w-full 2xl:h-auto flex flex-col items-center 2xl:flex-row gap-10 2xl:gap-8">
        <Suspense
          fallback={
            <div className="shrink-0 rounded-lg h-80 w-[620px] shadow-md bg-palette-300 px-6 py-5"></div>
          }
        >
          <MainCard user={user} />
        </Suspense>
        <Suspense
          fallback={
            <div className="shrink-0 2xl:block rounded-lg h-80 w-full shadow-md bg-palette-300 px-6 py-5"></div>
          }
        >
          <Last5transactions />
        </Suspense>
      </div>
      <div className="hidden 2xl:block w-full h-72 bg-palette-300 rounded-lg shadow-md">
        <Suspense
          fallback={
            <div className="w-full h-72 bg-palette-300 rounded-lg shadow-md mt-8 grid place-content-center"></div>
          }
        >
          <ChartWidget user={user} />
        </Suspense>
      </div>
    </main>
  );
}
