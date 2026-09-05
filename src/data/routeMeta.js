// Single source of truth for site identity and per-route SEO metadata.
//
// Consumers:
//   1. src/components/SEO.jsx      — applies the tags at runtime (client-side
//                                     navigation) and hands them to the server
//                                     renderer via HeadContext
//   2. src/entry-server.jsx        — lists every route the build must emit
//   3. scripts/prerender.mjs       — writes dist/<route>/index.html, sitemap.xml
//                                     and llms.txt from that list
//
// Canonicals carry a trailing slash on purpose: GitHub Pages serves these as
// directory indexes and 301s /careers -> /careers/. Naming the URL that
// actually returns 200 keeps canonical, sitemap, and served URL in agreement.

import { getAllInsights } from './insights'

export const SITE_URL = 'https://syzygy.services'
export const BRAND = 'Syzygy'
export const LEGAL_NAME = 'Syzygy Services'
export const ALTERNATE_NAMES = ['Syzygy Services', 'SYZYGY.services']

// The entity definition. Mirrored verbatim in Organization.description, the
// homepage, /team/, and llms.txt — keep every noun if you edit it.
export const POSITIONING =
  'Syzygy is a consulting firm for small and mid-sized businesses that leads with AI. Based in Michigan, we help owner-led companies across the Midwest and remote clients nationwide find, prototype, and implement the highest-return improvements in how they operate.'

export const CALENDLY_URL = 'https://calendly.com/syzygy-intro/30min'
export const CONTACT_EMAIL = 'james@syzygy.services'
export const LINKEDIN_COMPANY_URL = 'https://www.linkedin.com/company/syzygy-services'

