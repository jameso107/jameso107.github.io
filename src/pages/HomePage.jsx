import { useState, useEffect } from 'react'
import OpeningAnimation from '../components/OpeningAnimation'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Definition from '../components/Definition'
import Process from '../components/Process'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { getHomePageSchema } from '../utils/structuredData'

export default function HomePage() {
  const [showSite, setShowSite] = useState(false)
  const [shouldShowAnimation, setShouldShowAnimation] = useState(false)

  useEffect(() => {
    // Check if animation has been shown in this session
    // Only show animation on the very first visit to homepage in a session
    const animationShown = sessionStorage.getItem('openingAnimationShown')
    
    if (!animationShown) {
      // First visit to homepage - show animation
      setShouldShowAnimation(true)
    } else {
      // Animation already shown or navigating from another page - skip animation
      setShowSite(true)
    }
  }, [])

  const handleAnimationComplete = () => {
    setShowSite(true)
    // Mark animation as shown only after it completes
    sessionStorage.setItem('openingAnimationShown', 'true')
  }

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="AI Consulting Service | Michigan & Midwest Small Business"
        description="AI consulting service for small businesses in Michigan and the Midwest. SYZYGY.services provides AI consulting, AI audits, and AI implementation services. We align AI, people, and your business to build solutions that actually work."
        keywords="AI consulting service, AI consulting services, AI consulting, AI consulting company, AI consulting Michigan, AI consulting Midwest, AI consulting small business, Michigan AI consulting, Midwest AI consulting, AI audit, AI implementation, AI strategy"
        canonicalUrl="https://syzygy.services"
        structuredData={getHomePageSchema()}
      />
      {shouldShowAnimation && !showSite && (
        <OpeningAnimation onComplete={handleAnimationComplete} />
      )}
      <div className={showSite ? 'animate-reveal' : shouldShowAnimation ? 'opacity-0' : 'animate-reveal'}>
        <Header />
        <Hero />
        <Definition />
        <Process />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

