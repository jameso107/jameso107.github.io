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

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm px-4 py-2 text-xs text-slate-300 shadow-lg">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
              </span>
              Now booking 2026 Q1 AI audits
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block">Align</span>
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">AI</span>
              <span className="block text-sky-400">people</span>
              <span className="block">and <span className="text-violet-300">your business</span></span>
              <span className="block text-slate-300 text-4xl md:text-5xl lg:text-6xl mt-2">to build solutions that actually work.</span>
            </h1>
            
            <p className="text-lg text-slate-300/90 max-w-2xl leading-relaxed">
              We're an AI consulting studio that builds practical systems— from quoting copilots for manufacturers to classroom assistants for education teams. Start with a fast audit, move into a prototype in weeks, and scale to production when it earns its keep.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
              >
                Start a project
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M13.5 4.5h6v6m0-6L10 14"/>
                  <path d="M21 3 9 15"/>
                </svg>
              </a>
              <a 
                href="#work" 
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                See work
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2 group">
                <span className="size-3 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all duration-300"></span>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Manufacturing</span>
              </div>
              <div className="flex items-center gap-2 group">
                <span className="size-3 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-all duration-300"></span>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Education</span>
              </div>
              <div className="flex items-center gap-2 group">
                <span className="size-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] group-hover:shadow-[0_0_15px_rgba(52,211,153,0.8)] transition-all duration-300"></span>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Operations</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-reveal" style={{ animationDelay: '0.2s' }}>
            {/* Floating service cards */}
            <div className="glass shine rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { title: 'AI Audit', desc: 'Map ROI opportunities, risks, and a 90‑day plan.', delay: '0s' },
                    { title: 'Prototype Sprint', desc: 'Experiment with the best tools in 4-6 weeks and train your team on the results.', delay: '0.1s' },
                    { title: 'Production Build', desc: 'Hardening, guardrails, analytics, and rollout.', delay: '0.2s' },
                    { title: 'Retainer', desc: 'Continuous improvements and on‑call support.', delay: '0.3s' }
                  ].map((service, idx) => (
                    <div 
                      key={service.title}
                      className="group rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{ animationDelay: service.delay }}
                    >
                      <div className="text-xs text-slate-400 mb-1">Service</div>
                      <div className="mt-1 font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">{service.title}</div>
                      <div className="mt-2 text-sm text-slate-400 leading-relaxed">{service.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-xs text-slate-400 code-badge flex flex-wrap gap-3 justify-center">
                    <span className="px-2 py-1 rounded bg-white/5">CustomGPTs</span>
                    <span className="px-2 py-1 rounded bg-white/5">RAG</span>
                    <span className="px-2 py-1 rounded bg-white/5">3rd-Party Tools</span>
                    <span className="px-2 py-1 rounded bg-white/5">Embeddings</span>
                    <span className="px-2 py-1 rounded bg-white/5">Automations</span>
                    <span className="px-2 py-1 rounded bg-white/5">Agents</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
