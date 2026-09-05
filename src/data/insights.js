// Insights content loader.
//
// Every Markdown file in src/content/insights/ is compiled at build time by
// plugins/markdown.js and pulled in here with an eager glob, so the article
// list is identical in the SSR build, the prerender step, and the client
// bundle. Adding an article is dropping a .md file into that folder.
//
// Files are validated against the content contract. A file missing required
// fields (or one that failed to parse — the writer may still be mid-save) is
// skipped with a console.warn naming the file and the missing fields. The
// build never fails because of a bad article.

const modules = import.meta.glob('../content/insights/*.md', { eager: true })

export const REQUIRED_FIELDS = [
  'title',
  'seoTitle',
  'slug',
  'dek',
  'description',
  'category',
  'author',
  'order',
  'keyTakeaways',
  'cta',
]

export const AUTHORS = {
  'james-oosterhouse': {
    id: 'james-oosterhouse',
    name: 'James Oosterhouse',
    role: 'Founder & CEO, Syzygy',
    jobTitle: 'Founder & CEO',
    image: '/james.jpg',
    linkedin: 'https://www.linkedin.com/in/james-oosterhouse/',
  },
}

const WORDS_PER_MINUTE = 225
const MIN_READING_MINUTES = 3

export const readingTime = (wordCount) =>
  Math.max(MIN_READING_MINUTES, Math.round((wordCount || 0) / WORDS_PER_MINUTE))

const isFilled = (value) => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

// Warn at build time (SSR/prerender) and in dev; stay quiet in a visitor's console.
const shouldWarn = () => {
  try {
    return Boolean(import.meta.env?.SSR || import.meta.env?.DEV)
  } catch {
    return true
  }
}

function validate(article) {
  const { frontmatter: fm, file, error } = article
  const problems = []
  if (error) problems.push(`could not parse (${error})`)
  const missing = REQUIRED_FIELDS.filter((field) => !isFilled(fm[field]))
  if (missing.length) problems.push(`missing: ${missing.join(', ')}`)
  if (isFilled(fm.cta) && (!isFilled(fm.cta.heading) || !isFilled(fm.cta.body))) {
    problems.push('cta needs heading and body')
  }
  if (isFilled(fm.author) && !AUTHORS[fm.author]) problems.push(`unknown author "${fm.author}"`)
  if (isFilled(fm.slug) && `${fm.slug}.md` !== file) {
    // Not fatal: the URL follows the frontmatter slug; flag the drift.
    if (shouldWarn()) console.warn(`[insights] ${file}: slug "${fm.slug}" does not match filename`)
  }
  return problems
}

function normalise(article) {
  const fm = article.frontmatter
  const author = AUTHORS[fm.author]
  return {
    slug: String(fm.slug).trim(),
    title: fm.title,
    seoTitle: fm.seoTitle,
    dek: fm.dek,
    description: fm.description,
    category: fm.category,
    keywords: Array.isArray(fm.keywords) ? fm.keywords.map(String) : [],
    author,
    order: Number(fm.order),
    featured: fm.featured === true,
    keyTakeaways: Array.isArray(fm.keyTakeaways) ? fm.keyTakeaways.map(String) : [],
    faq: Array.isArray(fm.faq)
      ? fm.faq.filter((item) => item && isFilled(item.q) && isFilled(item.a)).map((item) => ({ q: String(item.q), a: String(item.a) }))
      : [],
    cta: {
      service: fm.cta.service || 'audit',
      heading: fm.cta.heading,
      body: fm.cta.body,
    },
    related: Array.isArray(fm.related) ? fm.related.map(String) : [],
    html: article.html,
    wordCount: article.wordCount,
    readingMinutes: readingTime(article.wordCount),
    file: article.file,
  }
}

function load() {
  const accepted = []
  const skipped = []
  for (const [path, mod] of Object.entries(modules)) {
    const article = mod?.default ?? mod
    const file = article?.file || path.split('/').pop()
    const problems = validate({ ...article, file })
    if (problems.length) {
      skipped.push({ file, problems })
      if (shouldWarn()) console.warn(`[insights] skipping ${file}: ${problems.join('; ')}`)
      continue
    }
    accepted.push(normalise({ ...article, file }))
  }

  // Curated order via frontmatter `order`; ties fall back to title.
  accepted.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

  // Duplicate slugs keep the first (lowest order) entry.
  const seen = new Set()
  const unique = accepted.filter((article) => {
    if (seen.has(article.slug)) {
      skipped.push({ file: article.file, problems: [`duplicate slug "${article.slug}"`] })
      if (shouldWarn()) console.warn(`[insights] skipping ${article.file}: duplicate slug "${article.slug}"`)
      return false
    }
    seen.add(article.slug)
    return true
  })

  return { articles: unique, skipped }
}

const { articles, skipped } = load()

export const getAllInsights = () => articles
export const getSkippedInsights = () => skipped
export const getInsight = (slug) => articles.find((article) => article.slug === slug) || null
export const getFeatured = () => articles.find((article) => article.featured) || articles[0] || null

// Curated `related` first, then same-category articles, never the article itself.
export function getRelated(slug, limit = 3) {
  const current = getInsight(slug)
  if (!current) return []
  const picked = []
  const push = (article) => {
    if (article && article.slug !== slug && !picked.includes(article)) picked.push(article)
  }
  current.related.forEach((relatedSlug) => push(getInsight(relatedSlug)))
  if (picked.length < limit) {
    articles.filter((article) => article.category === current.category).forEach(push)
  }
  if (picked.length < limit) articles.forEach(push)
  return picked.slice(0, limit)
}

export const getCategories = () => [...new Set(articles.map((article) => article.category))]
