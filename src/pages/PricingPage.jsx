import Header from '../components/Header'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function PricingPage() {
  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <Header />
      <div className="pt-32">
        <Pricing />
        <Contact 
          heading="Ready to get started with"
          headingHighlight="SYZYGY"
          description="Have questions about our pricing or ready to begin? We'll reply with next steps and a time to talk."
          headingGradient="from-violet-400 to-sky-400"
        />
      </div>
      <Footer />
    </div>
  )
}

