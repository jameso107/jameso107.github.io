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
      name: 'copy-cname',
      closeBundle() {
        // Copy CNAME file to dist folder for GitHub Pages custom domain
        try {
          copyFileSync(join(__dirname, 'CNAME'), join(__dirname, 'dist', 'CNAME'))
        } catch (err) {
          console.warn('Could not copy CNAME file:', err.message)
        }
      }
    }
  ],
  base: '/',
})

