// Structured Data (JSON-LD) helpers for SEO

const siteUrl = 'https://syzygy.services'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SYZYGY.services',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: 'AI consulting services that align AI, people, and your business to build solutions that actually work.',
  email: 'jamesoo@umich.edu',
  sameAs: [
    'https://www.linkedin.com/company/syzygy-services'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'jamesoo@umich.edu'
  }
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SYZYGY.services',
  url: siteUrl,
  description: 'AI consulting services for businesses looking to implement AI solutions',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
}

export const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: 'SYZYGY.services'
  },
  areaServed: 'Worldwide',
  serviceType: 'AI Consulting',
  ...(service.price && {
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'USD'
    }
  })
})

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const personSchema = (person) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  jobTitle: person.role,
  description: person.description,
  url: person.linkedin,
  sameAs: [person.linkedin],
  worksFor: {
    '@type': 'Organization',
    name: 'SYZYGY.services'
  }
})

export const getHomePageSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    {
      '@type': 'Service',
      name: 'AI Audit',
      description: 'Comprehensive AI readiness assessment and strategic roadmap',
      provider: {
        '@type': 'Organization',
        name: 'SYZYGY.services'
      }
    },
    {
      '@type': 'Service',
      name: 'Prototype Sprint',
      description: 'Rapid AI prototyping and proof of concept development',
      provider: {
        '@type': 'Organization',
        name: 'SYZYGY.services'
      }
    },
    {
      '@type': 'Service',
      name: 'AI Implementation',
      description: 'Full-scale AI solution implementation and integration',
      provider: {
        '@type': 'Organization',
        name: 'SYZYGY.services'
      }
    }
  ]
})

