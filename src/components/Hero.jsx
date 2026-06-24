import { useState, useEffect, lazy, Suspense } from 'react'
import ShinyText from './ShinyText'
import StarBorder from './StarBorder'

// Lazy-load the WebGL background so the heavy `ogl` chunk is code-split out of the
// main bundle and never competes with the opening animation on first paint.
const Lightfall = lazy(() => import('./Lightfall'))

export default function Hero({ enableBackground = true }) {
  // Only mount Lightfall on non-touch (desktop) devices to save GPU/battery on mobile.
  const [showLightfall, setShowLightfall] = useState(false)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
    setShowLightfall(!isTouch)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-32 overflow-hidden">
      {/* Lightfall WebGL background — desktop only, mounted after the opening animation,
          lazy-loaded + faded in so it never causes jank during the intro. */}
      {showLightfall && enableBackground && (
        <Suspense fallback={null}>
          <div className="animate-lightfall-in absolute inset-0 -z-10">
            <Lightfall
              colors={['#a78bfa', '#5227FF', '#38bdf8']}
              backgroundColor="#0b1020"
              speed={0.4}
              streakCount={3}
              density={0.6}
              glow={1}
              opacity={0.85}
              mouseInteraction={false}
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

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(167,139,250,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="space-y-8 animate-reveal text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm px-6 py-3 text-sm md:text-base text-slate-300 shadow-lg">
            <span className="relative flex size-3 md:size-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 md:size-4 rounded-full bg-sky-400"></span>
            </span>
            Now booking Q3 clients
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1]">
            Aligning{' '}
            <ShinyText text="AI" color="#a78bfa" shineColor="#ffffff" speed={3} />,{' '}
            <ShinyText text="people" color="#38bdf8" shineColor="#ffffff" speed={3} delay={0.4} />, and{' '}
            <ShinyText text="your business" color="#c4b5fd" shineColor="#ffffff" speed={3} delay={0.8} />.
          </h1>

          <p className="text-base md:text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            All-in on AI. All-in on you. SYZYGY.services evaluates your AI potential, designs high-ROI strategies, builds rapid prototypes, and implements solutions that generate real impact for your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <StarBorder
              as="a"
              href="https://calendly.com/syzygy-intro/30min"
              target="_blank"
              rel="noopener noreferrer"
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
