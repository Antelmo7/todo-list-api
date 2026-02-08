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
}, userId) {
  const text = `INSERT INTO todos (title, description, userId) VALUES ($1, $2, $3) RETURNING *`;
  const values = [title, description, userId];

  const res = await client.query(text, values);
  const data = res.rows[0];

  return data;
}

export async function update(todoId, userId, {
  title,
  description,
  status
}) {
  const queryToValidate = `SELECT * FROM todos WHERE todoId = $1`;
  const resToValidate = await client.query(queryToValidate, [todoId]);
  const todoToValidate = resToValidate.rows[0];

  if (resToValidate.rowCount === 0) {
    const error = new Error('Todo not found');
    error.statusCode = 404;

    throw error;
  }

  if (!(todoToValidate.userid === userId)) {
    const error = new Error('Forbidden');
    error.statusCode = 403;

    throw error;
  }

  const text = `UPDATE todos SET title=$1, description=$2, status=$3 WHERE todoId = $4 RETURNING *`;
  const values = [title, description, status, todoId];

  const res = await client.query(text, values);
  const data = res.rows[0];

  return data;
}