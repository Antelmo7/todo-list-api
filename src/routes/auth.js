import * as authController from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;