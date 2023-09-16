import { Router } from "express";
import { todosController } from "../controllers/todos";
import { apiAuth } from "../middleware/apiAuth";
const router = Router();

router.get('/todos', apiAuth, todosController)

export default router;