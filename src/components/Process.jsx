export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Discovery Audit',
      subtitle: 'Discover',
      description: 'We unpack the job‑to‑be‑done, workflows, and constraints. We work alongside your people every step of the way.',
      gradient: 'from-violet-500 to-purple-600',
      icon: '🔎'
    },
    {
      number: '02',
      title: 'Design and Prototype',
      description: 'Spec the UX, retrieval strategy, evaluation plan, and success metrics to unlock real value for your business. Your dreams are translated into real code.',
      gradient: 'from-sky-400 to-blue-500',
      icon: '✏️'
    },
    {
      number: '03',
      title: 'Build and Implement',
      subtitle: 'Build',
      description: 'Integrate real AI solutions into your business processes. Our custom or 3rd-party tools will unlock real ROI into your business.',
      gradient: 'from-cyan-400 to-blue-500',
      icon: '⚙️'
    },
    {
      number: '04',
      title: 'Measure and Improve',
      subtitle: 'Measure',
      description: 'We showcase the ROI and impact your team has now unlocked. Iterate with real‑world feedback.',
      gradient: 'from-pink-400 to-rose-500',
      icon: '📊'
    }
  ]

  return (
    <section id="process" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-sky-500/20"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            How we work
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((step, idx) => (
            <div 
              key={step.number}
              className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Connecting line (hidden on last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-violet-500/30 to-transparent z-[-1] pointer-events-none"></div>
              )}
              
              {/* Gradient glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 z-0`}></div>
              
              <div className="relative z-10">
                <div className="mb-4">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent font-mono`}>
                    {step.number}
                  </div>
                </div>
                <div className="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors duration-300">
                  {step.title}
                </div>
                {step.subtitle && (
                  <div className="text-sm text-slate-400 mb-3">{step.subtitle}</div>
                )}
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
