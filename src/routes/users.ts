import { Router } from "express";
import { usersController } from "../controllers/users";
import { apiAuth } from "../middleware/apiAuth";
const router = Router();

router.get('/users', apiAuth, usersController)

export default router;