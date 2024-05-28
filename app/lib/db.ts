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
    const {rows} = await client.sql<{name: string, color: string, total: string}>`select distinct a.name, a.color, case when t.total != 0 then t.total else 0 end total from accounts a left join (select account_id, sum(amount) total from transactions group by account_id) t
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

// Eliminar funciones de debajo
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
        await client.sql`select type, sum(amount) total from transactions where user_id=${user.id} and category != 'transfer' group by type`;
    } else if (groupBy == "account") {
      data =
        await client.sql`select distinct a.*, case when t.total != 0 then t.total else 0 end total from accounts a left join (select account_id, sum(amount) total from transactions group by account_id) t
        on a.id = t.account_id
        where user_id=${user.id} and type='standard' order by total DESC`;
    } else if (groupBy == "user") {
      data =
        await client.sql`select user_id, sum(amount) total from transactions where user_id=${user.id} group by user_id`;
    } else if (groupBy == "date") {
      data =
        await client.sql`select created_at as timestamp, amount from transactions where user_id = ${user.id} order by created_at ASC`;
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

export async function getChartData(chardID: number) {
  if (chardID < 0 || typeof chardID != "number") return [];
  const user = (await getUser()) as User;
  const queries = [
    {
      id: 0,
      query: `select EXTRACT(YEAR FROM created_at) as year, EXTRACT(MONTH FROM created_at) as month, sum(case when type='income' then amount else 0 end) income, sum(case when type='expense' then amount else 0 end) expense from transactions where user_id='${user.id}' and category!='transfer' group by EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at) order by EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)`,
    },
    {
      id: 1,
      query: `select category, sum(amount) total from transactions where user_id='${user.id}' and category !='transfer' group by category`,
    },
    {
      id: 2,
      query: `select created_at, sum(case when type='income' then amount else 0 end) income, sum(case when type='expense' then amount else 0 end) expense from transactions where user_id='${user.id}' group by created_at order by created_at`,
    },
    {
      id: 3,
      query: `select a.name, a.color, sum(t.amount) total from transactions t join accounts a on t.account_id = a.id where t.user_id='${user.id}' group by a.name, a.color`,
    },
  ];

  const client = createClient();
  const query = queries[chardID].query;
  try {
    await client.connect();
    const data = await client.query({
      text: `${query}`,
    });
    return data.rows ?? [];
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await client.end();
  }
}
