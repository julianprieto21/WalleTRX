"use server";
import { AccountSchema, TransactionSchema } from "./schemas";
import { createClient, db } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { getUser } from "./db";
import { User } from "./types";

export async function createTransaction(formData: FormData) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    const { type, description, account, category, amount, created_at } =
      TransactionSchema.parse({
        type: formData.get("type"),
        description: formData.get("description"),
        account: formData.get("account"),
        category: formData.get("category"),
        amount: formData.get("amount"),
        created_at: formData.get("date"),
      });
    const amountInCents = type === "income" ? amount * 100 : -amount * 100;
    await client.sql`INSERT INTO transactions (user_id, account_id, type, description, category, amount, created_at)
                     VALUES (${user.id}, ${account}, ${type}, ${description}, ${category}, ${amountInCents}, ${created_at})`;
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
    const { type, description, account, category, amount, created_at } =
      TransactionSchema.parse({
        type: formData.get("type"),
        description: formData.get("description"),
        account: formData.get("account"),
        category: formData.get("category"),
        amount: formData.get("amount"),
        created_at: formData.get("date"),
      });
    const amountInCents = type === "income" ? amount * 100 : -amount * 100;
    await client.sql`UPDATE transactions SET account_id = ${account}, type = ${type}, description = ${description}, 
                     category = ${category}, amount = ${amountInCents}, created_at = ${created_at}
                     WHERE id = ${tid}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}

export async function deleteTransaction(tid: string) {
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    await client.sql`DELETE FROM transactions WHERE id=${tid}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
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
  const user = (await getUser()) as User;
  if (!user) return;
  const client = createClient();
  try {
    await client.connect();
    await client.sql`DELETE FROM accounts WHERE id=${aid}`;
    await client.sql`DELETE FROM transactions WHERE account_id=${aid}`;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    redirect("/");
  }
}
