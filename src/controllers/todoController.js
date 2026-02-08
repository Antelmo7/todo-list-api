import * as todoService from '../services/todoService.js';
import validateTodo from "../utils/validateTodo.js";

export async function create(req, res) {
  const body = req.body;
  const { userId } = req.user;

  if (!validateTodo(body)) {
    const error = new Error('Missing fields');
    error.statusCode = 400;

    throw error;
  }

  const newTodo = await todoService.create(body, userId);

  res.status(201).json(newTodo);
}

export async function update(req, res) {
  const { todoId } = req.params;
  const { userId } = req.user;
  const body = req.body;

  const updatedTodo = await todoService.update(todoId, userId, body);

  res.status(201).json(updatedTodo);
}

export async function deleteTodo(req, res) {
  const { todoId } = req.params;
  const { userId } = req.user;

  await todoService.deleteTodo(todoId, userId);

  res.status(204).json({
    message: `Post with ID: ${todoId} deleted successfully`
  });
}

export async function getTodos(req, res) {
  const { userId } = req.user;

  const todos = await todoService.getTodos(userId);

  res.status(200).json(todos);
}