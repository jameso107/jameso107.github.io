import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-32 overflow-hidden">
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
            Now booking 2026 Q2 AI audits
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1]">
            Aligning <span className="text-violet-400">AI</span>, <span className="text-sky-400">people</span>, and <span className="text-violet-300">your business</span>.
          </h1>
          
          <p className="text-base md:text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            All-in on AI. All-in on you. SYZYGY.services evaluates your AI potential, designs high-ROI strategies, builds rapid prototypes, and implements solutions that generate real impact for your business.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://calendly.com/syzygy-intro/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
