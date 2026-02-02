export default function Pricing() {
  const plans = [
    {
      type: 'Audit',
      title: 'AI Audit & Prototyping',
      features: [
        'Discovery sessions',
        'ROI/feasibility analysis',
        'Internal/external audit',
        'Create a functional prototype'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      type: 'Implementation',
      title: 'AI Implementation',
      features: [
        'Unlock production level ROI',
        'Full documentation and training',
        'Integrate into existing tech stack'
      ],
      gradient: 'from-violet-500 to-purple-600',
      popular: false
    },
    {
      type: 'Retainer',
      title: 'Ongoing Partnership',
      features: [
        'Iterations & support',
        'Monthly emerging tech updates',
        'Continuous training',
        'Board room strategy support'
      ],
      gradient: 'from-cyan-500 to-blue-500',
      popular: false
    },
    {
      type: 'Advisory',
      title: 'Technology Consulting',
      features: [
        'Website design & development',
        'Technology integrations',
        'Product advising & strategy'
      ],
      gradient: 'from-pink-500 to-rose-500',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full blur-3xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-sky-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-2xl mx-auto">
            Start small, prove value, then scale.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {plans.map((plan, idx) => (
            <div 
              key={plan.type}
              className={`group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal ${
                plan.popular 
                  ? `border-blue-500/50 ring-2 ring-blue-500/30 md:-mt-4 md:mb-4` 
                  : 'border-white/10 hover:border-white/20'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r ${plan.gradient} text-xs font-semibold text-white shadow-lg`}>
                  Most popular
                </div>
              )}
              
              {/* Gradient glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex flex-col flex-1">
                <div className="text-xs text-slate-400 font-mono mb-2">{plan.type}</div>
                <div className={`text-xl font-bold mb-4 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                  {plan.title}
                </div>
                
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <span className="mt-1.5 size-1.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact"
                  className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105`
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  Contact for quote
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-8 text-center text-sm text-slate-500 max-w-3xl mx-auto">
          Contact us for a customized quote based on your scope and requirements.
        </p>
      </div>
    </section>
  )
}
