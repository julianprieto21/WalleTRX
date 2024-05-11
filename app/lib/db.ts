import { auth } from "@auth";
import { createClient, db } from "@vercel/postgres";
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
      await client.sql<Transaction>`select * from transactions where user_id=${user.id}`;
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

// TODO: Hace falta traerse el user_id en caso groupBy === 'user' ?
export async function getBalance({
  groupBy,
  user,
}: {
  groupBy: "type" | "account" | "user" | "date";
  user: User;
}) {
  const client = createClient();
  let data;
  try {
    await client.connect();
    if (groupBy == "type") {
      data =
        await client.sql`select type, sum(amount) total from transactions where user_id=${user.id} group by type`;
    } else if (groupBy == "account") {
      data =
        await client.sql`select distinct a.*, case when t.total != 0 then t.total else 0 end total from accounts a left join (select account_id, sum(amount) total from transactions group by account_id) t
        on a.id = t.account_id
        where user_id=${user.id} and type='standard'`;
    } else if (groupBy == "user") {
      data =
        await client.sql`select user_id, sum(amount) total from transactions where user_id=${user.id} group by user_id`;
    } else if (groupBy == "date") {
      data =
        await client.sql`select created_at, sum(amount) total from transactions where user_id=${user.id} group by created_at`;
    } else {
      data = { rows: [] };
    }
    return data.rows;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}
