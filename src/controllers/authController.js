import * as authService from '../services/authService.js';
import { validateUser } from '../utils/validateUser.js';

export async function register(req, res) {
  const body = req.body;

  if (!validateUser(body)) {
    const error = new Error('Missing fields');
    error.statusCode = 400;

    throw error;
  }

  const newUser = await authService.register(body);

  res.status(201).json(newUser);
}

export async function login(req, res) {
  const body = req.body;

  if (!validateUser(body, ['email', 'password'])) {
    const error = new Error('Missing fields');
    error.statusCode = 400;

    throw error;
  }

  const user = await authService.login(body);
  res.status(201).json(user);
}