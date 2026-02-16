export default function Work() {
  const projects = [
    {
      category: 'Manufacturing • Holland, MI',
      title: 'Faster RFQ to proposal',
      description: 'We created a document‑grounded assistant that turns prints, specs, and past quotes into structured estimates and risks. Result: Sales Engineers saved 5+ hours per week, opening up time for more customer interaction.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      category: 'Manufacturing • Washington, D.C.',
      title: 'Analyze documents to make more accurate decisions',
      description: 'We built a custom AI engine to analyze specification documents and take exception to contract terms. Result: 18% more efficient quoting operations, allowing for quicker quote turnaround times.',
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      category: 'Retail • Orlando, FL',
      title: 'Automate online store operations',
      description: 'We researched and implemented 3rd party software to automatically list, reprice, and prepare shipping for online storefront. Result: 25% more efficient operations and 10% increase in revenue',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      category: 'Automotive • Holland, MI',
      title: 'Full Service LLM Suite',
      description: 'We developed and implemented a custom LLM suite for day-to-day operations. Result: Over 400 employees find meaningful value daily with room to grow in an intelligent AI environment.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      category: 'Technology • San Francisco, CA',
      title: 'Product Advisory',
      description: 'We researched and advised on product strategy for an AI startup. Result: Strategic product changes driving customer interaction from across the US.',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      category: 'Automotive • Holland, MI',
      title: 'Automate Controls Engineering Workflows',
      description: 'We researched and implemented 3rd party software to program, debug, and standardize PLC and robot programming for a custom automation company. Result: Over 10% more efficient controls programming operations and greater quality of life for users.',
      gradient: 'from-blue-500 to-cyan-500'
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
        <div className="text-center mb-16 animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Customer Stories
          </h2>
          <p className="text-lg text-slate-400">
            Real clients, real impact
          </p>
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
                <div className="mb-4">
                  <div className="text-xs text-slate-400 font-mono">{project.category}</div>
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
