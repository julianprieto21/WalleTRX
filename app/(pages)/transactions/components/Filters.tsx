"use client";
import { NavArrowDown } from "iconoir-react";
import { useState } from "react";

export default function Filters() {
  const [open, setOpen] = useState(false);
  const handleChange = () => {
    setOpen(!open);
  };
  return (
    <>
      <div
        className={`border-t border-palette-300 mt-3 w-full ${
          open ? "h-20" : "h-0"
        } bg-palette-300 overflow-hidden items-center justify-center grid duration-150 overflow-x-auto`}
      >
        Filtros
      </div>
      <input
        title="Show filters"
        id="show-filters"
        type="checkbox"
        className="hidden peer"
        onChange={handleChange}
      ></input>
      <label
        htmlFor="show-filters"
        className="peer-checked:rotate-180 duration-150 grid place-content-center w-full"
      >
        <NavArrowDown className="text-palette-200 hover:text-palette-100 hover:scale-105 cursor-pointer" />
      </label>
    </>
  );
}
