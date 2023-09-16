import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../utils/env";

const stripe = new Stripe(String(STRIPE_SECRET_KEY), {
    apiVersion: '2023-08-16'
})

export default stripe;