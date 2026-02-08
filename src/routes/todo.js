import * as todoController from '../controllers/todoController.js';
import { Router } from "express";

const router = Router();

router.post('/', todoController.create);
router.patch('/:todoId', todoController.update);
router.delete('/:todoId', todoController.deleteTodo);
router.get('/', todoController.getTodos);

export default router;