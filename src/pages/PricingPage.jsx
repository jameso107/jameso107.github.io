import Header from '../components/Header'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { routeMeta } from '../data/routeMeta'
import { services } from '../data/services'
import { pricingFaq } from '../data/faqs'
import { graph, breadcrumbSchema, serviceSchema, faqSchema } from '../utils/structuredData'

export default function PricingPage() {
  const structuredData = graph(
    breadcrumbSchema([
      { name: 'Home', url: routeMeta['/'].canonicalUrl },
      { name: 'Pricing', url: routeMeta['/pricing'].canonicalUrl },
    ]),
    ...services.map(serviceSchema),
    faqSchema(pricingFaq),
  )

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO {...routeMeta['/pricing']} structuredData={structuredData} />
      <Header />
      <main className="pt-32">
        <Pricing />
        <FAQ items={pricingFaq} intro="Straight answers on how an engagement is scoped and what to expect." />
        <Contact 
          heading="Ready to get started with"
          headingHighlight="Syzygy"
          description="No commitment needed, let's talk AI."
          headingGradient="from-violet-400 to-sky-400"
        />
      </main>
      <Footer />
    </div>
  )
}
