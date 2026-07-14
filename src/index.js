const STRIPE_CHECKOUT_URL = "https://api.stripe.com/v1/checkout/sessions";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function appendForm(form, key, value) {
  if (value !== undefined && value !== null && value !== "") form.append(key, String(value));
}

async function createCheckoutSession(request, env) {
  const secretKey = env.STRIPE_SECRET_KEY;
  const priceId = env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId) {
    return json({ error: "Stripe is not configured." }, 500);
  }

  let payload = {};
  try {
    payload = await request.json();
  } catch {}

  const requestUrl = new URL(request.url);
  const configuredSiteUrl = String(env.SITE_URL || "").replace(/\/$/, "");
  const siteUrl = configuredSiteUrl || requestUrl.origin;
  const mode = env.STRIPE_MODE || "subscription";
  const locale = ["auto", "ko", "en", "es", "ja"].includes(payload.locale) ? payload.locale : "auto";

  const form = new URLSearchParams();
  appendForm(form, "mode", mode);
  appendForm(form, "line_items[0][price]", priceId);
  appendForm(form, "line_items[0][quantity]", "1");
  appendForm(form, "success_url", `${siteUrl}/?checkout=success`);
  appendForm(form, "cancel_url", `${siteUrl}/?checkout=cancel`);
  appendForm(form, "locale", locale);
  appendForm(form, "allow_promotion_codes", env.STRIPE_ALLOW_PROMOTION_CODES || "true");
  appendForm(form, "metadata[app]", "beloved-med");

  const stripeResponse = await fetch(STRIPE_CHECKOUT_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${secretKey}`,
      "content-type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  const stripePayload = await stripeResponse.json();
  if (!stripeResponse.ok) {
    return json({ error: stripePayload.error?.message || "Could not create Stripe Checkout session." }, 502);
  }

  return json({ url: stripePayload.url });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/create-checkout-session") {
      if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
      return createCheckoutSession(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};
