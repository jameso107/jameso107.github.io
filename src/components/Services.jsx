export default function Services() {
  const services = [
    {
      type: 'Engagement',
      title: 'AI Opportunity Audit',
      items: [
        'Stakeholder interviews & job‑to‑be‑done mapping over 2-4 weeks',
        'Risk/benefit & ROI sizing, data readiness assessment',
        '90‑day roadmap with success metrics'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      icon: '🔍'
    },
    {
      type: 'Sprint',
      title: 'Rapid Prototype',
      items: [
        'Clickable spec → working tool in 4-6 weeks',
        'RAG/agents with your private docs & systems',
        'Pilot with real users & evaluation harness'
      ],
      gradient: 'from-violet-500 to-purple-600',
      icon: '⚡'
    },
    {
      type: 'Build',
      title: 'Production Implementation',
      items: [
        'Guardrails, monitoring, and analytics',
        'Auth, roles, data governance, and red‑team testing',
        'Training & rollout, change‑management support'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      icon: '🏗️'
    },
    {
      type: 'Partner',
      title: 'Ongoing Retainer',
      items: [
        'Backlog grooming, iteration, and support',
        'Monthly evaluations & cost/perf optimizations',
        'Quarterly roadmap refresh'
      ],
      gradient: 'from-orange-500 to-pink-500',
      icon: '🤝'
    }
  ]

  const stacks = ['OpenAI', 'Gemini', 'Claude', 'Vercel', 'n8n']

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full blur-3xl bg-purple-500/10"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl bg-cyan-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:sticky lg:top-32 animate-reveal">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Services
            </h2>
            <p className="text-lg text-slate-300/90 leading-relaxed mb-6">
              Pick the entry point that matches your risk tolerance and timeline. We'll tailor the plan to your stack and security requirements.
            </p>
            <div className="mt-8">
              <div className="text-sm text-slate-400 mb-3">Typical stacks:</div>
              <div className="flex flex-wrap gap-2">
                {stacks.map((stack) => (
                  <span 
                    key={stack}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {stack}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                  and more
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <div 
                key={service.title}
                className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-reveal"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-slate-400 font-mono">{service.type}</div>
                    <div className="text-2xl">{service.icon}</div>
                  </div>
                  <div className={`text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-4`}>
                    {service.title}
                  </div>
                  <ul className="space-y-3">
                    {service.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm text-slate-400">
                        <span className={`mt-1.5 size-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`}></span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
