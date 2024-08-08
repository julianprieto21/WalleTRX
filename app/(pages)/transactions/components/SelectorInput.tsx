"use client";

import { dict } from "@lib/dictionaries";

export function SelectorInput({
  placeHolder,
  options,
  id,
  selected,
}: {
  placeHolder: string;
  options: any[];
  id: string;
  selected?: any;
}) {
  return (
    <select
      required
      title="Selector"
      name={id}
      defaultValue={selected ?? placeHolder}
      className="shrink-0 bg-palette-400 border border-palette-250 text-palette-100 rounded focus:border-palette-500 w-56 p-2.5 "
    >
      <option disabled>{placeHolder}</option>
      {options.map((option, index) => {
        let name;
        if (id === "category") name = dict.categories[option.id];
        else name = option.name;
        return (
          <option key={index} value={option.id}>
            {name}
          </option>
        );
      })}
    </select>
  );
}
