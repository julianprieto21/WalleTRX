"use server";
import { sql } from "@vercel/postgres";
import { Wallet } from "./types";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export async function createUser(
  client: any,
  user: { email: string; name: string }
) {
  try {
    const { email, name } = user;
    const query = client.sql`INSERT INTO users(name, email) VALUES (${name}, ${email})`;
    return query;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user.");
  }
}

export async function createWallet(client: any, wallet: Wallet) {
  try {
    const { user_id, created_at } = wallet;
    const query = await client.sql`INSERT INTO wallets(user_id, created_at)
        VALUES (${user_id}, ${created_at})`;
    return query;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create wallet.");
  }
}

const TransactionSchema = z.object({
  transaction_id: z.string(),
  type: z.enum(["income", "expense"]),
  description: z.string(),
  account: z.string(),
  category: z.string(),
  amount: z.string().transform((value) => parseFloat(value)),
  created_at: z.string(),
});
const CreateTransactionSchema = TransactionSchema.omit({
  transaction_id: true,
});
const EditTransactionSchema = TransactionSchema.omit({
  transaction_id: true,
});

export async function createTransaction(formData: FormData) {
  const { type, description, account, category, amount, created_at } =
    CreateTransactionSchema.parse({
      type: formData.get("type"),
      description: formData.get("description"),
      account: formData.get("account"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      created_at: formData.get("date"),
    });
  const [account_id, wallet_id] = account.split("&");
  const realAmount = type === "income" ? amount : -amount;
  await sql`
    INSERT INTO transactions (wallet_id, account_id, type, description, category, amount, created_at)
    VALUES (${wallet_id}, ${account_id}, ${type}, ${description}, ${category}, ${
    realAmount * 100
  }, ${created_at})
  `;
  revalidatePath("/");
  redirect("/");
}

export async function editTransaction(id: string, formData: FormData) {
  const { type, description, account, category, amount, created_at } =
    EditTransactionSchema.parse({
      type: formData.get("type"),
      description: formData.get("description"),
      account: formData.get("account"),
      category: formData.get("category"),
      amount: formData.get("amount"),
      created_at: formData.get("date"),
    });
  const [account_id, wallet_id] = account.split("&");
  const realAmount = type === "income" ? amount : -amount;
  await sql`
    UPDATE transactions SET wallet_id = ${wallet_id}, account_id = ${account_id}, type = ${type}, description = ${description}, category = ${category}, amount = ${
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
