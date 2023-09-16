import { Router } from "express";
import { albumsController } from "../controllers/albums";
import { apiAuth } from "../middleware/apiAuth";
const router = Router();

router.get('/albums', apiAuth, albumsController)

export default router;