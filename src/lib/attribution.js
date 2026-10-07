// First-touch attribution for the project form.
//
// The first time someone lands on the site we remember where they came from:
// the page they landed on, the referring site (only if it is another site),
// and any utm_* tags on the URL. The project form sends that along with the
// message, so Homebase can tell which pages, searches and campaigns bring in
// work. Nothing leaves the browser until the person submits the form.
//
// localStorage, not a cookie: no request carries it, and it is never shared
// with a third party.

const KEY = 'syzygy_first_touch'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

function read() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function captureFirstTouch() {
  if (typeof window === 'undefined') return
  if (read()) return
  try {
    const url = new URL(window.location.href)
    const touch = { landing_page: url.pathname, at: new Date().toISOString() }
    for (const key of UTM_KEYS) {
      const value = url.searchParams.get(key)
      if (value) touch[key] = value.slice(0, 200)
    }
    if (document.referrer) {
      const ref = new URL(document.referrer)
      if (ref.host !== url.host) touch.referrer = `${ref.origin}${ref.pathname}`.slice(0, 600)
    }
    window.localStorage.setItem(KEY, JSON.stringify(touch))
  } catch {
    // Private browsing or storage blocked: the form still works without it.
  }
}

export function firstTouch() {
  if (typeof window === 'undefined') return {}
  const touch = read() || {}
  const out = {}
  for (const key of ['landing_page', 'referrer', ...UTM_KEYS]) {
    if (typeof touch[key] === 'string' && touch[key]) out[key] = touch[key]
  }
  return out
}
