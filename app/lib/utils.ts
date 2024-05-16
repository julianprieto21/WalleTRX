import { toast } from "sonner";

interface DateProps {
  date: Date;
  locale?: string;
  day?: "numeric" | "2-digit" | "undefined";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | "undefined";
  year?: "numeric" | "2-digit" | "undefined";
}
export const formatDate = ({
  date,
  locale = "es-AR",
  day,
  month,
  year,
}: DateProps) => {
  const options: Intl.DateTimeFormatOptions = {
    day: day === "undefined" ? undefined : "numeric",
    month: month === "undefined" ? undefined : "short",
    year: year === "undefined" ? undefined : "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
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
    month: string;
    total: string;
  }[]
) {
  let balance;
  const dates = balanceByDate.map((item) => item.month).slice(-12);
  const array = dates.map((date) => {
    const transactionsOfDay = balanceByDate.filter(
      (transaction) => parseInt(transaction.month) <= parseInt(date)
    );
    balance = transactionsOfDay.reduce(
      (acc, transaction) => acc + parseInt(transaction.total),
      0
    );
    return {
      month: date,
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
