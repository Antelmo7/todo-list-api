import * as todoController from '../controllers/todoController.js';
import { Router } from "express";

const router = Router();

router.post('/', todoController.create);
router.patch('/:todoId', todoController.update);

export default router;