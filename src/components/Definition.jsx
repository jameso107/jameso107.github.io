export default function Definition() {
  const pillars = [
    {
      number: 'I',
      title: 'AI',
      description: 'We stay up to date on the best and brightest of emerging tech so you don\'t have to.',
      gradient: 'from-violet-500 to-purple-600',
      icon: '🤖'
    },
    {
      number: 'II',
      title: 'People',
      description: 'We co‑design with your operators, ICs, and stakeholders so adoption is baked in from day one.',
      gradient: 'from-sky-400 to-blue-500',
      icon: '👥'
    },
    {
      number: 'III',
      title: 'Your Business',
      description: 'We meet you where you\'re at, understand your unique business case, and work with you to take it to the next level.',
      gradient: 'from-emerald-400 to-teal-500',
      icon: '🚀'
    }
  ]

  return (
    <section id="definition" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/10"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            What is <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">Syzygy</span>?
          </h2>
          <p className="mt-4 text-lg text-slate-300/90 max-w-4xl mx-auto leading-relaxed">
            A <em className="text-violet-300 not-italic font-semibold">syzygy</em> is an alignment of three celestial bodies. We named our company SYZYGY because great AI demands alignment: <span className="font-semibold text-white">AI</span> that powers the future, <span className="font-semibold text-white">People</span> who drive innovation, and <span className="font-semibold text-white">Your Business</span> and its unique competitive advantages!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {pillars.map((pillar, idx) => (
            <div 
              key={pillar.number}
              className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Gradient glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-4xl bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent`}>
                    {pillar.icon}
                  </div>
                  <div className="text-sm text-slate-400 font-mono">Pillar {pillar.number}</div>
                </div>
                <div className={`mt-2 text-2xl font-bold bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}>
                  {pillar.title}
                </div>
                <p className="mt-4 text-slate-400 leading-relaxed">{pillar.description}</p>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-20 rounded-bl-3xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
