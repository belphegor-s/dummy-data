import { Router } from "express";
import { commentsController } from "../controllers/comments";
import { apiAuth } from "../middleware/apiAuth";
const router = Router();

router.get('/comments', apiAuth, commentsController)

export default router;