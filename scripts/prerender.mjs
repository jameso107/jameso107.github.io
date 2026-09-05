#!/usr/bin/env node
// Static rendering for GitHub Pages.
//
// Runs after `vite build` (see package.json "build"). Steps:
//   1. Compile src/entry-server.jsx with Vite's SSR build into a temp dir.
//   2. For every route — static pages from routeMeta, one page per valid
//      insights article, and the 404 page — render the React tree to HTML,
//      drop it into <div id="root"> of the client build's index.html, and
//      swap the <head> tags (title, description, canonical, og:*, twitter:*,
//      robots). JSON-LD is rendered by <SEO /> inside the tree, so it arrives
//      in the HTML automatically.
//   3. Emit redirect stubs for the legacy /blog/ URLs, sitemap.xml, llms.txt,
//      and copy CNAME.
//
// Nothing here touches src/content/insights/*.md; a malformed article is
// skipped by src/data/insights.js (with a warning) and the build continues.

import { build } from 'vite'
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, copyFileSync, readdirSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrOut = join(root, '.ssr-build')

const escapeAttr = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeXml = escapeAttr

const routeDir = (path) => join(dist, ...path.split('/').filter(Boolean))

function writeRoute(path, html) {
  const dir = routeDir(path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

// ---------------------------------------------------------------------------
// 1. SSR bundle
// ---------------------------------------------------------------------------
if (!existsSync(join(dist, 'index.html'))) {
  console.error('prerender: dist/index.html not found — run `vite build` first')
  process.exit(1)
}

rmSync(ssrOut, { recursive: true, force: true })

let server
try {
  await build({
    root,
    configFile: join(root, 'vite.config.js'),
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: ssrOut,
      emptyOutDir: true,
      minify: false,
      sourcemap: false,
    },
  })
  const entry = readdirSync(ssrOut).find((file) => /^entry-server\.(m?js)$/.test(file))
  if (!entry) throw new Error(`SSR bundle not found in ${ssrOut}`)
  server = await import(pathToFileURL(join(ssrOut, entry)).href)
} catch (err) {
  rmSync(ssrOut, { recursive: true, force: true })
  console.error('prerender: SSR build failed')
  console.error(err)
  process.exit(1)
}

const {
  render,
  SITE_URL,
  BRAND,
  POSITIONING,
  CALENDLY_URL,
  CONTACT_EMAIL,
  DEFAULT_IMAGE,
  NOT_FOUND_META,
  getPrerenderRoutes,
  getLegacyRedirects,
  getAllInsights,
  getSkippedInsights,
  services,
  processSteps,
  renderTitle,
} = server

// ---------------------------------------------------------------------------
// 2. Render routes
// ---------------------------------------------------------------------------
const template = readFileSync(join(dist, 'index.html'), 'utf-8')
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: template is missing an empty <div id="root"></div>')
}

function applyHead(html, head) {
  const title = escapeAttr(head.title)
  const description = escapeAttr(head.description)
  const social = [
    `<link rel="canonical" href="${escapeAttr(head.url)}" />`,
    `<meta property="og:type" content="${escapeAttr(head.ogType || 'website')}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${escapeAttr(head.image)}" />`,
    `<meta property="og:url" content="${escapeAttr(head.url)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(BRAND)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeAttr(head.image)}" />`,
  ]

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
    .replace(
      /<meta name="keywords"[^>]*>/,
      head.keywords ? `<meta name="keywords" content="${escapeAttr(head.keywords)}" />` : '',
    )
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${escapeAttr(head.robots || 'index, follow')}" />`)
    .replace(/<meta name="author"[^>]*>/, `<meta name="author" content="${escapeAttr(BRAND)}" />`)
    .replace('</head>', `  ${social.join('\n  ')}\n</head>`)
}

