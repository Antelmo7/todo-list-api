import authRouter from './auth.js';
import todoRouter from './todo.js';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/todos', todoRouter);

export default router;