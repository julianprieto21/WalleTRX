import { toast } from "sonner";
import { dict } from "./dictionaries";
import { createHash } from "crypto";

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
    total: string;
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
      (acc, transaction) => acc + parseInt(transaction.total),
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

export function formatDataForTimeLine({ data }: { data: any[] }) {
  // creo un array con las fechas de data
  const dates = data.map((item) => item.created_at);
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
      .filter((item) => item.created_at.toISOString() == date.toISOString())
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

export function getGreeting() {
  const { greetings } = dict;
  const hour = new Date().getHours();
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
