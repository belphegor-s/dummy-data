import { Router } from "express";
import { photosController } from "../controllers/photos";
import { apiAuth } from "../middleware/apiAuth";
const router = Router();

router.get('/photos', apiAuth, photosController);

export default router;