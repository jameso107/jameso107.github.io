import { useEffect } from 'react'
import { SITE_URL, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, renderTitle } from '../data/routeMeta'

// Head management, done by hand.
//
// This used to be react-helmet-async. That package (2.0.5, archived upstream)
// silently renders nothing in this app -- verified with a bare
// <Helmet><title>…</title></Helmet> probe inside HelmetProvider, which never
// reached the DOM. The result was that every route shipped only the static tags
// from index.html: no per-page title, no canonical, no og/twitter tags, and
// none of the JSON-LD structured data these pages carefully build. Replacing it
// with a small effect drops a dead dependency and is trivially verifiable.
//
// The raw HTML for each route is ALSO written at build time (see
// vite.config.js + src/data/routeMeta.js) -- that is what crawlers and social
// scrapers read. This effect keeps the head correct during client-side
// navigation and supplies the structured data.

const MANAGED = 'data-seo-managed'

function upsertTag(selector, create) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    el.setAttribute(MANAGED, '')
    document.head.appendChild(el)
  }
  return el
}

function setMeta(attr, key, content) {
  if (!content) return
  const el = upsertTag(`meta[${attr}="${key}"]`, () => {
    const node = document.createElement('meta')
    node.setAttribute(attr, key)
    return node
  })
  el.setAttribute('content', content)
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  structuredData
}) {
  const fullTitle = renderTitle(title)
  const fullDescription = description || DEFAULT_DESCRIPTION
  const fullImage = ogImage || DEFAULT_IMAGE
  const fullUrl = canonicalUrl || SITE_URL

  // structuredData is a fresh object literal on every render, so it is
  // serialised for the dependency list rather than compared by identity.
  const structuredDataJson = structuredData ? JSON.stringify(structuredData) : ''

  useEffect(() => {
    document.title = fullTitle

    setMeta('name', 'description', fullDescription)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'author', 'SYZYGY.services')

    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', fullDescription)
    setMeta('property', 'og:image', fullImage)
    setMeta('property', 'og:url', fullUrl)
    setMeta('property', 'og:site_name', 'SYZYGY.services')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', fullDescription)
    setMeta('name', 'twitter:image', fullImage)

    const canonical = upsertTag('link[rel="canonical"]', () => {
      const node = document.createElement('link')
      node.setAttribute('rel', 'canonical')
      return node
    })
    canonical.setAttribute('href', fullUrl)

    // Structured data is replaced wholesale per route rather than upserted, so
    // one page's schema can never linger onto the next.
    document.head
      .querySelectorAll(`script[type="application/ld+json"][${MANAGED}]`)
      .forEach((node) => node.remove())

    if (structuredDataJson) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute(MANAGED, '')
      script.textContent = structuredDataJson
      document.head.appendChild(script)
    }
  }, [fullTitle, fullDescription, keywords, fullImage, fullUrl, ogType, structuredDataJson])

  return null
}
