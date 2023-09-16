import { Router } from "express";
import { usageController } from "../controllers/usage";
const router = Router();

router.get('/usage/:customer', usageController);

export default router;