"use client";

import { getGreeting } from "@lib/utils";
import { set } from "lodash";
import { useEffect, useState } from "react";

export default function Greetings() {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState<string>(
    getGreeting(time.getHours())
  );

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 3600000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = time.getHours();
    setGreeting(getGreeting(hour));
  }, [time]);

  return <p className="text-palette-200 text-md mt-2">{greeting}</p>;
}
