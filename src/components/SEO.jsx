import { createContext, useContext, useEffect } from 'react'
import {
  SITE_URL,
  BRAND,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_ROBOTS,
  renderTitle,
} from '../data/routeMeta'

// Head management.
//
// Two jobs, two mechanisms:
//
//  1. Structured data is rendered *in the tree* as a
//     <script type="application/ld+json">. That way it is part of the HTML the
//     prerender step writes to disk, it hydrates like any other element, and
//     React swaps it on client-side navigation for free.
//
//  2. Title / meta / canonical live in <head>, outside the React root. On the
//     server the component writes its values into HeadContext, and
//     scripts/prerender.mjs turns them into real tags. In the browser the same
//     values are applied with a small effect so client-side navigation keeps
//     the head correct.

export const HeadContext = createContext(null)

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

// `</script>` inside a JSON string would end the block early; escaping `<`
// keeps the JSON valid and the HTML intact. Arrays become a single @graph.
export function serializeStructuredData(data) {
  if (!data) return ''
  const payload = Array.isArray(data) ? { '@context': 'https://schema.org', '@graph': data } : data
  return JSON.stringify(payload).replace(/</g, '\\u003c')
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  robots,
  structuredData,
}) {
  const head = {
    title: renderTitle(title),
    description: description || DEFAULT_DESCRIPTION,
    keywords: keywords || '',
    image: ogImage || DEFAULT_IMAGE,
    url: canonicalUrl || `${SITE_URL}/`,
    ogType,
    robots: robots || DEFAULT_ROBOTS,
  }

  // Server render: hand the values to the prerender script.
  const collector = useContext(HeadContext)
  if (collector) Object.assign(collector, head)

  useEffect(() => {
    document.title = head.title

    setMeta('name', 'description', head.description)
    setMeta('name', 'keywords', head.keywords)
    setMeta('name', 'robots', head.robots)
    setMeta('name', 'author', BRAND)

    setMeta('property', 'og:type', head.ogType)
    setMeta('property', 'og:title', head.title)
    setMeta('property', 'og:description', head.description)
    setMeta('property', 'og:image', head.image)
    setMeta('property', 'og:url', head.url)
    setMeta('property', 'og:site_name', BRAND)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', head.title)
    setMeta('name', 'twitter:description', head.description)
    setMeta('name', 'twitter:image', head.image)

    const canonical = upsertTag('link[rel="canonical"]', () => {
      const node = document.createElement('link')
      node.setAttribute('rel', 'canonical')
      return node
    })
    canonical.setAttribute('href', head.url)
  }, [head.title, head.description, head.keywords, head.image, head.url, head.ogType, head.robots])

  const json = serializeStructuredData(structuredData)
  if (!json) return null
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
