// Single source of truth for per-route SEO metadata.
//
// Two consumers read this file:
//   1. src/components/SEO.jsx  — renders the tags at runtime via react-helmet
//   2. vite.config.js          — writes a real HTML file per route at build time
//
// That second consumer is why this file is plain ESM with no JSX: it has to be
// importable from Node during the build. Keep it that way.
//
// Why prerender at all: GitHub Pages has no SPA rewrite, so any path without a
// matching file returns HTTP 404 (serving 404.html, which boots the app — the
// visitor sees the right page, but crawlers see a 404). Emitting
// dist/<route>/index.html gives every route a real 200. It also puts the right
// title/description in the *raw* HTML, which matters because social scrapers
// (LinkedIn, Slack, Facebook) never run the JS that react-helmet needs.

import { blogPosts } from './blogPosts'

export const SITE_URL = 'https://syzygy.services'
export const BRAND = 'SYZYGY.services'

export const DEFAULT_TITLE = `${BRAND} | AI Consulting for Your Business`
export const DEFAULT_DESCRIPTION =
  'AI consulting service for small businesses in Michigan and the Midwest. SYZYGY.services provides AI consulting, AI audits, and AI implementation services. We align AI, people, and your business to build solutions that actually work.'
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

// Pages pass a bare, page-specific title; the brand suffix is appended once,
// here, so the runtime tags and the prerendered HTML can never disagree.
// Keep the bare title at 42 characters or fewer (the suffix costs 18, and
// Google truncates around 60).
export const renderTitle = (title) => (title ? `${title} | ${BRAND}` : DEFAULT_TITLE)

const BLOG_POST_KEYWORDS =
  'AI aptitude, Midwest small business, midsized business AI, AI consulting service, Michigan AI consulting, small business AI, AI for small business, Midwest AI consulting'

export const routeMeta = {
  '/': {
    title: 'Michigan & Midwest AI Consulting Service',
    description: DEFAULT_DESCRIPTION,
    keywords:
      'AI consulting service, AI consulting services, AI consulting, AI consulting company, AI consulting Michigan, AI consulting Midwest, AI consulting small business, Michigan AI consulting, Midwest AI consulting, AI audit, AI implementation, AI strategy',
    canonicalUrl: SITE_URL,
  },
  '/process': {
    title: 'Our AI Consulting Process',
    description:
      'Our proven AI consulting process: Discovery, AI Audit, Prototype Sprint, Implementation, and Ongoing Partnership. See how we deliver AI solutions that work for Michigan and Midwest small businesses.',
    keywords:
      'AI consulting process, AI implementation process, AI audit process, AI consulting methodology, AI strategy process, Michigan AI consulting, Midwest AI consulting',
    canonicalUrl: `${SITE_URL}/process`,
  },
  '/case-studies': {
    title: 'AI Case Studies & Client Success Stories',
    description:
      'See real AI consulting service results for Michigan and Midwest small businesses: Manufacturing quoting automation, document analysis, and retail operations automation. Real clients, real impact with SYZYGY.services.',
    keywords:
      'AI case studies, AI success stories, AI consulting results, AI consulting service results, AI implementation examples, AI ROI case studies, Michigan AI consulting, Midwest AI consulting',
    canonicalUrl: `${SITE_URL}/case-studies`,
  },
  '/pricing': {
    title: 'AI Consulting Services & Pricing',
    description:
      'AI consulting services for small businesses: AI Audit & Prototyping, AI Implementation, Ongoing Partnership, and Technology Consulting. Contact for a customized quote.',
    keywords:
      'AI consulting pricing, AI consulting service pricing, AI audit cost, AI implementation cost, AI consulting rates, AI strategy pricing, Michigan AI consulting, Midwest AI consulting, small business AI consulting',
    canonicalUrl: `${SITE_URL}/pricing`,
  },
  '/team': {
    title: 'Meet Our AI Consultants',
    description:
      'Meet the AI consulting service experts at SYZYGY.services serving Michigan and Midwest small businesses: James Oosterhouse (Founder & CEO), Christian Reinhardt (Co-founder & Director of Research), and Hannah TerHaar (Co-founder & Director of Marketing).',
    keywords:
      'AI consultants, AI experts, AI consulting team, AI consulting service team, AI strategy consultants, AI implementation experts, Michigan AI consultants, Midwest AI consultants',
    canonicalUrl: `${SITE_URL}/team`,
  },
  '/careers': {
    title: 'Careers in AI Consulting',
    description:
      "Join SYZYGY.services. We're looking for driven people who want to solve real business problems with AI and other emerging technologies. Apply to work with our Michigan-based AI consulting team.",
    keywords:
      'AI consulting jobs, AI careers Michigan, AI internship, AI engineer jobs, Ann Arbor AI jobs, AI consulting careers, work in AI',
    canonicalUrl: `${SITE_URL}/careers`,
  },
  '/blog': {
    title: 'AI Consulting Blog & Insights',
    description:
      'Insights, thoughts, and perspectives on AI consulting, AI strategy, and AI implementation for small businesses in Michigan and the Midwest.',
    keywords:
      'AI consulting blog, AI strategy blog, AI implementation blog, AI thoughts, AI insights, Michigan AI consulting, Midwest AI consulting',
    canonicalUrl: `${SITE_URL}/blog`,
  },
}

export const blogPostMeta = (post) => ({
  title: post.seoTitle || post.title,
  description: post.excerpt,
  keywords: BLOG_POST_KEYWORDS,
  canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
  ogType: 'article',
})

// Every route the build should emit as a real HTML file.
export const prerenderRoutes = [
  ...Object.entries(routeMeta).map(([path, meta]) => ({ path, meta })),
  ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, meta: blogPostMeta(post) })),
]
