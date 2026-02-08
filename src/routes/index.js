import authRouter from './auth.js';
import todoRouter from './todo.js';
import authenticate from '../middlewares/authenticate.js';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/todos', authenticate, todoRouter);

export default router;