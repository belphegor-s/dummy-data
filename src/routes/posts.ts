import { Router } from "express";
import { postsController } from "../controllers/posts";
import { apiAuth } from "../middleware/apiAuth";
const router = Router();

router.get('/posts', apiAuth, postsController)

export default router;