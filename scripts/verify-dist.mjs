#!/usr/bin/env node
// Post-build checks for dist/ (`npm run verify`). Exits non-zero on any failure.
//
// For every dist/**/index.html (except the legacy /blog/ redirect stubs):
//   - non-empty text inside #root
//   - exactly one <h1>
//   - <title> of 60 characters or fewer
//   - a canonical URL with a trailing slash
//   - an absolute og:image URL whose file exists in dist/
//   - at least one <script type="application/ld+json"> and every block parses
// Plus: sitemap.xml lists every insights article and no /blog/ or
// /case-studies/ URLs; /case-studies/ carries noindex; the /blog/ stubs
// redirect to live pages; llms.txt, robots.txt, CNAME and the favicon exist.

import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, relative, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const SITE_URL = 'https://syzygy.services'

const failures = []
const fail = (file, message) => failures.push(`${file}: ${message}`)

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (entry === 'index.html') out.push(full)
  }
  return out
}

const decode = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")

const textOf = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

if (!existsSync(dist)) {
  console.error('verify: dist/ not found — run `npm run build` first')
  process.exit(1)
}

const pages = walk(dist).sort()
const stubs = pages.filter((file) => relative(dist, file).startsWith('blog/'))
const realPages = pages.filter((file) => !stubs.includes(file))

const rows = []

