"use client";

import { dict } from "@lib/dictionaries";
import { useEffect, useState } from "react";

export default function Greetings() {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState<string>("");
  const { greetings } = dict;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 3600000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = time.getHours();
    if (hour < 12) {
      setGreeting(greetings.morning);
    } else if (hour < 20) {
      setGreeting(greetings.afternoon);
    } else {
      setGreeting(greetings.evening);
    }
  }, [time]);

  return <p className="text-palette-200 text-md mt-2">{greeting}</p>;
}
