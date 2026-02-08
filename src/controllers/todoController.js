import * as todoService from '../services/todoService.js';
import validateTodo from "../utils/validateTodo.js";

export async function create(req, res) {
  const body = req.body;

  if (!validateTodo(body)) {
    const error = new Error('Missing fields');
    error.statusCode = 400;

    throw error;
  }

  const newTodo = await todoService.create(body);

  res.status(201).json(newTodo);
}

export async function update(req, res) {
  const { todoId } = req.params;
  const body = req.body;

  const updatedTodo = await todoService.update(todoId, body);

  res.status(201).json(updatedTodo);
}