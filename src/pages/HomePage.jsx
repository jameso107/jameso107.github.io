import { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import OpeningAnimation from '../components/OpeningAnimation'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Definition from '../components/Definition'
import Services from '../components/Services'
import Results from '../components/Results'
import Process from '../components/Process'
import InsightsStrip from '../components/InsightsStrip'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { routeMeta } from '../data/routeMeta'
import { homeFaq } from '../data/faqs'
import { services } from '../data/services'
import { graph, organizationSchema, websiteSchema, serviceSchema, faqSchema } from '../utils/structuredData'

const INTRO_KEY = 'openingAnimationShown'
const INTRO_PENDING_CLASS = 'intro-pending'

// Runs before paint in the browser so the intro decision never flashes the
// page; falls back to a normal effect during server rendering.
const useClientLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const introAlreadyShown = () => {
  try {
    return Boolean(sessionStorage.getItem(INTRO_KEY))
  } catch {
    return true // storage blocked: never trap the visitor behind the intro
  }
}

const prefersReducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const releaseIntro = () => {
  if (typeof document !== 'undefined') document.documentElement.classList.remove(INTRO_PENDING_CLASS)
}

export default function HomePage() {
  // Both start false on the server and on the client, so the prerendered HTML
  // (full page content, visible) hydrates cleanly. The intro decision is made
  // in a layout effect immediately afterwards. index.html carries an inline
  // script that hides `.site-shell` until then on a first visit.
  const [showSite, setShowSite] = useState(false)
  const [shouldShowAnimation, setShouldShowAnimation] = useState(false)

  useClientLayoutEffect(() => {
    // Only play the intro once per session, and never for visitors who prefer
    // reduced motion.
    if (introAlreadyShown() || prefersReducedMotion()) {
      setShowSite(true)
      releaseIntro()
    } else {
      setShouldShowAnimation(true)
    }
  }, [])

  const handleAnimationComplete = useCallback(() => {
    setShowSite(true)
    // Land at the very top when the site reveals after the intro animation
    window.scrollTo(0, 0)
    // Mark animation as shown only after it completes
    try {
      sessionStorage.setItem(INTRO_KEY, 'true')
    } catch {
      /* storage blocked */
    }
    releaseIntro()
  }, [])

  const structuredData = graph(
    organizationSchema,
    websiteSchema,
    ...services.map(serviceSchema),
    faqSchema(homeFaq),
  )

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO {...routeMeta['/']} structuredData={structuredData} />
      {shouldShowAnimation && !showSite && (
        <OpeningAnimation onComplete={handleAnimationComplete} />
      )}
      <div className={`site-shell ${showSite ? 'animate-reveal' : shouldShowAnimation ? 'opacity-0' : 'animate-reveal'}`}>
        <Header />
        <main>
          <Hero enableBackground={showSite} />
          <Definition />
          <Services />
          <Results />
          <Process />
          <InsightsStrip />
          <FAQ items={homeFaq} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
