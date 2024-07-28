import { toast } from "sonner";
import { dict } from "./dictionaries";
import { createHash } from "crypto";
import { CRYPTOS } from "./consts/cryptos";
import { round } from "lodash";

export function getLocalDate(date: Date = new Date()) {
  const localOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date.getTime() - localOffset);
}

export const formatDate = (
  date: Date,
  options?: {
    locale?: string;
    day?: "numeric" | "2-digit" | undefined;
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
    year?: "numeric" | "2-digit" | undefined;
    hour?: "numeric" | "2-digit" | undefined;
    minute?: "numeric" | "2-digit" | undefined;
  }
) => {
  const { locale, day, month, year, hour, minute } = options ?? {};
  const config: Intl.DateTimeFormatOptions = {
    day: day ?? "2-digit",
    month: month ?? "short",
    year: year ?? "numeric",
    hour: hour ?? "2-digit",
    minute: minute ?? "2-digit",
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat(locale, config);
  return formatter.format(date);
};

export function getYearMonth(timestamp: string) {
  return {
    year: new Date(parseInt(timestamp)).getFullYear(),
    month: new Date(parseInt(timestamp)).getMonth() + 1,
  };
}

export function getDate(timestamp: string) {
  const day = new Date(parseInt(timestamp)).getDate();
  const month = new Date(parseInt(timestamp)).getMonth();
  const year = new Date(parseInt(timestamp)).getFullYear();
  return new Date(year, month, day);
}

export function formatBalance(
  amount: number,
  signDisplay: "never" | "always" | "auto" = "auto",
  currency: string = "ARS",
  notation: "compact" | "standard" | "scientific" | "engineering" = "standard"
) {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    signDisplay: signDisplay,
    notation: notation,
  });
  return formatter.format(amount);
}

export function formatBalanceForChart(
  balanceByDate: {
    year: string;
    month: string;
    total: number;
  }[]
) {
  let balance;
  const dates = balanceByDate.map((item) => [item.year, item.month]).slice(-12);
  const array = dates.map((date) => {
    const transactionsOfDay = balanceByDate.filter(
      (transaction) =>
        parseInt(transaction.month) <= parseInt(date[1]) &&
        parseInt(transaction.year) <= parseInt(date[0])
    );
    balance = transactionsOfDay.reduce(
      (acc, transaction) => acc + transaction.total,
      0
    );
    return {
      year: date[0],
      month: date[1],
      total: balance,
    };
  });
  return array;
}

// No se usa
export function formatDataForTimeLine({ data }: { data: any[] }) {
  // creo un array con las fechas de data
  const dates = data.map((item) => parseInt(item.created_at));
  // me quedo con la fecha menor y la fecha actual
  const minDate = Math.min(...dates);
  const maxDate = new Date().getTime();
  // creo un nuevo array de fechas que vaya desde minDate hasta maxDate
  const datesArray = Array.from(
    { length: (maxDate - minDate) / 86400000 + 1 },
    (_, i) => new Date(minDate + i * 86400000)
  );
  // ahora le asigno a cada dia su income y expense correspondiente de data
  const formattedData = datesArray.map((date) => {
    const income = data
      .filter(
        (item) => new Date(item.created_at).toISOString() == date.toISOString()
      )
      .reduce((acc, item) => acc + Math.abs(item.income), 0);
    const expense = data
      .filter((item) => item.created_at.toISOString() == date.toISOString())
      .reduce((acc, item) => acc + Math.abs(item.expense), 0);
    return {
      date: date,
      income: income,
      expense: expense,
    };
  });

  return formattedData;
}

export function showToast(message: string, type: "success" | "error") {
  toast[type](message);
}

export function getGreeting(hour: number) {
  const { greetings } = dict;
  if (hour < 12) {
    return greetings.morning;
  } else if (hour < 18) {
    return greetings.afternoon;
  } else {
    return greetings.evening;
  }
}

export function generateHash(...params: string[]) {
  const hash = createHash("sha256");
  hash.update(params.join(""));
  return hash.digest("hex");
}

export async function convert(amount: number, from: string, to: string) {
  const fromId = CRYPTOS.find((item) => item.symbol === from)?.id;
  const toId = CRYPTOS.find((item) => item.symbol === to)?.id;
  const res = await fetch(
    `https://api.coinlore.net/api/ticker/?id=${fromId},${toId}`
  );
  const rateData = await res.json();
  const fromPrice = rateData[0].price_usd;
  const toPrice = rateData[1].price_usd;
  const amountConverted = (amount * fromPrice) / toPrice;
  return round(amountConverted, 4);
}
