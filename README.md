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
- Consultation requests post to `app/api/consultation/route.js`, which currently logs them;
  connect an email or CRM service there before launch.
- Contact details (phone, email) are placeholders — replace before launch.
