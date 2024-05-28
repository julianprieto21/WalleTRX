import { auth } from "@auth";
import { createClient } from "@vercel/postgres";
import { Session } from "next-auth";
import type { Account, Transaction, User } from "@lib/types";

export async function getUser() {
  const { user } = (await auth()) as Session;
  if (!user) return;
  const client = createClient();

  try {
    await client.connect();
    const data =
      await client.sql<User>`select * from users where email=${user.email}`;
    if (data.rows[0]) {
      // Actualizar los datos de usuario
      const updatedUser =
        await client.sql<User>`update users set name=${user.name}, image_url=${user.image} where email=${user.email} returning *`;
      return updatedUser.rows[0];
    } else {
      // Crear el usuario
      const newUser =
        await client.sql<User>`insert into users (name, email, image_url) values (${user.name}, ${user.email}, ${user.image}) returning *`;
      return newUser.rows[0];
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await client.end();
  }
}

export async function getAccounts() {
  const user = (await getUser()) as User;
  const client = createClient();

  try {
    await client.connect();
    const data =
      await client.sql<Account>`select * from accounts where user_id=${user.id}`;
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await client.end();
  }
}

export async function getAccount({ aid }: { aid: string }) {
  const client = createClient();
  try {
    await client.connect();
    const data =
      await client.sql<Account>`select * from accounts where id=${aid}`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export async function getTransactions() {
  const user = (await getUser()) as User;
  const client = createClient();

  try {
    await client.connect();
    const data =
      await client.sql<Transaction>`select * from transactions where user_id=${user.id} order by created_at DESC`;
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await client.end();
  }
}

export async function getTransaction({ tid }: { tid: string }) {
  const client = createClient();
  try {
    await client.connect();
    const data =
      await client.sql<Transaction>`select * from transactions where id=${tid}`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

export async function getBalanceByAccounts() {
  const user = (await getUser()) as User;
  const client = createClient();

  try {
    await client.connect();
    const {rows} = await client.sql<{id: string, name: string, color: string, total: number}>`select distinct a.id, a.name, a.color, case when t.total != 0 then t.total else 0 end total from accounts a left join (select account_id, sum(amount) total from transactions group by account_id) t
        on a.id = t.account_id
        where user_id=${user.id} and type='standard' order by total DESC`;
    return rows;
  } catch (error) {
    console.error(error);
    return []
  } finally {
    await client.end();
  }
}

export async function getBalanceByCategory() {
  const user = (await getUser()) as User;
  const client = createClient();
  try {
    await client.connect();
    const {rows} = await client.sql<{category: string, total: number}>`select category, sum(amount) total from transactions where user_id=${user.id} and category !='transfer' group by category`
    return rows;
  } catch (error) {
    console.error(error);
    return []
  } finally {
    await client.end();
  }
}

export async function getBalanceByType() {
  const user = (await getUser()) as User;
  const client = createClient();
  try {
    await client.connect();
    const {rows} = await client.sql<{type: string, total: number}>`select type, sum(amount) total from transactions where user_id=${user.id} and category !='transfer' group by type`
    return rows;
  } catch (error) {
    console.error(error);
    return []
  } finally {
    await client.end();
  }
}

export async function getBalanceByDate() {
  const user = (await getUser()) as User;
  const client = createClient();
  try {
    await client.connect();
    const {rows} = await client.sql<{timestamp: string, amount: number}>`select created_at as timestamp, amount from transactions where user_id = ${user.id} and category !='transfer' order by created_at ASC`;
    return rows;
  } catch (error) {
    console.error(error);
    return []
  } finally {
    await client.end();
  }
}

export async function getBalanceByUser() {
  const user = (await getUser()) as User;
  const client = createClient();
  try {
    await client.connect();
    const {rows} = await client.sql<{user_id: string, total: number}>`select user_id, sum(amount) total from transactions where user_id=${user.id} group by user_id`;
    return rows;
  } catch (error) {
    console.error(error);
    return []
  } finally {
    await client.end();
  }
}