for (const file of realPages) {
  const rel = relative(dist, file)
  const html = readFileSync(file, 'utf-8')

  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script type="module"|<div id="root">([\s\S]*)<\/div>\s*<\/body>/)
  const rootHtml = rootMatch ? rootMatch[1] ?? rootMatch[2] ?? '' : ''
  const rootText = textOf(rootHtml)
  if (rootText.length < 200) fail(rel, `#root text is too short (${rootText.length} chars)`)

  const h1Count = (html.match(/<h1[\s>]/g) || []).length
  if (h1Count !== 1) fail(rel, `expected exactly one <h1>, found ${h1Count}`)

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/)
  const title = titleMatch ? decode(titleMatch[1]) : ''
  if (!title) fail(rel, 'missing <title>')
  else if (title.length > 60) fail(rel, `<title> is ${title.length} chars: "${title}"`)

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/)
  const canonical = canonicalMatch ? canonicalMatch[1] : ''
  if (!canonical) fail(rel, 'missing canonical')
  else {
    if (!canonical.endsWith('/')) fail(rel, `canonical lacks trailing slash: ${canonical}`)
    if (!canonical.startsWith(`${SITE_URL}/`)) fail(rel, `canonical is not absolute: ${canonical}`)
  }

  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
  const ogImage = ogImageMatch ? ogImageMatch[1] : ''
  if (!ogImage) fail(rel, 'missing og:image')
  else if (!ogImage.startsWith(`${SITE_URL}/`)) fail(rel, `og:image is not absolute: ${ogImage}`)
  else if (!existsSync(join(dist, ogImage.slice(SITE_URL.length + 1)))) fail(rel, `og:image file missing in dist: ${ogImage}`)

  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  if (ldBlocks.length === 0) fail(rel, 'no ld+json block')
  let ldTypes = []
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block)
      const nodes = parsed['@graph'] || [parsed]
      ldTypes.push(...nodes.map((node) => (Array.isArray(node['@type']) ? node['@type'].join('+') : node['@type'])))
    } catch (err) {
      fail(rel, `invalid ld+json: ${err.message}`)
    }
  }

  const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/)
  const robots = robotsMatch ? robotsMatch[1] : ''
  if (rel === 'case-studies/index.html' && !robots.includes('noindex')) fail(rel, 'case-studies must be noindex')
  if (rel !== 'case-studies/index.html' && robots.includes('noindex')) fail(rel, `unexpected noindex: ${robots}`)

  // Legacy blog links must not survive anywhere in the app markup.
  if (/href="\/blog(\/|")/.test(rootHtml)) fail(rel, 'links to legacy /blog/ URL')

  rows.push({
    page: rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`,
    text: rootText.length,
    h1: h1Count,
    title: title.length,
    ld: ldBlocks.length,
    types: ldTypes.join(', '),
  })
}

// Legacy stubs
for (const file of stubs) {
  const rel = relative(dist, file)
  const html = readFileSync(file, 'utf-8')
  const refresh = html.match(/<meta http-equiv="refresh" content="0;url=([^"]+)"/)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)
  const link = html.match(/<a href="([^"]+)"/)
  if (!refresh) fail(rel, 'stub missing meta refresh')
  if (!canonical) fail(rel, 'stub missing canonical')
  if (!link) fail(rel, 'stub missing visible link')
  const targets = new Set([refresh?.[1], canonical?.[1], link?.[1]].filter(Boolean))
  if (targets.size !== 1) fail(rel, `stub targets disagree: ${[...targets].join(' | ')}`)
  const target = [...targets][0]
  if (target) {
    if (!target.startsWith(`${SITE_URL}/insights/`)) fail(rel, `stub does not point at /insights/: ${target}`)
    const targetFile = join(dist, target.slice(SITE_URL.length + 1), 'index.html')
    if (!existsSync(targetFile)) fail(rel, `stub target has no built page: ${target}`)
  }
  rows.push({ page: `/${rel.replace(/index\.html$/, '')}`, text: 0, h1: 0, title: 0, ld: 0, types: `stub -> ${refresh?.[1] ?? '?'}` })
}
if (!stubs.some((file) => relative(dist, file) === 'blog/index.html')) fail('blog/index.html', 'legacy /blog/ stub missing')

// Sitemap
const sitemapPath = join(dist, 'sitemap.xml')
if (!existsSync(sitemapPath)) fail('sitemap.xml', 'missing')
else {
  const sitemap = readFileSync(sitemapPath, 'utf-8')
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (locs.some((loc) => loc.includes('/blog'))) fail('sitemap.xml', 'contains a /blog/ URL')
  if (locs.some((loc) => loc.includes('/case-studies'))) fail('sitemap.xml', 'contains /case-studies/')
  if (locs.some((loc) => !loc.endsWith('/'))) fail('sitemap.xml', 'a URL lacks a trailing slash')
  if (sitemap.includes('<lastmod>')) fail('sitemap.xml', 'contains <lastmod> without a real value source')
  const builtInsights = realPages
    .map((file) => relative(dist, file))
    .filter((rel) => /^insights\/[^/]+\/index\.html$/.test(rel))
    .map((rel) => `${SITE_URL}/${rel.replace(/index\.html$/, '')}`)
  for (const url of builtInsights) {
    if (!locs.includes(url)) fail('sitemap.xml', `missing built article ${url}`)
  }
  for (const loc of locs) {
    const file = join(dist, loc.slice(SITE_URL.length + 1), 'index.html')
    if (!existsSync(file)) fail('sitemap.xml', `lists ${loc} but no built page exists`)
  }
  rows.push({ page: 'sitemap.xml', text: 0, h1: 0, title: 0, ld: 0, types: `${locs.length} urls, ${builtInsights.length} insights` })
}

// Other artifacts
for (const artifact of ['llms.txt', 'robots.txt', 'CNAME', 'favicon.png', 'og-image.png', '404.html']) {
  if (!existsSync(join(dist, artifact))) fail(artifact, 'missing from dist')
}
if (existsSync(join(dist, 'robots.txt')) && !readFileSync(join(dist, 'robots.txt'), 'utf-8').includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  fail('robots.txt', 'does not reference the sitemap')
}
if (existsSync(join(dist, 'llms.txt'))) {
  const llms = readFileSync(join(dist, 'llms.txt'), 'utf-8')
  if (!llms.includes('Syzygy is a consulting firm for small and mid-sized businesses that leads with AI')) fail('llms.txt', 'missing positioning sentence')
  const articleLines = (llms.match(/^- \[.+\]\(https:\/\/syzygy\.services\/insights\/[^)]+\/\)/gm) || []).length
  const builtCount = rows.filter((row) => /^\/insights\/[^/]+\/$/.test(row.page)).length
  if (articleLines !== builtCount) fail('llms.txt', `lists ${articleLines} articles, ${builtCount} built`)
}
if (existsSync(join(dist, '404.html'))) {
  const notFound = readFileSync(join(dist, '404.html'), 'utf-8')
  if (!/<h1[\s>]/.test(notFound)) fail('404.html', 'missing <h1>')
  if (!notFound.includes('noindex')) fail('404.html', 'should be noindex')
}

// Report
const pad = (value, width) => String(value).padEnd(width)
console.log(pad('page', 62) + pad('text', 7) + pad('h1', 4) + pad('title', 7) + pad('ld', 4) + 'schema types')
for (const row of rows) {
  console.log(pad(row.page, 62) + pad(row.text, 7) + pad(row.h1, 4) + pad(row.title, 7) + pad(row.ld, 4) + row.types)
}
console.log('')
if (failures.length) {
  console.log(`verify: ${failures.length} problem(s)`)
  failures.forEach((message) => console.log(`  ✗ ${message}`))
  process.exit(1)
}
console.log(`verify: OK — ${realPages.length} pages, ${stubs.length} redirect stubs, sitemap, llms.txt`)
