import { Router } from "express";
import { stripeWebhookController } from "../../controllers/stripe";
const router = Router();

router.post('/webhook', stripeWebhookController) 

export default router;