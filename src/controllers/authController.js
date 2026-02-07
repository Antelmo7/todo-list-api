import * as authService from '../services/authService.js';

export async function register(req, res) {
  const body = req.body;
  const newUser = await authService.register(body);

  res.status(201).json(newUser);
}

export async function login(req, res) {
  const body = req.body;

  const user = await authService.login(body);
  res.status(201).json(user);
}