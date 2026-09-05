import Header from '../components/Header'
import Work from '../components/Work'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { routeMeta } from '../data/routeMeta'
import { graph, breadcrumbSchema } from '../utils/structuredData'

// Deliberately kept out of the index (routeMeta sets robots: noindex, follow)
// and out of the sitemap while the client stories are reviewed; the route
// itself keeps working.
export default function CaseStudiesPage() {
  const structuredData = graph(
    breadcrumbSchema([
      { name: 'Home', url: routeMeta['/'].canonicalUrl },
      { name: 'Customer Stories', url: routeMeta['/case-studies'].canonicalUrl },
    ]),
  )

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO {...routeMeta['/case-studies']} structuredData={structuredData} />
      <Header />
      <main className="pt-32">
        <Work />
        <Contact 
          heading="Ready to see similar"
          headingHighlight="results for your business"
          description="No commitment needed, let's talk AI."
          headingGradient="from-violet-400 to-sky-400"
        />
      </main>
      <Footer />
    </div>
  )
}
