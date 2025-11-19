import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  structuredData
}) {
  const siteUrl = 'https://syzygy.services'
  const defaultTitle = 'SYZYGY.services | AI Consulting for Your Business'
  const defaultDescription = 'AI consulting service for small businesses in Michigan and the Midwest. SYZYGY.services provides AI consulting, AI audits, and AI implementation services. We align AI, people, and your business to build solutions that actually work.'
  const defaultImage = `${siteUrl}/og-image.png`
  
  const fullTitle = defaultTitle
  const fullDescription = description || defaultDescription
  const fullImage = ogImage || defaultImage
  const fullUrl = canonicalUrl || siteUrl

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="SYZYGY.services" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="SYZYGY.services" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData, null, 0)}
        </script>
      )}
    </Helmet>
  )
}

