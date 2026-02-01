export default function Contact({ 
  heading = "Ready to align your team around",
  headingHighlight = "AI that delivers",
  description = "No commitment needed, let's talk AI.",
  headingGradient = "from-violet-400 to-sky-400"
}) {
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
            {heading} <span className={`bg-gradient-to-r ${headingGradient} bg-clip-text text-transparent`}>{headingHighlight}</span>?
          </h2>
          <p className="text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '0.1s' }}>
          <a 
            href="mailto:james@syzygy.services?subject=Project%20inquiry%20from%20website" 
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
          >
            Email james@syzygy.services
          </a>
          <a 
            href="https://calendly.com/jamesoo-umich" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            Book a 30-min intro
          </a>
        </div>
      </div>
    </section>
  )
}
