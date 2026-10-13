import { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import OpeningAnimation from '../components/OpeningAnimation'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Definition from '../components/Definition'
import Services from '../components/Services'
import Results from '../components/Results'
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

// Intro phase → classes on .site-shell, which the intro rules in index.css key
// off. 'off' is the server render, repeat visits and reduced motion; a first
// visit runs 'playing' → 'revealed' (hero copy rises in) → 'done' (the header
// logo and hero grid take over from the animation at the same pixels).
const SHELL_CLASS = {
  off: 'animate-reveal',
  playing: 'intro-playing',
  revealed: 'intro-playing intro-revealed',
  done: 'intro-revealed intro-done',
}

export default function HomePage() {
  // Starts 'off' on the server and on the client, so the prerendered HTML (full
  // page content, visible) hydrates cleanly. The intro decision is made in a
  // layout effect immediately afterwards. On a first visit, index.html has
  // already covered the page with an inline script until the intro's first
  // frame is up.
  const [intro, setIntro] = useState('off')

  useClientLayoutEffect(() => {
    // Only play the intro once per session, and never for visitors who prefer
    // reduced motion.
    if (introAlreadyShown() || prefersReducedMotion()) {
      releaseIntro()
    } else {
      setIntro('playing')
    }
  }, [])

  const handleReveal = useCallback(() => setIntro('revealed'), [])

  const handleComplete = useCallback(() => {
    setIntro('done')
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
      {(intro === 'playing' || intro === 'revealed') && (
        <OpeningAnimation onStart={releaseIntro} onReveal={handleReveal} onComplete={handleComplete} />
      )}
      {/* `isolate` keeps the hero's -z-10 background layers above the page
          gradient whatever animation class the shell carries. */}
      <div className={`site-shell isolate ${SHELL_CLASS[intro]}`}>
        <Header />
        <main>
          <Hero />
          <Definition />
          <Services />
          <Results />
          <InsightsStrip />
          <FAQ items={homeFaq} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
