import { useState } from 'react'
import OpeningAnimation from '../components/OpeningAnimation'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Definition from '../components/Definition'
import Process from '../components/Process'
import Work from '../components/Work'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function HomePage() {
  const [showSite, setShowSite] = useState(false)

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      {!showSite && <OpeningAnimation onComplete={() => setShowSite(true)} />}
      <div className={showSite ? 'animate-reveal' : 'opacity-0'}>
        <Header />
        <Hero />
        <Definition />
        <Process />
        <Work />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

