export default function Contact() {
  const items = [
    'Team & problem overview',
    'Data sources & access constraints',
    'Desired outcomes & timeline',
    'Security/compliance needs'
  ]

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl bg-sky-500/20"></div>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12 animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Ready to align your team around <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">AI that delivers</span>?
          </h2>
          <p className="text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            Tell us about your goals and constraints. We'll reply with next steps and a time to talk.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-reveal" style={{ animationDelay: '0.1s' }}>
          <a 
            href="mailto:jamesoo@umich.edu?subject=Project%20inquiry%20from%20website" 
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
          >
            Email jamesoo@umich.edu
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 group-hover:translate-x-1 transition-transform duration-300">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </a>
          <a 
            href="https://calendly.com/jamesoo-umich" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            Book a 30-min intro
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 group-hover:translate-x-1 transition-transform duration-300">
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
            </svg>
          </a>
        </div>
        
        <div className="glass rounded-3xl p-8 border border-white/20 shadow-2xl animate-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-2 rounded-full bg-gradient-to-r from-violet-400 to-sky-400"></div>
            <div className="text-sm font-semibold text-slate-300">What to include</div>
          </div>
          <ul className="grid md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300/90">
                <span className="mt-1.5 size-1.5 rounded-full bg-gradient-to-r from-violet-400 to-sky-400 flex-shrink-0"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
