"use server";
import { AccountSchema, InstallmentSchema, TransactionSchema } from "./schemas";
import { createClient } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { getTransaction, getUser } from "./db";
import { User } from "./types";
import { signOut } from "@auth";
import { round } from "lodash";
import { revalidatePath } from "next/cache";
import { generateHash } from "./utils";

export async function createTransaction(formData: FormData) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    const {
      type,
      description,
      account,
      account_2,
      category,
      amount,
      created_at,
    } = TransactionSchema.parse({
      type: formData.get("type"),
      description: formData.get("description"),
      account: formData.get("account"),
      account_2: formData.get("account_2"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      created_at: formData.get("datetime"),
      transfer_id: formData.get("transfer_id"),
    });
    const UTCTimestamp = new Date(created_at).getTime();
    if (type != "transfer") {
      const amountInCents =
        type === "income" ? round(amount * 100, 0) : round(-amount * 100, 0);
      await client.sql`INSERT INTO transactions (user_id, account_id, type, description, category, amount, created_at)
                     VALUES (${
                       user.id
                     }, ${account}, ${type}, ${description.toLowerCase()}, ${category}, ${amountInCents}, ${UTCTimestamp})`;
    } else {
      const amountInCents = round(amount * 100, 0);
      if (!account_2) throw new Error("Account 2 is required");
      if (account === account_2) throw new Error("Accounts cannot be the same");
      const transferId = generateHash(
        account,
        account_2,
        created_at,
        description.toLocaleLowerCase(),
        amountInCents.toString()
      );
      await client.sql`INSERT INTO transactions (user_id, account_id, type, description, category, amount, created_at, transfer_id)
                     VALUES (${
                       user.id
                     }, ${account}, 'expense', ${description.toLowerCase()}, 'transfer', ${-amountInCents}, ${UTCTimestamp}, ${transferId})`;
      await client.sql`INSERT INTO transactions (user_id, account_id, type, description, category, amount, created_at, transfer_id)
                     VALUES (${
                       user.id
                     }, ${account_2}, 'income', ${description.toLowerCase()}, 'transfer', ${amountInCents}, ${UTCTimestamp}, ${transferId})`;
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}

export async function editTransaction(tid: string, formData: FormData) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    const {
      type,
      description,
      account,
      category,
      amount,
      created_at,
      transfer_id,
    } = TransactionSchema.parse({
      type: formData.get("type"),
      description: formData.get("description"),
      account: formData.get("account"),
      account_2: null,
      category: formData.get("category"),
      amount: formData.get("amount"),
      created_at: formData.get("datetime"),
      transfer_id: formData.get("transfer_id"),
    });
    const amountInCents = type === "income" ? amount * 100 : -amount * 100;
    const UTCTimestamp = new Date(created_at).getTime();

    if (category != "transfer") {
      await client.sql`UPDATE transactions SET account_id = ${account}, type = ${type}, description = ${description}, 
                       category = ${category}, amount = ${amountInCents}, created_at = ${UTCTimestamp}
                       WHERE id = ${tid}`;
    } else {
      await client.sql`UPDATE transactions SET account_id = ${account}, type = ${type}, description = ${description}, amount = ${amountInCents}, created_at = ${UTCTimestamp}
                       WHERE id = ${tid}`;
      await client.sql`UPDATE transactions SET amount = ${-amountInCents}
                       WHERE id != ${tid} and transfer_id = ${transfer_id}`;
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}

export async function deleteTransaction(tid: string) {
  const client = createClient();
  const transaction = await getTransaction({ tid });
  if (!transaction) return;
  try {
    await client.connect();
    await client.sql`DELETE FROM transactions WHERE id=${transaction.id}`;
    if (transaction.transfer_id)
      await client.sql`DELETE FROM transactions WHERE transfer_id=${transaction.transfer_id}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    revalidatePath("/transactions");
    redirect("/transactions");
  }
}

export async function createAccount(formData: FormData) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    const { name, type, currency, color } = AccountSchema.parse({
      name: formData.get("name"),
      type: formData.get("type"),
      currency: formData.get("currency"),
      color: formData.get("color"),
    });
    await client.sql`INSERT INTO accounts (user_id, name, type, currency, color)
                     VALUES (${user.id}, ${name}, ${type}, ${currency}, ${color})`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}

export async function EditAccount(aid: string, formData: FormData) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    const { name, type, currency, color } = AccountSchema.parse({
      name: formData.get("name"),
      type: formData.get("type"),
      currency: formData.get("currency"),
      color: formData.get("color"),
    });
    await client.sql`UPDATE accounts SET name = ${name}, type = ${type}, currency = ${currency}, color = ${color}
                     WHERE id = ${aid}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}

export async function deleteAccount(aid: string) {
  const client = createClient();
  try {
    await client.connect();
    await client.sql`DELETE FROM accounts WHERE id=${aid}`;
    await client.sql`DELETE FROM transactions WHERE account_id=${aid}`;
    await client.sql`DELETE FROM installments WHERE account_id=${aid}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}

export async function clearHistory() {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    await client.sql`DELETE FROM transactions WHERE user_id=${user.id}`;
    await client.sql`DELETE FROM installments WHERE user_id=${user.id}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}

export async function deleteUser() {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    await client.sql`DELETE FROM users WHERE id=${user.id}`;
    await client.sql`DELETE FROM transactions WHERE user_id=${user.id}`;
    await client.sql`DELETE FROM accounts WHERE user_id=${user.id}`;
    await client.sql`DELETE FROM installments WHERE user_id=${user.id}`;
  } catch (err) {
    console.error(err);
  } finally {
    await signOut();
    await client.end();
  }
}

export async function createInstallment(formData: FormData) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    const { type, name, account, category, amount, quantity, period } =
      InstallmentSchema.parse({
        type: formData.get("type"),
        name: formData.get("name"),
        account: formData.get("account"),
        category: formData.get("category"),
        amount: formData.get("amount"),
        quantity: formData.get("quantity"),
        period: formData.get("period"),
      });
    const amountInCents = round(amount * 100, 0);
    await client.sql`INSERT INTO installments (user_id, account_id, type, name, category, amount, quantity, quantity_paid, period, finished)
                     VALUES (${
                       user.id
                     }, ${account}, ${type}, ${name.toLowerCase()}, ${category}, ${amountInCents}, ${quantity}, ${0}, ${period}, ${false})`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    revalidatePath("/installments");
  }
}

export async function editInstallment(iid: string, formData: FormData) {}

export async function deleteInstallment(iid: string) {
  const client = createClient();
  try {
    await client.connect();
    await client.sql`DELETE FROM installments WHERE id=${iid}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    revalidatePath("/installments");
  }
}

export async function addPayment(installment: any) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    const {
      id,
      user_id,
      account_id,
      type,
      name,
      category,
      amount,
      quantity,
      quantity_paid,
    } = installment;
    const description = quantity
      ? `${name.toLowerCase()} - ${quantity_paid + 1}/${quantity}`
      : name.toLowerCase();
    const UTCTimestamp = new Date().getTime();
    const realAmount = type === "income" ? amount : -amount;
    await client.sql`INSERT INTO transactions (user_id, account_id, type, description, category, amount, created_at, installment_id)
                     VALUES (${user_id}, ${account_id}, ${type}, ${description}, ${category}, ${realAmount}, ${UTCTimestamp}, ${id})`;
    await client.sql`UPDATE installments SET quantity_paid = ${
      quantity_paid + 1
    }, finished = ${quantity_paid + 1 == quantity}
                     WHERE id = ${id}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    revalidatePath("/installments");
  }
}
