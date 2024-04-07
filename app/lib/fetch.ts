"use server";
import { VercelPoolClient, db } from "@vercel/postgres";
import { Account, Transaction, User } from "./types";
import { createUser } from "./actions";

export async function fetchAllUsers(client: VercelPoolClient) {
  try {
    const data = await client.sql<User>`SELECT * FROM users`;
    return data.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fecth user data.");
  }
}

export async function fetchUser(user: {
  id: string;
  name: string;
  email: string;
}) {
  const { id } = user;
  const client = await db.connect();
  try {
    const data = await client.sql<User>`SELECT * FROM users WHERE id = ${id}`;
    if (data.rows.length === 0) {
      await createUser(user);
      const data = await client.sql<User>`SELECT * FROM users WHERE id = ${id}`;
      return data.rows[0];
    }
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fecth user data.");
  }
}

export async function fetchAccountsFromUser(userId: string) {
  try {
    const data =
      await db.sql<Account>`SELECT a.* FROM accounts AS a WHERE user_id = ${userId}`;
    return data.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fecth account data.");
  }
}

export async function fetchTransactionsFromUser(userId: string) {
  try {
    const data =
      await db.sql<Transaction>`SELECT t.* FROM transactions AS t WHERE user_id = ${userId}`;
    return data.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fecth transactions data.");
  }
}

export async function fetchTransactionFromId(transactionId: string) {
  try {
    const data =
      await db.sql<Transaction>`SELECT t.* FROM transactions AS t WHERE id = ${transactionId}`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fecth transactions data.");
  }
}

export async function fetchData(user: {
  id: string;
  name: string;
  email: string;
}) {
  const userData: User = await fetchUser(user);
  const accounts: Account[] = await fetchAccountsFromUser(userData.id);
  const transactions: Transaction[] = await fetchTransactionsFromUser(
    userData.id
  );
  return { accounts, transactions };
}
