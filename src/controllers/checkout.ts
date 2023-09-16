import { Request, Response } from "express";
import stripe from "../stripe";
import { STRIPE_PRICE_ID } from "../utils/env";

export const checkoutController = async (req: Request, res: Response) => {
    let success = false, msg = '', session;
    try {
        session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: String(STRIPE_PRICE_ID)
                }
            ],
            success_url: 'http://localhost:8080/success?session_id={CHECKOUT_SESSION}',
            cancel_url: 'http://localhost:8080/error'
        })

        if(session) {
            success = true;
        }
    } catch(e) {
        console.log(`Error in checkoutController -> `, e);
        msg = 'Internal server error!'
    } finally {
        res.send(session)
    }
}