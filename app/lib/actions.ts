"use server";
import { sql, db } from "@vercel/postgres";
import { User } from "./types";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { fetchUser } from "./fetch";

const TransactionSchema = z.object({
  // transaction_id: z.string(),
  type: z.enum(["income", "expense", "transfer"]),
  description: z.string(),
  account: z.string(),
  category: z.string(),
  amount: z.string().transform((value) => parseFloat(value)),
  created_at: z.string(),
});
const AccountSchema = z.object({
  name: z.string(),
  currency: z.string(),
  type: z.string(),
  color: z.string(),
});

export async function createUser(user: {
  id: string;
  name: string;
  email: string;
}) {
  try {
    const { name, email } = user;
    const data =
      await db.sql<User>`INSERT INTO users(name, email) VALUES (${name}, ${email})`;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user.");
  }
}

export async function createAccount(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email || !session?.user?.id || !session?.user.name)
    return;
  const user = await fetchUser({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });
  const { name, currency, type, color } = AccountSchema.parse({
    name: formData.get("name"),
    currency: formData.get("currency"),
    type: formData.get("type"),
    color: formData.get("color"),
  });
  await sql`
    INSERT INTO accounts (user_id, name, currency, type, color) VALUES (${user.id}, ${name}, ${currency}, ${type}, ${color})
  `;
  revalidatePath("/");
  redirect("/");
}

export async function editAccount(id: string, formData: FormData) {
  const { name, currency, type, color } = AccountSchema.parse({
    name: formData.get("name"),
    currency: formData.get("currency"),
    type: formData.get("type"),
    color: formData.get("color"),
  });
  await sql`
    UPDATE accounts SET name = ${name}, currency = ${currency}, type = ${type}, color = ${color}
  WHERE id = ${id}
  `;
  revalidatePath("/");
  redirect("/");
}

export async function createTransaction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email || !session?.user?.id || !session?.user.name)
    return;
  const user = await fetchUser({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });
  const { type, description, account, category, amount, created_at } =
    TransactionSchema.parse({
      type: formData.get("type"),
      description: formData.get("description"),
      account: formData.get("account"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      created_at: formData.get("date"),
    });
  const realAmount = type === "income" ? amount : -amount;
  await sql`
    INSERT INTO transactions (user_id, account_id, type, description, category, amount, created_at)
    VALUES (${user.id}, ${account}, ${type}, ${description}, ${category}, ${
    realAmount * 100
  }, ${created_at})
  `;
  revalidatePath("/");
  redirect("/");
}

export async function editTransaction(id: string, formData: FormData) {
  const { type, description, account, category, amount, created_at } =
    TransactionSchema.parse({
      type: formData.get("type"),
      description: formData.get("description"),
      account: formData.get("account"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      created_at: formData.get("date"),
    });
  const realAmount = type === "income" ? amount : -amount;
  await sql`
    UPDATE transactions SET account_id = ${account}, type = ${type}, description = ${description}, category = ${category}, amount = ${
    realAmount * 100
  }, created_at = ${created_at}
  WHERE id = ${id}
  `;
  revalidatePath("/");
  redirect("/");
}

export async function deleteTransaction(id: string) {
  await sql`
    DELETE FROM transactions WHERE id = ${id}`;
  revalidatePath("/transactions");
}

export async function LogOut() {
  await signOut();
}
