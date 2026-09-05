import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import markdown from './plugins/markdown.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Static rendering happens after this build, in scripts/prerender.mjs
// (`npm run build` = `vite build && node scripts/prerender.mjs`). That script
// compiles src/entry-server.jsx with `vite build --ssr`, renders every route
// to HTML, and writes dist/<route>/index.html plus sitemap.xml and llms.txt.

export default defineConfig({
  plugins: [markdown(), react()],
  define: {
    // Rendered in the footer. Baked in so the server HTML and the client's
    // first render can never disagree (a live `new Date()` would drift on
    // 1 January until the next deploy and trip hydration).
    __BUILD_YEAR__: JSON.stringify(String(new Date().getFullYear())),
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  base: '/',
  publicDir: 'public',
})
