# SEO Implementation Guide

## Completed Implementation

### Phase 1: Meta Tags & Social Sharing ✅
- ✅ Comprehensive meta tags added to `index.html`
- ✅ SEO component (`src/components/SEO.jsx`) manages the document head directly
  — react-helmet-async was removed (v2.0.5 is archived upstream and silently
  rendered nothing here, so no route ever emitted a canonical, og tag, or
  JSON-LD block)
- ✅ Page-specific SEO for all routes:
  - Homepage: AI consulting, AI audit, AI implementation
  - Process: AI consulting process, AI strategy development
  - Case Studies: AI case studies, AI success stories
  - Pricing: AI consulting pricing, AI audit cost
  - Team: AI consultants, AI experts
  - Blog / Blog posts: AI aptitude, Midwest small business
- ✅ Unique `<title>` and `og:title` per route (see [Page Titles](#page-titles))
- ✅ Every route prerendered to its own HTML file at build time, so GitHub
  Pages returns **HTTP 200** instead of 404 and social scrapers (which never
  run JS) see the right tags (see [Prerendering](#prerendering))
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ⚠️ **TODO**: Create OG image (1200x630px) and save as `public/og-image.png`

### Phase 2: Structured Data (JSON-LD) ✅
- ✅ Organization schema
- ✅ Website schema with search action
- ✅ Service schemas for all pricing tiers
- ✅ BreadcrumbList schema for all pages
- ✅ Person schema for team members

### Phase 3: Technical SEO ✅
- ✅ sitemap.xml created in `public/` folder
- ✅ robots.txt created in `public/` folder
- ✅ Vite config updated to copy SEO files to dist
- ✅ Canonical URLs implemented via SEO component

### Phase 4: Content Optimization ✅
- ✅ Image alt text improved (Team page)
- ✅ Semantic HTML structure maintained
- ✅ Heading hierarchy verified (H1 on each page)

### Phase 5: Analytics ✅
- ✅ Analytics component created (placeholder)
- ⚠️ **TODO**: Add your tracking ID:
  - For Google Analytics: Set `VITE_GA_MEASUREMENT_ID` environment variable
  - For Plausible: Update domain in `src/components/Analytics.jsx`

## Page Titles

`src/data/routeMeta.js` is the single source of truth for per-route metadata
and owns the brand suffix (`renderTitle`). Each page passes a **bare,
page-specific** `title` and it renders as `` `${title} | SYZYGY.services` ``.
Pages consume it as `<SEO {...routeMeta['/route']} />` — never hardcode a
title in a page, or the prerendered HTML and the runtime tags will disagree.
A page that passes no `title` falls back to the site default,
`SYZYGY.services | AI Consulting for Your Business` (which also lives in
`index.html` as the pre-hydration title).

**Rules for adding or editing a title:**

1. Do **not** include "SYZYGY.services" in the `title` prop — it is appended for you.
2. Keep the prop at **42 characters or fewer** so the rendered title stays under
   the ~60 characters Google shows before truncating (the suffix costs 18).
3. Lead with the target keyword, and keep it unique across routes.

**Current titles** (rendered length in parentheses):

| Route | `<title>` |
| --- | --- |
| `/` | Michigan & Midwest AI Consulting Service \| SYZYGY.services (58) |
| `/process` | Our AI Consulting Process \| SYZYGY.services (43) |
| `/case-studies` | AI Case Studies & Client Success Stories \| SYZYGY.services (58) |
| `/pricing` | AI Consulting Services & Pricing \| SYZYGY.services (50) |
| `/team` | Meet Our AI Consultants \| SYZYGY.services (41) |
| `/blog` | AI Consulting Blog & Insights \| SYZYGY.services (47) |
| `/blog/:slug` | *post `seoTitle`* \| SYZYGY.services |

Blog posts use `post.seoTitle || post.title` from `src/data/blogPosts.js`. On-page
H1 titles are often longer than 42 characters, so add an optional `seoTitle` to a
post when its `title` would overflow the tag.

## Next Steps

1. **Create OG Image**: Design a 1200x630px social sharing image and save as `public/og-image.png`
2. **Set up Analytics**: Choose Google Analytics 4 or Plausible and add tracking code
3. **Submit Sitemap**: Submit `https://syzygy.services/sitemap.xml` to Google Search Console
4. **Monitor Performance**: Track SEO metrics and adjust as needed

## Testing

- Test meta tags: https://www.opengraph.xyz/
- Test structured data: https://search.google.com/test/rich-results
- Verify sitemap: https://syzygy.services/sitemap.xml
- Verify robots.txt: https://syzygy.services/robots.txt

## Key Target Keywords

**Primary**: AI consulting, AI audit, AI implementation, AI strategy
**Secondary**: AI consulting services, AI readiness assessment, AI prototype, AI consulting company
**Long-tail**: AI consulting for manufacturing, AI audit cost, AI implementation services


## Prerendering

GitHub Pages has no SPA rewrite rule. Without a file at `/careers`, it answers
**HTTP 404** and serves `404.html`, which boots the app — the visitor sees the
right page, but every crawler sees a 404, including for URLs listed in
`sitemap.xml`.

The `prerender-routes` step in `vite.config.js` fixes this: after each build it
writes `dist/<route>/index.html` for every entry in `prerenderRoutes`
(`src/data/routeMeta.js`), injecting that route's title, description, keywords,
canonical, and og/twitter tags into the raw HTML. `404.html` stays as the
generic fallback for genuinely unknown URLs.

**Adding a route:** add it to `routeMeta` (or, for a blog post, to
`blogPosts`), point the page at it with `<SEO {...routeMeta['/new-route']} />`,
and add it to `public/sitemap.xml`. The build picks it up automatically —
verify with `npm run build && find dist -name index.html`.
