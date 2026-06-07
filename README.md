# Financial-App — Meridian Wealth

A marketing/advisory site for a fictional wealth-management firm, built with
**Next.js 15** (App Router, React 19) and **Tailwind CSS v4**.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home / landing page |
| `/about` | About the firm |
| `/services` | Services offered |
| `/blog` | Blog index |
| `/contact` | Contact page with a form |
| `/calculator` | Interactive financial calculator |

Shared UI lives in [`app/components/`](app/components/) (Navbar, Footer, Icon)
and page content is centralized in [`app/lib/content.js`](app/lib/content.js).

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build    # all routes prerender as static
npm start
```

## Deploy on Vercel

This is a standard Next.js app, so Vercel auto-detects the framework — no extra
config required.

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import
   `Darshit45/Financial-App`.
3. Set the **Production Branch** to `develop` (Project → Settings → Git), since
   this app is hosted from `develop`.
4. Keep the defaults — Framework: **Next.js**, Build: `next build`. Click
   **Deploy**.

Every push to `develop` will then trigger a new deployment.
