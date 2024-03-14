"use client";
import {
  Bars3Icon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export function MenuButtonBigScreen() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <button name="menuButtonBigScreen" title="Settings" onClick={handleClick}>
      <EllipsisVerticalIcon className="hidden lg:block size-10 antialiased" />
      <EllipsisHorizontalIcon className="hidden sm:block lg:hidden size-10 antialiased" />
    </button>
  );
}

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
