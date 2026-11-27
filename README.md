# Daily Curio

Daily Curio is a multi-topic online magazine (tech, money, health, travel, food, science, lifestyle, entertainment) built to earn money from display advertising with **Adsterra** (banner + native ad units).

The layout is set up to bring in more pageviews per visit, which means more ad impressions: a featured homepage, topic hubs, "Up next" and "You might also like" blocks on every article, and topic grids on every page. It also has the About, Contact, Privacy and Terms pages that ad networks look for when they review a site.

## Tech 

- TanStack Start (React 19) + Vite, deployed on Netlify
- Content Collections: articles are Markdown files in `content/posts/`
- Tailwind CSS v4 + Typography
- Netlify Image CDN for resized WebP cover images

## Adsterra ads

1. Native Banner and 468x60 Banner settings live in `src/lib/ads.ts`.
2. Optional `VITE_ADSTERRA_*` environment variables (`VITE_ADSTERRA_NATIVE_SRC`, `VITE_ADSTERRA_NATIVE_CONTAINER_ID`, `VITE_ADSTERRA_BANNER_KEY`, `VITE_ADSTERRA_BANNER_SRC`) override the defaults.
3. `src/components/adsterra-ad.tsx` renders both ad units on every page via `src/routes/__root.tsx`.

## Adding articles

Add a Markdown file in `content/posts/`:

```md
---
date: '2026-11-25'
title: 'Your headline'
summary: 'One or two sentences shown on cards and in search results.'
categories:
  - Tech
image: img/your-image.png
imageAlt: 'What the image shows'
---

Article body in Markdown…
```

Put images in `public/img/`. Topic names in the main menu are set in `src/lib/site.ts`.

## Run locally

```bash
pnpm install
netlify dev
```

## Ideas for later

- Publish new articles regularly. More good articles bring more search traffic and more impressions.
- Add a sitemap and RSS feed for faster indexing.
- Add a newsletter signup (Netlify Forms) to bring readers back.
