import { Router } from "express";
import { checkoutController } from "../controllers/checkout";
const router = Router();

router.post('/checkout', checkoutController)

export default router;