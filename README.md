# APEX REVENUE SOLUTIONS — Website

Marketing site for APEX REVENUE SOLUTIONS, built with Next.js (App Router).

## Develop

```bash
npm install
npm run dev
```

## Content

- Site copy, services, FAQs, contact details, image URLs and video URLs live in `lib/data.js`.
- Videos are free Mixkit stock clips (Mixkit License: free for commercial use, no attribution required).
- Brand assets are in `public/brand/`.
- Consultation requests post to `app/api/consultation/route.js`, which emails them to
  `team@apexrevsolutions.com` through [Resend](https://resend.com) with the visitor as Reply-To.
  Set these Vercel environment variables:
  - `RESEND_API_KEY` (required to send; without it requests are only logged)
  - `CONTACT_FROM_EMAIL` (optional, default `APEX Website <website@apexrevsolutions.com>`;
    the domain must be verified in Resend)
  - `CONTACT_TO_EMAIL` (optional, default `team@apexrevsolutions.com`)
