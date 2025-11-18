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
        // Copy sitemap.xml and robots.txt to dist folder
        try {
          copyFileSync(join(__dirname, 'public', 'sitemap.xml'), join(__dirname, 'dist', 'sitemap.xml'))
          copyFileSync(join(__dirname, 'public', 'robots.txt'), join(__dirname, 'dist', 'robots.txt'))
        } catch (err) {
          console.warn('Could not copy SEO files:', err.message)
        }
      }
    }
  ],
  base: '/',
  publicDir: 'public',
})

