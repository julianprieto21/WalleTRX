"use client";

import { CRYPTOS } from "@lib/consts/cryptos";
import { convert } from "@lib/utils";
import { DataTransferBoth, NavArrowDown } from "iconoir-react";
import { useState } from "react";

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState<string>("USDT");
  const [toCurrency, setToCurrency] = useState<string>("BTC");
  const [amountToConvert, setAmountToConvert] = useState<string>("");
  const [amountConverted, setAmountConverted] = useState<string>("");

  const handleChangeToConvert = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setAmountToConvert(value === "" ? "" : value);
    if (value) {
      const converted = await convert(Number(value), fromCurrency, toCurrency);
      setAmountConverted(converted.toString());
      return;
    }
    setAmountConverted("");
  };
  const handleChangeConverted = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setAmountConverted(value === "" ? "" : value);
    if (value) {
      const converted = await convert(Number(value), toCurrency, fromCurrency);
      setAmountToConvert(converted.toString());
      return;
    }
    setAmountToConvert("");
  };

  return (
    <form className="flex flex-row gap-6 items-center justify-center">
      <div className="relative h-12 bg-palette-300 text-palette-200 rounded-lg flex flex-row justify-between">
        <input
          required
          title="Monto a convertir"
          type="number"
          value={amountToConvert}
          onChange={(e) => handleChangeToConvert(e)}
          className="h-12 w-52 px-2 rounded-s-lg bg-palette-300 text-center placeholder:text-palette-250"
          placeholder={`0.00 ${fromCurrency}`}
        ></input>
        {/* <div className="cursor-pointer border-l border-palette-250 w-28 h-12 gap-1 px-2 place-content-center flex flex-row items-center hover:bg-palette-250 rounded-e-lg">
          <img
            title="From currency"
            alt="From currency"
            className="w-5"
            src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${fromCurrency.toLowerCase()}.png`}
          />
          {fromCurrency}
          <NavArrowDown className="size-5" />
        </div> */}
        <select
          name="fromCurrency"
          title="Moneda de origen"
          className="peer text-transparent cursor-pointer border-l border-palette-250 w-28 h-12 bg-transparent z-10"
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value={fromCurrency}></option>
          {CRYPTOS.map((item) => {
            return (
              <option
                className="text-palette-400"
                key={item.id}
                value={item.symbol}
                disabled={item.symbol === toCurrency}
              >
                {item.name}
              </option>
            );
          })}
        </select>
        <label
          htmlFor="fromCurrency"
          className="absolute text-lg flex flex-row items-center right-0 top-1/2 -translate-y-1/2 gap-2 p-3 h-full w-28 rounded-e-lg peer-hover:bg-palette-250"
        >
          <img
            alt="To currency"
            className="w-5 h-5"
            src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${fromCurrency.toLowerCase()}.png`}
          />
          {fromCurrency}
          <NavArrowDown className="size-5 shrink-0" />
        </label>
      </div>
      <div className="bg-palette-300 text-palette-200 size-12 grid place-content-center rounded-lg">
        <DataTransferBoth className="rotate-90 size-7" />
      </div>
      <div className="relative h-12 bg-palette-300 text-palette-200 rounded-lg flex flex-row justify-between">
        <select
          name="toCurrency"
          title="Moneda de destino"
          className="peer text-transparent cursor-pointer border-r border-palette-250 w-28 h-12 bg-transparent z-10"
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value={toCurrency}></option>
          {CRYPTOS.map((item) => {
            return (
              <option
                className="text-palette-400"
                key={item.id}
                value={item.symbol}
                disabled={item.symbol === fromCurrency}
              >
                {item.name}
              </option>
            );
          })}
        </select>
        <label
          htmlFor="toCurrency"
          className="absolute text-lg flex flex-row items-center top-1/2 -translate-y-1/2 gap-2 p-3 h-full w-28 rounded-s-lg peer-hover:bg-palette-250"
        >
          {toCurrency}
          <img
            alt="To currency"
            className="w-5 h-5"
            src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${toCurrency.toLowerCase()}.png`}
          />
          <NavArrowDown className="size-5 shrink-01" />
        </label>

        <input
          required
          title="Monto convertido"
          type="number"
          value={amountConverted}
          onChange={(e) => handleChangeConverted(e)}
          className="h-12 w-52 px-2 rounded-e-lg bg-palette-300 text-center placeholder:text-palette-250"
          placeholder={`0.00 ${toCurrency}`}
        ></input>
      </div>
    </form>
  );
}
