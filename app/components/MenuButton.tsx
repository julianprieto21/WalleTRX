"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function MenuButtonSmallScreen() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <button name="menuButtonSmallScreen" title="Menu" onClick={handleClick}>
      <Bars3Icon className="sm:hidden size-10 antialiased" />
    </button>
  );
}
