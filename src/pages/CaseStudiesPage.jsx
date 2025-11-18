import Header from '../components/Header'
import Work from '../components/Work'
import Footer from '../components/Footer'

export default function CaseStudiesPage() {
  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <Header />
      <div className="pt-32">
        <Work />
      </div>
      <Footer />
    </div>
  )
}

