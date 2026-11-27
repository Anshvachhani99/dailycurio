# Daily Curio

Daily Curio is a multi-topic online magazine (tech, money, health, travel, food, science, lifestyle, entertainment) built to earn money from display advertising with the **Monetag MultiTag** (all-in-one ad tag).

The layout is set up to bring in more pageviews per visit, which means more ad impressions: a featured homepage, topic hubs, "Up next" and "You might also like" blocks on every article, and topic grids on every page. It also has the About, Contact, Privacy and Terms pages that ad networks look for when they review a site.

## Tech

- TanStack Start (React 19) + Vite, deployed on Netlify
- Content Collections: articles are Markdown files in `content/posts/`
- Tailwind CSS v4 + Typography
- Netlify Image CDN for resized WebP cover images

## Turning on Monetag ads

1. Sign up at Monetag as a publisher and add your site's URL.
2. Create a **MultiTag** zone and copy its code. It looks like
   `<script src="https://XXXX.com/88/tag.min.js" data-zone="123456" async data-cfasync="false"></script>`
3. Open `src/lib/ads.ts` and paste the `src` value into `multiTagSrc` and the `data-zone` value into `zoneId`.
   You can set the environment variables `VITE_MONETAG_MULTITAG_SRC` and `VITE_MONETAG_ZONE_ID` instead, then redeploy.
4. **Site verification:** if Monetag gives you a meta tag, paste its `content` value into `verificationMeta` (or `VITE_MONETAG_VERIFICATION`). If it gives you a file such as `sw.js`, put it in `public/` unchanged so it is served from the site root.
5. **Direct Link:** paste your Monetag Direct Link URL into `directLink` (or `VITE_MONETAG_DIRECT_LINK`). It shows up as "Sponsored" links in the header and after every article. Leave it empty to hide them.

The tag only loads when both `multiTagSrc` and `zoneId` are set.

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