function renderRoute(path, fallbackMeta) {
  const { html: appHtml, head } = render(path)
  if (!appHtml || !appHtml.trim()) throw new Error(`prerender: ${path} rendered no markup`)
  const resolvedHead = {
    title: head.title || renderTitle(fallbackMeta?.title),
    description: head.description || fallbackMeta?.description || '',
    keywords: head.keywords ?? fallbackMeta?.keywords ?? '',
    image: head.image || DEFAULT_IMAGE,
    url: head.url || fallbackMeta?.canonicalUrl || `${SITE_URL}/`,
    ogType: head.ogType || fallbackMeta?.ogType || 'website',
    robots: head.robots || fallbackMeta?.robots || 'index, follow',
  }
  return applyHead(template, resolvedHead).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

const routes = getPrerenderRoutes()
const written = []
for (const route of routes) {
  const html = renderRoute(route.path, route.meta)
  writeRoute(route.path, html)
  written.push(route.path === '/' ? '/' : `${route.path}/`)
}

// 404.html: GitHub Pages serves this (with a 404 status) for any unknown path.
// It boots the SPA, so client-side routing still works for humans.
writeFileSync(join(dist, '404.html'), renderRoute('/__not_found__', NOT_FOUND_META))

// ---------------------------------------------------------------------------
// 3. Legacy redirect stubs (GitHub Pages cannot send a 301)
// ---------------------------------------------------------------------------
function stubHtml(target) {
  const href = escapeAttr(target)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>This page has moved | ${escapeAttr(BRAND)}</title>
  <meta http-equiv="refresh" content="0;url=${href}" />
  <link rel="canonical" href="${href}" />
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0b1020; color: #e5e7eb; font: 16px/1.6 system-ui, -apple-system, Segoe UI, sans-serif; }
    a { color: #a78bfa; }
  </style>
</head>
<body>
  <p>This page has moved to <a href="${href}">${href}</a>.</p>
</body>
</html>
`
}

const redirects = getLegacyRedirects()
for (const { from, to } of redirects) {
  writeRoute(from, stubHtml(to))
}

// ---------------------------------------------------------------------------
// 4. sitemap.xml — indexable routes only, no lastmod (we have no real value)
// ---------------------------------------------------------------------------
const sitemapUrls = routes
  .filter((route) => route.indexable)
  .map((route) => (route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}/`))

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapUrls.map((loc) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`).join('\n') +
  `\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

// ---------------------------------------------------------------------------
// 5. llms.txt
// ---------------------------------------------------------------------------
const articles = getAllInsights()
const llms = [
  `# ${BRAND}`,
  '',
  `> ${POSITIONING}`,
  '',
  '## What Syzygy does',
  '',
  'Syzygy helps owner-led small and mid-sized businesses find, prototype, and implement the highest-return improvements in how they operate. Engagements start with an audit of how the business actually runs, move to a working prototype of the best opportunity, and end with a production implementation the team is trained to run. AI is where we start, but we recommend whatever produces the result — off-the-shelf software, a process change, an integration, or custom AI.',
  '',
  '## Services',
  '',
  ...services.map(
    (service) =>
      `- ${service.title}${service.length ? ` (${service.length})` : ''}: ${service.description} ${SITE_URL}/pricing/#${service.id}`,
  ),
  '',
  '## How the process works',
  '',
  ...processSteps.map((step, index) => `${index + 1}. ${step.title} (${step.timeline}): ${step.summary}`),
  '',
  `Full description: ${SITE_URL}/process/`,
  '',
  '## Contact',
  '',
  `- Book a 30-minute intro call: ${CALENDLY_URL}`,
  `- Email: ${CONTACT_EMAIL}`,
  `- Website: ${SITE_URL}/`,
  '',
  '## Pages',
  '',
  `- Home: ${SITE_URL}/`,
  `- Process: ${SITE_URL}/process/`,
  `- Services and pricing: ${SITE_URL}/pricing/`,
  `- Team: ${SITE_URL}/team/`,
  `- Careers: ${SITE_URL}/careers/`,
  `- Insights: ${SITE_URL}/insights/`,
  '',
  '## Insights',
  '',
  'Practical frameworks for owners and operators of small and mid-sized businesses — free, and written to be used.',
  '',
  ...(articles.length
    ? articles.map((article) => `- [${article.title}](${SITE_URL}/insights/${article.slug}/): ${article.dek}`)
    : ['- (no articles published yet)']),
  '',
].join('\n')
writeFileSync(join(dist, 'llms.txt'), llms)

// ---------------------------------------------------------------------------
// 6. CNAME for the custom domain
// ---------------------------------------------------------------------------
try {
  copyFileSync(join(root, 'CNAME'), join(dist, 'CNAME'))
} catch (err) {
  console.warn('prerender: could not copy CNAME:', err.message)
}

rmSync(ssrOut, { recursive: true, force: true })

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const skipped = getSkippedInsights()
console.log(`prerender: wrote ${written.length} routes + 404.html`)
written.forEach((path) => console.log(`  ${path}`))
console.log(`prerender: ${redirects.length} legacy redirect stubs`)
redirects.forEach(({ from, to }) => console.log(`  ${from}/ -> ${to}`))
console.log(`prerender: sitemap.xml (${sitemapUrls.length} urls), llms.txt`)
console.log(`prerender: insights accepted ${articles.length}, skipped ${skipped.length}`)
articles.forEach((article) => console.log(`  + ${article.file} (order ${article.order}${article.featured ? ', featured' : ''})`))
skipped.forEach(({ file, problems }) => console.log(`  - ${file}: ${problems.join('; ')}`))
