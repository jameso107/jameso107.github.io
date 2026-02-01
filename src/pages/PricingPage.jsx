import Header from '../components/Header'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { breadcrumbSchema, serviceSchema } from '../utils/structuredData'

export default function PricingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://syzygy.services' },
    { name: 'Pricing', url: 'https://syzygy.services/pricing' }
  ])

  const services = [
    serviceSchema({
      name: 'AI Audit & Prototyping',
      description: 'Comprehensive AI readiness assessment, strategic roadmap, and functional prototype',
      price: 'Contact for quote'
    }),
    serviceSchema({
      name: 'AI Implementation',
      description: 'Full-scale AI solution implementation and integration',
      price: 'Contact for quote'
    }),
    serviceSchema({
      name: 'Ongoing Partnership',
      description: 'Continuous AI improvements and support',
      price: 'Contact for quote'
    }),
    serviceSchema({
      name: 'Technology Consulting',
      description: 'Website design, technology integrations, and product advising',
      price: 'Contact for quote'
    })
  ]

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="AI Consulting Services | AI Audit, Implementation & Technology Consulting"
        description="AI consulting services for small businesses: AI Audit & Prototyping, AI Implementation, Ongoing Partnership, and Technology Consulting. Contact for a customized quote."
        keywords="AI consulting pricing, AI consulting service pricing, AI audit cost, AI implementation cost, AI consulting rates, AI strategy pricing, Michigan AI consulting, Midwest AI consulting, small business AI consulting"
        canonicalUrl="https://syzygy.services/pricing"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbs, ...services]
        }}
      />
      <Header />
      <div className="pt-32">
        <Pricing />
        <Contact 
          heading="Ready to get started with"
          headingHighlight="SYZYGY"
          description="No commitment needed, let's talk AI."
          headingGradient="from-violet-400 to-sky-400"
        />
      </div>
      <Footer />
    </div>
  )
}

