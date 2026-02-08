import { Client } from "pg";
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});

await client.connect();

export async function create({
  title,
  description
}) {
  const text = `INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *`;
  const values = [title, description];

  const res = await client.query(text, values);
  const data = res.rows[0];

  return data;
}

export async function update(todoId, {
  title,
  description,
  status
}) {
  const text = `UPDATE todos SET title=$1, description=$2, status=$3 WHERE todoId = $4 RETURNING *`;
  const values = [title, description, status, todoId];

  const res = await client.query(text, values);
  const data = res.rows[0];

  return data;
}