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
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

