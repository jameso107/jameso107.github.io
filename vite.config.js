import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { prerenderRoutes, renderTitle, DEFAULT_IMAGE } from './src/data/routeMeta.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Rewrite the built index.html for one route: swap the title/description/keywords
// the template ships with, and add the canonical + social tags that react-helmet
// would otherwise only produce after the JS runs.
function htmlForRoute(template, meta) {
  const title = renderTitle(meta.title)
  const socialTags = [
    `<link rel="canonical" href="${escapeAttr(meta.canonicalUrl)}" />`,
    `<meta property="og:type" content="${escapeAttr(meta.ogType || 'website')}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(DEFAULT_IMAGE)}" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonicalUrl)}" />`,
    `<meta property="og:site_name" content="SYZYGY.services" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(DEFAULT_IMAGE)}" />`,
  ].join('\n  ')

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(
      /<meta name="description"[^>]*\/>/,
      `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    )
    .replace(
      /<meta name="keywords"[^>]*\/>/,
      `<meta name="keywords" content="${escapeAttr(meta.keywords)}" />`,
    )
    .replace('</head>', `  ${socialTags}\n</head>`)
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle() {
        // Copy CNAME file to dist folder for GitHub Pages custom domain
        try {
          copyFileSync(join(__dirname, 'CNAME'), join(__dirname, 'dist', 'CNAME'))
        } catch (err) {
          console.warn('Could not copy CNAME file:', err.message)
        }
        // Copy sitemap.xml and robots.txt to dist folder
        try {
          copyFileSync(join(__dirname, 'public', 'sitemap.xml'), join(__dirname, 'dist', 'sitemap.xml'))
          copyFileSync(join(__dirname, 'public', 'robots.txt'), join(__dirname, 'dist', 'robots.txt'))
        } catch (err) {
          console.warn('Could not copy SEO files:', err.message)
        }
        // Emit a real HTML file per route. Without this, GitHub Pages has no
        // file at /careers, /team, etc. and answers HTTP 404 (serving 404.html,
        // which boots the SPA -- right page for humans, 404 for crawlers).
        // Each file also carries its own title/description/og tags, which social
        // scrapers need because they never run react-helmet.
        try {
          const builtIndex = readFileSync(join(__dirname, 'dist', 'index.html'), 'utf-8')

          for (const { path, meta } of prerenderRoutes) {
            const html = htmlForRoute(builtIndex, meta)
            if (path === '/') {
              writeFileSync(join(__dirname, 'dist', 'index.html'), html)
            } else {
              const dir = join(__dirname, 'dist', ...path.split('/').filter(Boolean))
              mkdirSync(dir, { recursive: true })
              writeFileSync(join(dir, 'index.html'), html)
            }
          }
          console.log(`Prerendered ${prerenderRoutes.length} routes`)

          // 404.html stays the generic fallback for genuinely unknown URLs; it
          // still boots the SPA so client-side routing keeps working.
          writeFileSync(join(__dirname, 'dist', '404.html'), builtIndex)
          console.log('Created 404.html from built index.html')
        } catch (err) {
          console.warn('Could not prerender routes:', err.message)
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  base: '/',
  publicDir: 'public',
})

