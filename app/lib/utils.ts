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
  currency: string = "ARS"
) {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    signDisplay: signDisplay,
  });
  return formatter.format(amount);
}

export function formatBalanceForChart(
  balanceByDate: {
    created_at: Date;
    total: number;
  }[]
) {
  let balance;
  const maxDays = 30;
  const dates = [];
  for (let i = maxDays - 1; i >= 0; i--) {
    dates.push(new Date(new Date().setDate(new Date().getDate() - i)));
  }
  const array = dates.map((date) => {
    const transactionsOfDay = balanceByDate.filter(
      (transaction) => transaction.created_at <= date
    );
    balance = transactionsOfDay.reduce(
      (acc, transaction) => acc + transaction.total / 100,
      0
    );
    return {
      date: date,
      balance: balance,
    };
  });
  return array;
}
