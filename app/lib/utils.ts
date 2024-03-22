import { Transaction } from "./types";

export function formatBalance(
  amount: number,
  signDisplay: "never" | "always" | "auto" = "auto"
) {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    signDisplay: signDisplay,
  });
  return formatter.format(amount);
}

export function getBalanceFromTransactions(transactions: Transaction[]) {
  // sumar los amount de las transacciones de tipo income
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  return { income, expense };
}

export function filterTransactionsByAccount(
  transactions: Transaction[],
  accountId: string
) {
  return transactions.filter(
    (transaction) => transaction.account_id === accountId
  );
}

export function filterTransactionsByMonth(transactions: Transaction[]) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return transactions.filter(
    (transaction) =>
      transaction.created_at.getMonth() <= month &&
      transaction.created_at.getFullYear() <= year
  );
}

interface DateProps {
  dateStr: string;
  locale?: string;
  day?: "numeric" | "2-digit" | 'undefined';
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | 'undefined',
  year?: "numeric" | "2-digit" | 'undefined';
}
export const formatDate = ({dateStr, locale = 'en-US', day, month, year}: DateProps) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: day === 'undefined' ? undefined : 'numeric',
    month: month === 'undefined' ? undefined : 'short',
    year: year === 'undefined' ? undefined : 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function getLast12Months(): Date[] {
  const today = new Date();
  const last12Months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    last12Months.push(date);
  }
  return last12Months.reverse();
}

export function groupByCategory(transactions: Transaction[]) {
  return transactions.reduce(
    (acc: { [category: string]: number }, transaction: Transaction) => {
      const { category, amount, type } = transaction;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    },
    {}
  );
}

export function groupByMonth(transactions: Transaction[]) {
  const months = getLast12Months();
  const array = months.map((date) => ({
    date: `${date.getFullYear()}-${date.getMonth() + 1}`,
    income: 0,
    expense: 0,
  }));

  for (const transaction of transactions) {
    const month = transaction.created_at.getMonth() + 1;
    const year = transaction.created_at.getFullYear();
    const key = `${year}-${month}`;
    const index = array.findIndex((item) => item.date === key);
    if (index !== -1) {
      if (transaction.type == "income") {
        array[index].income += transaction.amount / 100;
      } else if (transaction.type == "expense") {
        array[index].expense += transaction.amount / 100;
      }
    }
  }
  return array;
}

export function getBalanceByDay(
  transactions: Transaction[],
  month: number,
  year: number
) {
  let balance = 0;
  const dayOfMonth = new Date(year, month, 0).getDate();
  const maxDays = 30;
  const dates = [];
  for (let i = maxDays - 1; i >= 0; i--) {
    dates.push(new Date(new Date().setDate(new Date().getDate() - i)));
  }
  const array = dates.map((date) => {
    const transactionsOfDay = transactions.filter(
      (transaction) => transaction.created_at <= date
    );
    balance = transactionsOfDay.reduce(
      (acc, transaction) => acc + transaction.amount / 100,
      0
    );
    return {
      date: date,
      balance: balance,
    };
  });
  return array;
}
