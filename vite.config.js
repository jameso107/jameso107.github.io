import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
        // Copy sitemap.xml, robots.txt, and 404.html to dist folder
        try {
          copyFileSync(join(__dirname, 'public', 'sitemap.xml'), join(__dirname, 'dist', 'sitemap.xml'))
          copyFileSync(join(__dirname, 'public', 'robots.txt'), join(__dirname, 'dist', 'robots.txt'))
          copyFileSync(join(__dirname, 'public', '404.html'), join(__dirname, 'dist', '404.html'))
        } catch (err) {
          console.warn('Could not copy SEO files:', err.message)
        }
      }
    }
  ],
  base: '/',
  publicDir: 'public',
})

