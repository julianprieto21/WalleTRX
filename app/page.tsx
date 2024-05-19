import React, { Suspense } from "react";
import { ChartWidget } from "./components/wallet/ChartWidget";
import { getUser } from "@lib/db";
import MainCard from "@components/wallet/MainCard";
import Last5transactions from "@components/wallet/Last5Transactions";
import { dict } from "@lib/dictionaries";
import Accounts from "@(pages)/accounts/components/Accounts";
import { WalletSolid } from "iconoir-react";
import { getGreeting } from "@lib/utils";

export default async function HomePage() {
  const { hello: helloText } = dict;
  const title = dict.app.split("&");
  const greeting = getGreeting();
  const user = await getUser();
  if (!user) return;
  return (
    <>
      <main className="page pt-12 pb-6 px-10">
        <h2 className="font-semibold text-5xl text-palette-100">
          {helloText},{" "}
          <span className="text-palette-500">{user.name.split(" ")[0]}</span>!
        </h2>
        <div className="absolute right-10 top-10">
          <Accounts />
        </div>
        <p className="text-palette-200 text-md mt-2">{greeting}</p>
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
        <div className="w-full h-72 bg-palette-300 rounded-lg shadow-md mt-8">
          <Suspense
            fallback={
              <div className="w-full h-72 bg-palette-300 rounded-lg shadow-md mt-8 grid place-content-center"></div>
            }
          >
            <ChartWidget user={user} />
          </Suspense>
        </div>
      </main>
      {/* Informacion a mostar en pantallas pequeñas */}
      <section className="2xl:hidden bg-palette-400 text-palette-100 w-full flex flex-col justify-start items-center">
        <WalletSolid className="size-44" />
        <h1 className="flex flex-row justify-center font-light text-4xl text-palette-100">
          {title[0]}
          <strong className="font-semibold text-palette-500">{title[1]}</strong>
        </h1>
        <h2 className="font-semibold text-2xl text-palette-100 w-full text-left pl-4 mt-8">
          {helloText},{" "}
          <span className="text-palette-500">{user.name.split(" ")[0]}</span>!
        </h2>
        <p className="px-4 text-palette-200 mt-2">
          Lo siento! Aún no se encuentra disponible la version para celulares...
          <br />
          Te recomiendo ingresar desde una pantalla mas grande hasta que se
          encuentre la disponible la version para pantallas pequeñas.
        </p>
      </section>
    </>
  );
}
