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
      name: 'AI Audit',
      description: 'Comprehensive AI readiness assessment and strategic roadmap',
      price: '$3,000-$5,000'
    }),
    serviceSchema({
      name: 'Prototype Sprint',
      description: 'Rapid AI prototyping and proof of concept development',
      price: '$6,000-$8,000'
    }),
    serviceSchema({
      name: 'AI Implementation',
      description: 'Full-scale AI solution implementation and integration',
      price: 'Contact for quote'
    }),
    serviceSchema({
      name: 'Ongoing Partnership',
      description: 'Continuous AI improvements and support',
      price: '$2,000/month'
    })
  ]

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="AI Consulting Pricing | Transparent AI Audit & Implementation Costs"
        description="Transparent AI consulting service pricing for small businesses: AI Audit ($3k-$5k), Prototype Sprint ($6k-$8k), AI Implementation (custom quote), and Ongoing Partnership ($2k/month). Start small, prove value, then scale."
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

