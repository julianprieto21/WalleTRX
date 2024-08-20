import { toast } from "sonner";
import { dict } from "./dictionaries";
import { createHash } from "crypto";
import { CRYPTOS } from "./consts/cryptos";
import { round } from "lodash";
import { getInstallments, getTransactions } from "./db";

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

export async function isPendingInstallments() {
  const installments = (await getInstallments()).filter(
    (item) => item.finished == false
  );
  const installmentsTransactions = (await getTransactions()).filter(
    (transaction) => transaction.installment_id !== null
  );
  const actualDay = new Date().getDate();
  const actualMonth = new Date().getMonth();
  const actualYear = new Date().getFullYear();
  let pendings = 0;
  for (const installment of installments) {
    const transactionsOfInstallment = installmentsTransactions.filter(
      (transaction) => transaction.installment_id === installment.id
    );
    if (installment.period == "monthly") {
      if (
        !transactionsOfInstallment.some((item) => {
          return new Date(parseInt(item.created_at)).getMonth() == actualMonth;
        })
      ) {
        pendings++;
      }
    }
    if (installment.period == "daily") {
      if (
        !transactionsOfInstallment.some((item) => {
          return new Date(parseInt(item.created_at)).getDate() == actualDay;
        })
      ) {
        pendings++;
      }
    }
    if (installment.period == "yearly") {
      if (
        !transactionsOfInstallment.some((item) => {
          return (
            new Date(parseInt(item.created_at)).getFullYear() == actualYear
          );
        })
      ) {
        pendings++;
      }
    }
  }
  return pendings > 0;
}
