import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Every route ships prerendered HTML, so the normal path is hydration. The
// empty-container branch covers 404.html and `vite dev`, where there is no
// server markup to attach to.
if (container.hasChildNodes()) {
  hydrateRoot(container, app, {
    onRecoverableError(error) {
      // Surface hydration mismatches where a build check can read them.
      ;(window.__hydrationErrors ||= []).push(String(error?.message || error))
      console.error(error)
    },
  })
} else {
  createRoot(container).render(app)
}
