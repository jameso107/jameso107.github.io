import Header from '../components/Header'
import Work from '../components/Work'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { breadcrumbSchema } from '../utils/structuredData'

export default function CaseStudiesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://syzygy.services' },
    { name: 'Customer Stories', url: 'https://syzygy.services/case-studies' }
  ])

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="AI Case Studies | Customer Success Stories"
        description="See real AI consulting results: Manufacturing quoting automation, document analysis, and retail operations automation. Real clients, real impact with SYZYGY.services."
        keywords="AI case studies, AI success stories, AI consulting results, AI implementation examples, AI ROI case studies"
        canonicalUrl="https://syzygy.services/case-studies"
        structuredData={breadcrumbs}
      />
      <Header />
      <div className="pt-32">
        <Work />
        <Contact 
          heading="Ready to see similar"
          headingHighlight="results for your business"
          description="No commitment needed, let's talk AI."
          headingGradient="from-violet-400 to-sky-400"
        />
      </div>
      <Footer />
    </div>
  )
}

