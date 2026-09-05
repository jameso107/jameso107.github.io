// Server entry, consumed only by scripts/prerender.mjs.
//
// `vite build --ssr src/entry-server.jsx` compiles this (and everything it
// imports, Markdown articles included) into a Node module. The prerender
// script imports it, calls render() once per route, and writes the result
// into dist/<route>/index.html.

import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { HeadContext } from './components/SEO'

export function render(url) {
  const head = {}
  const html = renderToString(
    <HeadContext.Provider value={head}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HeadContext.Provider>,
  )
  return { html, head }
}

export {
  SITE_URL,
  BRAND,
  POSITIONING,
  CALENDLY_URL,
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  PHONE_INTERNATIONAL,
  DEFAULT_IMAGE,
  NOT_FOUND_META,
  routeMeta,
  getPrerenderRoutes,
  getLegacyRedirects,
  renderTitle,
} from './data/routeMeta'
export { getAllInsights, getSkippedInsights } from './data/insights'
export { services, processSteps, PRICING_MODEL } from './data/services'
