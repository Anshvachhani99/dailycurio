# Daily Curio: agent notes

Multi-topic content site whose purpose is ad revenue via the **Monetag MultiTag**. No backend, database, or auth. Everything is static content rendered by TanStack Start.

## Architecture

- `content/posts/*.md`: articles (Content Collections). Frontmatter: `title`, `summary`, `date` ('YYYY-MM-DD', quoted), `categories`, `image` (e.g. `img/x.png` → `/img/x.png`), `imageAlt`, optional `slug` (otherwise the filename is used).
- `content-collections.ts` + `src/lib/post-content.ts`: schema, slug resolution, Markdown → sanitized HTML.
- `src/lib/site.ts`: brand name/tagline, contact email, nav topics (`featuredCategories`), topic blurbs, homepage `trendingSlugs`.
- `src/lib/ads.ts`: Monetag config (`multiTagSrc`, `zoneId`, `verificationMeta`). `VITE_MONETAG_*` env vars override it. `__root.tsx` injects the tag only when both src and zone are set.
- `src/lib/blog.ts`: sorting, lookup, `cdnImage()` (Netlify Image CDN URLs), `relatedPosts()`, `readingTime()`.
- `src/routes/`: `index` (landing page), `posts.$slug` (article + Up next + related + topics), `category.$category`, `about`, `contact`, `privacy`, `terms`.
- `src/components/`: `post-card.tsx` (lg/md/sm cards), `topic-grid.tsx`, `static-page.tsx`, `category-links.tsx`.
- `public/img/`: AI-generated cover images. Always render them through `cdnImage(src, width)`, never at full size.

## Conventions and decisions

- Design tokens live in `src/styles.css` under `@theme`: paper/ink/muted/line/accent colors, Fraunces display + Inter body fonts.
- Layout favors pageviews per session (internal linking everywhere), which is what drives impressions with MultiTag. MultiTag places its own formats, so the site has no manual ad slots. Don't add fake "ad" boxes.
- The privacy policy names Monetag and describes cookies and push notifications. Keep it accurate if ad partners change.
- Category names are case-sensitive. Reuse the spelling from `featuredCategories`.
- Don't edit generated `.content-collections/` or `src/routeTree.gen.ts`.
