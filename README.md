# beloved-med

`beloved-med` is a multilingual medication assistant for Korean, English, Spanish, and Japanese users.

It includes:

- Medicine package and prescription capture flow
- Three failed recognition attempts before manual entry
- Drug search by product, ingredient, manufacturer, imprint, shape, color, NDC, barcode, or QR text
- Medication schedules, persistent reminders, and confirmation logging
- Guardian notification draft by SMS link
- Flower garden adherence rewards and photo contest mock flow
- Offline-first local storage with openFDA, NHS, EMA, and Druglist-ready data boundaries

## Run

```bash
npm install
npm run dev
```

For a quick local check without installing packages:

```bash
npx vite --host 127.0.0.1
```

## Deploy

This folder can be connected directly to Vercel. The app is static, and `api/recognize.js` is a small serverless recognition stub for Replit/Vercel expansion.

## Important

This app is not a clinical decision system. It must not replace professional medical advice, pharmacist review, prescribing information, or emergency care.
