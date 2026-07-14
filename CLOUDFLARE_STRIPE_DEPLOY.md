# beloved-med Cloudflare + Stripe deployment

## Cloudflare Workers & Pages

Cloudflare may show Pages and Workers as one combined product. Use the Worker setup screen if Pages is not shown separately.

1. Cloudflare Dashboard > Workers & Pages > Create application.
2. Connect GitHub repository: `ukdscheon-coder/beloved-med`.
3. Project name: `beloved-med`.
4. Deploy command:

```text
npx wrangler deploy
```

The `wrangler.toml` file runs `npm run build` first, serves static files from `dist`, and routes `/api/create-checkout-session` through the Worker.

## Stripe

1. Stripe Dashboard > Product catalog > Add product.
2. Create a recurring monthly price for beloved-med Premium.
3. Copy the Price ID. It starts with `price_`.

## Cloudflare environment variables

Set these in Cloudflare Pages > Settings > Environment variables:

```text
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_...
SITE_URL=https://your-cloudflare-workers-domain.workers.dev
STRIPE_MODE=subscription
STRIPE_ALLOW_PROMOTION_CODES=true
```

Use Stripe test keys first:

```text
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_test_or_test_price_id
```

Do not put `STRIPE_SECRET_KEY` in frontend JavaScript, GitHub, or README.

## iPhone check

Open the Cloudflare Pages URL in Safari, then use Share > Add to Home Screen.
