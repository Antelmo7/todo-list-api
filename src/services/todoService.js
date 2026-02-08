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

export async function deleteTodo(todoId, userId) {
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

  const text = `DELETE FROM todos WHERE todoId = $1`;
  const values = [todoId];

  await client.query(text, values);
}

export async function getTodos(userId, limit = 10, page = 1) {
  const offset = (page - 1) * limit; // items to skip

  const text = `SELECT * FROM todos WHERE userId = $1 LIMIT $2 OFFSET $3`;
  const res = await client.query(text, [userId, limit, offset]);

  const countText = `SELECT * FROM todos WHERE userId = $1`;
  const countRes = await client.query(countText, [userId]);

  const todos = res.rows;
  const totalPages = Math.ceil(countRes.rowCount / limit); // nearest max number
  return {
    data: todos,
    page,
    pageItems: res.rowCount,
    totalItems: countRes.rowCount,
    totalPages
  };
}