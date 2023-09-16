# Dummy Data API (Metered Billing via Stripe)

- This is a dummy data API that requires an API key in order to use it.
- The user can pay for the API via **Stripe Checkout** by hitting the route: `/api/v1/billing/checkout` and getting a JSON response object having a url property that leads to Stripe Checkout.
- After adding your card and successfull payment verification the Stripe server calls a webhook endpoint: `/api/v1/billing/webhook`, that verifies the checkout session and generate an API key (hashed and plain) and log it on the console along with saving it in a basic JSON database.

**Note:** The database used in the project is a bair-bones very basic JSON file (one for mapping Hashed API keys to respective customer IDs and another one in which customer ID is mapped to object containing data like - Hashed API Key, Item ID of subscribed product, is Subscription active and other details)

e.g.
```bash
root
└── database
    ├── apiKeys.json
    └── customers.json
```

`apiKeys.json`:
```json
{
    "hashed_api_key": "cus_customer_id"
}
```

`customers.json`:
```json
{
    "cus_id": {
        "apikey": "hashed_api_key",
        "itemId": "si_item_id",
        "active": true
    }
}
```