export default function Work() {
  const projects = [
    {
      category: 'Manufacturing • Quoting Copilot',
      title: 'Faster RFQ to proposal',
      description: 'Document‑grounded assistant turns prints, specs, and past quotes into structured estimates and risks. Result: hours → minutes and fewer misses.',
      gradient: 'from-violet-500 to-purple-600',
      icon: '⚙️'
    },
    {
      category: 'Education • Knowledge Assistant',
      title: 'Answer bank from your own docs',
      description: 'RAG system indexed policies & curricula, with citations and access controls. Help‑desk load dropped while accuracy and trust went up.',
      gradient: 'from-sky-400 to-blue-500',
      icon: '📚'
    },
    {
      category: 'Ops • Contract Review',
      title: 'Clause detection + playbooks',
      description: 'Standardized review highlights risky clauses, maps to internal playbooks, and drafts responses—tight loop with legal sign‑off.',
      gradient: 'from-emerald-400 to-teal-500',
      icon: '📋'
    }
  ]

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-purple-500/10"></div>
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-cyan-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-16 animate-reveal">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Selected work
            </h2>
            <p className="text-lg text-slate-400">
              Real outcomes, redacted as needed for privacy.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <article 
              key={project.title}
              className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-reveal"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Gradient glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-slate-400 font-mono">{project.category}</div>
                  <div className="text-3xl">{project.icon}</div>
                </div>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {project.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{project.description}</p>
                
                {/* Decorative element */}
                <div className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
