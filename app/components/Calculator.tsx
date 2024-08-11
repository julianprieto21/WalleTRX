"use client";

import { useState } from "react";
import { round } from "lodash";
import { dict } from "@lib/dictionaries";

export default function Calculator() {
  const className =
    "border border-palette-250 rounded-md grid place-content-center hover:border-palette-500 focus:text-palette-500 focus:font-bold";
  const [operation, setOperation] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.+-/*()]/g, "");
    setValue(newValue);
  };
  const handleResult = () => {
    const result = eval(value);
    setValue(round(result, 2).toString());
  };

  return (
    <main className="card w-full h-96 flex flex-col 2xl:h-auto 2xl:w-[440px]">
      <h1 className="title">{dict.calculator}</h1>
      <input
        type="text"
        className="w-full mt-6 h-14 text-lg rounded-md bg-palette-400 border border-palette-250 text-right pr-4 placeholder:text-palette-250"
        placeholder="0"
        value={value}
        onChange={handleChange}
      />
      <section className="grid grid-cols-4 grid-rows-5 h-full mt-4 gap-2">
        <button
          className={`${className} col-start-3`}
          onClick={() => setValue(value.slice(0, -1))}
        >
          <span className="text-xl">C</span>
        </button>
        <button
          className={`${className} col-start-4`}
          onClick={() => setValue("")}
        >
          <span className="text-xl">AC</span>
        </button>
        <button className={className} onClick={() => setValue(value + "1")}>
          <span className="text-xl">1</span>
        </button>
        <button className={className} onClick={() => setValue(value + "2")}>
          <span className="text-xl">2</span>
        </button>
        <button className={className} onClick={() => setValue(value + "3")}>
          <span className="text-xl">3</span>
        </button>
        <button className={className} onClick={() => setValue(value + "+")}>
          <span className="text-xl">+</span>
        </button>
        <button className={className} onClick={() => setValue(value + "4")}>
          <span className="text-xl">4</span>
        </button>
        <button className={className} onClick={() => setValue(value + "5")}>
          <span className="text-xl">5</span>
        </button>
        <button className={className} onClick={() => setValue(value + "6")}>
          <span className="text-xl">6</span>
        </button>
        <button className={className} onClick={() => setValue(value + "-")}>
          <span className="text-xl">-</span>
        </button>
        <button className={className} onClick={() => setValue(value + "7")}>
          <span className="text-xl">7</span>
        </button>
        <button className={className} onClick={() => setValue(value + "8")}>
          <span className="text-xl">8</span>
        </button>
        <button className={className} onClick={() => setValue(value + "9")}>
          <span className="text-xl">9</span>
        </button>
        <button className={className} onClick={() => setValue(value + "*")}>
          <span className="text-xl">*</span>
        </button>
        <button
          className={`${className} text-palette-500 border-palette-500`}
          onClick={handleResult}
        >
          <span className="text-xl">=</span>
        </button>
        <button className={className}>
          <span className="text-xl">.</span>
        </button>
        <button className={className}>
          <span className="text-xl">0</span>
        </button>
        <button className={className}>
          <span className="text-xl">/</span>
        </button>
      </section>
    </main>
  );
}
