// Structured Data (JSON-LD) helpers for SEO

const siteUrl = 'https://syzygy.services'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SYZYGY.services',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: 112,
    height: 112
  },
  image: `${siteUrl}/logo.png`,
  description: 'AI consulting service for small businesses in Michigan and the Midwest. We align AI, people, and your business to build solutions that actually work.',
  email: 'james@syzygy.services',
  sameAs: [
    'https://www.linkedin.com/company/syzygy-services'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'james@syzygy.services',
    areaServed: ['US-MI', 'US-IL', 'US-IN', 'US-OH', 'US-WI'],
    availableLanguage: 'English'
  },
  areaServed: [
    {
      '@type': 'State',
      name: 'Michigan'
    },
    {
      '@type': 'GeoRegion',
      name: 'Midwest United States'
    }
  ]
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SYZYGY.services',
  description: 'AI consulting service specializing in small businesses across Michigan and the Midwest. We provide AI audits, AI strategy, AI implementation, and AI consulting services.',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: 112,
    height: 112
  },
  image: `${siteUrl}/logo.png`,
  email: 'james@syzygy.services',
  telephone: '+1-734-000-0000', // Update with actual phone if available
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'MI',
    addressCountry: 'US'
  },
  areaServed: [
    {
      '@type': 'State',
      name: 'Michigan'
    },
    {
      '@type': 'State',
      name: 'Illinois'
    },
    {
      '@type': 'State',
      name: 'Indiana'
    },
    {
      '@type': 'State',
      name: 'Ohio'
    },
    {
      '@type': 'State',
      name: 'Wisconsin'
    },
    {
      '@type': 'GeoRegion',
      name: 'Midwest United States'
    }
  ],
  serviceType: 'AI Consulting Service',
  priceRange: '$$',
  servesCuisine: false,
  paymentAccepted: 'Cash, Credit Card, Check',
  currenciesAccepted: 'USD'
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
  areaServed: [
    {
      '@type': 'State',
      name: 'Michigan'
    },
    {
      '@type': 'State',
      name: 'Illinois'
    },
    {
      '@type': 'State',
      name: 'Indiana'
    },
    {
      '@type': 'State',
      name: 'Ohio'
    },
    {
      '@type': 'State',
      name: 'Wisconsin'
    },
    {
      '@type': 'GeoRegion',
      name: 'Midwest United States'
    }
  ],
  serviceType: 'AI Consulting Service',
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Small Business'
  },
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
  ...(person.linkedin && { url: person.linkedin, sameAs: [person.linkedin] }),
  worksFor: {
    '@type': 'Organization',
    name: 'SYZYGY.services'
  }
})

export const getHomePageSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    {
      '@type': 'Service',
      name: 'AI Consulting Service',
      description: 'AI consulting service for small businesses in Michigan and the Midwest. Comprehensive AI readiness assessment and strategic roadmap.',
      provider: {
        '@type': 'Organization',
        name: 'SYZYGY.services'
      },
      areaServed: [
        {
          '@type': 'State',
          name: 'Michigan'
        },
        {
          '@type': 'GeoRegion',
          name: 'Midwest United States'
        }
      ],
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Small Business'
      }
    },
    {
      '@type': 'Service',
      name: 'AI Audit',
      description: 'Comprehensive AI readiness assessment and strategic roadmap for Michigan and Midwest small businesses',
      provider: {
        '@type': 'Organization',
        name: 'SYZYGY.services'
      },
      areaServed: [
        {
          '@type': 'State',
          name: 'Michigan'
        },
        {
          '@type': 'GeoRegion',
          name: 'Midwest United States'
        }
      ]
    },
    {
      '@type': 'Service',
      name: 'Prototype Sprint',
      description: 'Rapid AI prototyping and proof of concept development for small businesses',
      provider: {
        '@type': 'Organization',
        name: 'SYZYGY.services'
      },
      areaServed: [
        {
          '@type': 'State',
          name: 'Michigan'
        },
        {
          '@type': 'GeoRegion',
          name: 'Midwest United States'
        }
      ]
    },
    {
      '@type': 'Service',
      name: 'AI Implementation',
      description: 'Full-scale AI solution implementation and integration for Michigan and Midwest businesses',
      provider: {
        '@type': 'Organization',
        name: 'SYZYGY.services'
      },
      areaServed: [
        {
          '@type': 'State',
          name: 'Michigan'
        },
        {
          '@type': 'GeoRegion',
          name: 'Midwest United States'
        }
      ]
    }
  ]
})

