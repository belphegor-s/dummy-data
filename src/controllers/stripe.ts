import { Request, Response } from "express";
import { WEBHOOK_SECRET } from "../utils/env";
import stripe from "../stripe";
import generateAPIKey from "../utils/generateAPIKey";
import fs from "fs";
import { apiKeys, customers } from "../utils/dbAccess";
import { customersCollectionPath, apiKeysCollectionPath } from "../utils/dbPaths";

export const stripeWebhookController = async (req: Request, res: Response) => {
    let data;
    let eventType;

    if(WEBHOOK_SECRET) {
        let event;
        let signature = req.headers['stripe-signature'] || '';

        try {
            if (!req.rawBody) {
                console.log('⚠️ Webhook signature verification failed: rawBody is undefined.');
                return res.sendStatus(400);
            }
            
            event = stripe.webhooks.constructEvent(req['rawBody'], signature, WEBHOOK_SECRET);
        } catch (e) {
            console.log(`⚠️ Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case 'checkout.session.completed':
            // Data included in the event object:
            const customerId = data.object.customer;
            const subscriptionId = data.object.subscription;

            console.log(`💰 Customer ${customerId} subscribed to plan ${subscriptionId}`);

            // Get the subscription. The first item is the plan the user subscribed to.
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const itemId = subscription.items.data[0].id;

            // Generate API key
            const apiKeyData = generateAPIKey();
            const apiKey = apiKeyData?.apiKey ?? '';
            const hashedAPIKey = apiKeyData?.hashedAPIKey ?? ''
            console.log(`User's API Key: ${apiKey}`);
            console.log(`Hashed API Key: ${hashedAPIKey}`);

            // Store the API key in your database.
            customers[customerId] = { apikey: hashedAPIKey, itemId, active: true};
            apiKeys[hashedAPIKey] = customerId;

            fs.writeFileSync(customersCollectionPath, JSON.stringify(customers, null, 4));
            fs.writeFileSync(apiKeysCollectionPath, JSON.stringify(apiKeys, null, 4));
            break;
        case 'invoice.paid':
            break;
        case 'invoice.payment_failed':
            break;
        default:
            // Unhandled event type
    }

    res.sendStatus(200);
}