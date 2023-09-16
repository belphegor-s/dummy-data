import { Request, Response } from "express";
import stripe from "../stripe";

export const usageController = async (req: Request, res: Response) => {
    const customerId = (req.params?.customer && typeof req.params?.customer === 'string' && String(req.params?.customer)) || '';

    const invoice = await stripe.invoices.retrieveUpcoming({
        customer: customerId,
    });

    res.send(invoice);
}