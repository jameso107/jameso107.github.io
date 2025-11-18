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
            Now booking 2026 Q1 AI audits
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.1]">
            Aligning <span className="text-violet-400">AI</span>, <span className="text-sky-400">people</span>, and <span className="text-violet-300">your business</span>.
          </h1>
          
          <p className="text-base md:text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            We're all in on AI and serving you. SYZYGY.services is your one-stop shop to audit your AI readiness, develop your AI strategy, prototype effective tools, and implement real ROI.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#contact" 
              className="group inline-flex items-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
            >
              Start a project
            </a>
            <a 
              href="/case-studies" 
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              See customer stories
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
