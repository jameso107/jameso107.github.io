import { useState, useEffect, lazy, Suspense } from 'react'
import ShinyText from './ShinyText'
import StarBorder from './StarBorder'
import { START_PROJECT_HREF } from '../data/routeMeta'

// Lazy-load the interactive background so its `gsap` chunk is code-split out of
// the main bundle and never competes with the opening animation on first paint.
// It is only ever mounted after an effect runs, so the server render (and the
// prerendered HTML) never touch the canvas.
const DotGrid = lazy(() => import('./DotGrid'))

export default function Hero({ enableBackground = true }) {
  // Touch devices have no cursor, so the grid is pure texture there — a wider
  // gap means fewer dots to redraw each frame, and easier on battery.
  const [deviceReady, setDeviceReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const touch =
      (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) ||
      (navigator.maxTouchPoints || 0) > 0
    setIsMobile(touch)
    setDeviceReady(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-32 overflow-hidden">
      {/* DotGrid background — mounted after the opening animation, lazy-loaded
          + faded in so it never causes jank during the intro. Dots sit dim until
          the cursor comes near, then light up violet and scatter on a click. */}
      {deviceReady && enableBackground && (
        <Suspense fallback={null}>
          <div className="animate-hero-bg-in absolute inset-0 -z-10">
            <DotGrid
              dotSize={5}
              gap={isMobile ? 34 : 24}
              baseColor="#2b3366"
              activeColor="#a78bfa"
              proximity={140}
              shockRadius={260}
              shockStrength={5}
              resistance={750}
              returnDuration={1.5}
            />
          </div>
        </Suspense>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-32 h-96 w-96 rounded-full blur-3xl bg-violet-500/30 animate-pulse"></div>
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full blur-3xl bg-sky-400/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl bg-purple-500/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="space-y-8 animate-reveal text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm px-6 py-3 text-sm md:text-base text-slate-300 shadow-lg">
            <span className="relative flex size-3 md:size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 md:size-4 rounded-full bg-sky-400"></span>
            </span>
            Now booking new clients
          </div>

          {/* The three terms keep the colours they carried as body copy:
              AI violet, people sky, your business light violet. */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] max-w-5xl mx-auto">
            Aligning{' '}
            <ShinyText text="AI" color="#a78bfa" shineColor="#ffffff" speed={3} />,{' '}
            <ShinyText text="people" color="#38bdf8" shineColor="#ffffff" speed={3} delay={0.4} />, and{' '}
            <ShinyText text="your business" color="#c4b5fd" shineColor="#ffffff" speed={3} delay={0.8} />.
          </h1>

          <p className="text-base md:text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            SYZYGY helps small and mid-sized businesses find, prototype, and implement the highest-return
            opportunities. We’re all-in on AI, all-in on you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <StarBorder
              as="a"
              href={START_PROJECT_HREF}
              color="#a78bfa"
              speed="5s"
              thickness={2}
              className="hover:scale-105 transition-transform duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50"
              innerClassName="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-4 px-7 text-base"
            >
              Start a project
            </StarBorder>
          </div>
        </div>
      </div>
    </section>
  )
}