export const DEFAULT_TITLE = `${BRAND} | AI Consulting for Small & Mid-Sized Businesses`
export const DEFAULT_DESCRIPTION =
  'Syzygy is a consulting firm for small and mid-sized businesses that leads with AI. Based in Michigan, serving owner-led companies across the Midwest and remote clients nationwide.'
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`
export const DEFAULT_ROBOTS = 'index, follow'

// Pages pass a bare, page-specific title; the brand suffix is appended once,
// here, so the runtime tags and the prerendered HTML can never disagree.
// Keep the bare title at 50 characters or fewer (the suffix costs 9, and
// Google truncates around 60). Titles that already end in the suffix (article
// seoTitle values) are left alone.
export const renderTitle = (title) => {
  if (!title) return DEFAULT_TITLE
  return title.endsWith(` | ${BRAND}`) ? title : `${title} | ${BRAND}`
}

export const routeMeta = {
  '/': {
    title: 'AI Consulting for Small & Mid-Sized Businesses',
    description: DEFAULT_DESCRIPTION,
    keywords:
      'AI consulting, AI consulting for small business, consulting firm for small and mid-sized businesses, AI consulting Michigan, AI consulting Midwest, AI audit, AI implementation, business process automation, operations consulting, technology strategy',
    canonicalUrl: `${SITE_URL}/`,
  },
  '/process': {
    title: 'Our AI Consulting Process',
    description:
      'How a Syzygy engagement runs: Discovery Audit (2–4 weeks), Design and Prototype (4–6 weeks), Build and Implement (8–12 weeks), then Measure and Improve.',
    keywords:
      'AI consulting process, AI audit process, AI prototype sprint, AI implementation process, AI consulting methodology, Michigan AI consulting, Midwest AI consulting',
    canonicalUrl: `${SITE_URL}/process/`,
  },
  '/case-studies': {
    title: 'AI Case Studies & Client Results',
    description:
      'Anonymized results from Syzygy engagements: faster quoting for manufacturers, a company-wide LLM suite for a 400-employee automotive supplier, and more.',
    keywords:
      'AI case studies, AI consulting results, AI implementation examples, AI ROI, manufacturing AI, Michigan AI consulting, Midwest AI consulting',
    canonicalUrl: `${SITE_URL}/case-studies/`,
    robots: 'noindex, follow',
  },
  '/pricing': {
    title: 'AI Consulting Services & Pricing',
    description:
      'Syzygy services for small and mid-sized businesses: AI Audit & Prototyping, AI Implementation, Ongoing Partnership, and Technology Consulting. Contact for a quote.',
    keywords:
      'AI consulting pricing, AI audit cost, AI implementation cost, AI consulting rates, fractional technology leadership, small business AI consulting, Michigan AI consulting',
    canonicalUrl: `${SITE_URL}/pricing/`,
  },
  '/team': {
    title: 'Meet Our AI Consultants',
    description:
      'Meet the Syzygy team: James Oosterhouse (Founder & CEO), Christian Reinhardt (Director of Research), Hannah TerHaar (Director of Marketing), and our AI engineers.',
    keywords:
      'AI consultants, AI consulting team, AI strategy consultants, AI implementation experts, Michigan AI consultants, Midwest AI consultants, University of Michigan',
    canonicalUrl: `${SITE_URL}/team/`,
  },
  '/careers': {
    title: 'Careers in AI Consulting',
    description:
      "Join Syzygy. We're looking for driven people who want to solve real business problems with AI and other emerging technologies. Michigan-based, remote-friendly.",
    keywords:
      'AI consulting jobs, AI careers Michigan, AI internship, AI engineer jobs, Ann Arbor AI jobs, AI consulting careers, work in AI',
    canonicalUrl: `${SITE_URL}/careers/`,
  },
  '/insights': {
    title: 'Insights for Small & Mid-Sized Businesses',
    description:
      'Practical frameworks for owners and operators of small and mid-sized businesses on AI, operations, and technology decisions. Free, and written to be used.',
    keywords:
      'AI for small business, AI strategy, business process automation, operations improvement, technology decisions, small business consulting insights, Midwest business',
    canonicalUrl: `${SITE_URL}/insights/`,
  },
}

export const insightPath = (slug) => `/insights/${slug}`
export const insightUrl = (slug) => `${SITE_URL}/insights/${slug}/`

export const insightMeta = (article) => ({
  title: article.seoTitle || article.title,
  description: article.description,
  keywords: article.keywords.join(', '),
  canonicalUrl: insightUrl(article.slug),
  ogType: 'article',
})

export const NOT_FOUND_META = {
  title: 'Page Not Found',
  description: 'That page does not exist. Head back to the Syzygy homepage or browse our insights.',
  keywords: '',
  canonicalUrl: `${SITE_URL}/`,
  robots: 'noindex, follow',
}

// Every route the build should emit as a real HTML file. `indexable` controls
// sitemap membership; `stub` routes are the legacy redirect pages.
export const getPrerenderRoutes = () => [
  ...Object.entries(routeMeta).map(([path, meta]) => ({
    path,
    meta,
    indexable: !(meta.robots || '').includes('noindex'),
  })),
  ...getAllInsights().map((article) => ({
    path: insightPath(article.slug),
    meta: insightMeta(article),
    indexable: true,
    article,
  })),
]

// Old blog URLs -> new insights URLs. GitHub Pages cannot 301, so the build
// emits an HTML stub with a meta refresh + canonical at each of these paths.
// Only URLs that were ever live under /blog/ belong here.
const LEGACY_BLOG_SLUGS = ['harnessing-ai-aptitude-midwest-small-business']

export const getLegacyRedirects = () => {
  const live = new Set(getAllInsights().map((article) => article.slug))
  return [
    { from: '/blog', to: `${SITE_URL}/insights/` },
    ...LEGACY_BLOG_SLUGS.map((slug) => ({
      from: `/blog/${slug}`,
      // If the migrated article is ever missing from a build, land on the index
      // rather than on a 404.
      to: live.has(slug) ? insightUrl(slug) : `${SITE_URL}/insights/`,
    })),
  ]
}
