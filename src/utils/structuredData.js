// Structured data (JSON-LD) helpers.
//
// Every helper returns a bare node (no @context). Pages combine nodes with
// `graph(...)`, which adds a single top-level @context, and hand the result to
// <SEO structuredData={...} />, which renders it into the page as a
// <script type="application/ld+json"> — so it is present in the prerendered
// HTML, not injected after the fact.
//
// The Organization node carries a stable @id that Person.worksFor,
// Service.provider, Article.publisher and WebSite.publisher all point at, so
// crawlers see one entity rather than four look-alikes.

import {
  SITE_URL,
  BRAND,
  ALTERNATE_NAMES,
  POSITIONING,
  CONTACT_EMAIL,
  LINKEDIN_COMPANY_URL,
  DEFAULT_IMAGE,
} from '../data/routeMeta'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const FOUNDER = {
  name: 'James Oosterhouse',
  role: 'Founder & CEO',
  linkedin: 'https://www.linkedin.com/in/james-oosterhouse/',
  image: '/james.jpg',
}

const ALUMNI_OF = { '@type': 'CollegeOrUniversity', name: 'University of Michigan' }

export const AREA_SERVED = [
  { '@type': 'State', name: 'Michigan' },
  { '@type': 'Place', name: 'Midwest United States' },
  { '@type': 'Country', name: 'United States' },
]

export const KNOWS_ABOUT = [
  'AI consulting',
  'Business process automation',
  'Operations consulting',
  'Technology strategy',
  'Small business consulting',
]

const absolute = (path) => (path.startsWith('http') ? path : `${SITE_URL}${path}`)

export const graph = (...nodes) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.flat().filter(Boolean),
})

export const organizationRef = { '@id': ORGANIZATION_ID }

export const organizationSchema = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORGANIZATION_ID,
  name: BRAND,
  alternateName: ALTERNATE_NAMES,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 1001,
    height: 1001,
  },
  image: DEFAULT_IMAGE,
  description: POSITIONING,
  email: CONTACT_EMAIL,
  sameAs: [LINKEDIN_COMPANY_URL],
  founder: {
    '@type': 'Person',
    name: FOUNDER.name,
    jobTitle: FOUNDER.role,
    url: FOUNDER.linkedin,
    sameAs: [FOUNDER.linkedin],
    image: absolute(FOUNDER.image),
  },
  knowsAbout: KNOWS_ABOUT,
  areaServed: AREA_SERVED,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'MI',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: CONTACT_EMAIL,
    areaServed: 'US',
    availableLanguage: 'English',
  },
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: BRAND,
  alternateName: ALTERNATE_NAMES,
  url: `${SITE_URL}/`,
  description: POSITIONING,
  inLanguage: 'en-US',
  publisher: organizationRef,
}

// No `offers`: prices are pending, and schema.org rejects a non-numeric price.
export const serviceSchema = (service) => ({
  '@type': 'Service',
  '@id': `${SITE_URL}/pricing/#${service.id}`,
  name: service.title,
  description: service.description,
  serviceType: service.shortName || service.title,
  url: `${SITE_URL}/pricing/#${service.id}`,
  provider: organizationRef,
  areaServed: AREA_SERVED,
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Small and mid-sized businesses',
  },
})

// Items are { name, url }. Pass canonical URLs (trailing slash) — see routeMeta.
export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const personSchema = (person) => ({
  '@type': 'Person',
  name: person.name,
  jobTitle: person.role,
  description: person.description,
  ...(person.image && { image: absolute(person.image) }),
  ...(person.linkedin && { url: person.linkedin, sameAs: [person.linkedin] }),
  // The team copy presents the whole team as University of Michigan alumni.
  alumniOf: ALUMNI_OF,
  worksFor: organizationRef,
})

export const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

// Articles are deliberately undated: no datePublished / dateModified.
export const articleSchema = (article, canonicalUrl) => ({
  '@type': 'Article',
  '@id': `${canonicalUrl}#article`,
  headline: article.title,
  description: article.dek,
  image: DEFAULT_IMAGE,
  author: {
    '@type': 'Person',
    name: article.author.name,
    url: article.author.linkedin,
    jobTitle: article.author.jobTitle,
    image: absolute(article.author.image),
    worksFor: organizationRef,
  },
  publisher: organizationRef,
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  articleSection: article.category,
  keywords: article.keywords.join(', '),
  about: article.keywords.map((keyword) => ({ '@type': 'Thing', name: keyword })),
  wordCount: article.wordCount,
  inLanguage: 'en-US',
  isAccessibleForFree: true,
})
