import { useLocation, Link } from 'react-router-dom'

export default function Work() {
  const location = useLocation()
  const projects = [
    {
      category: 'Manufacturing • Quoting Copilot',
      title: 'Faster RFQ to proposal',
      description: 'Document‑grounded assistant turns prints, specs, and past quotes into structured estimates and risks. Result: Sales Engineers saved 5+ hours per week, opening up time for more customer interaction.',
      gradient: 'from-violet-500 to-purple-600',
      iconColor: 'text-violet-400',
      iconPath: (
        <>
          <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.317a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
          <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
          <path fillRule="evenodd" d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.26-3.26a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.817 15.13a.75.75 0 010-1.06z" clipRule="evenodd" />
        </>
      )
    },
    {
      category: 'Manufacturing • Document Analysis',
      title: 'Analyze documents to make more accurate decisions',
      description: 'Custom AI engine to analyze specification documents and take exception to contract terms. Result: 18% more efficient quoting operations, allowing for quicker quote turnaround times.',
      gradient: 'from-sky-400 to-blue-500',
      iconColor: 'text-sky-400',
      iconPath: (
        <>
          <path d="M11.25 4.533A9.707 9.707 0 0115 2.25c3.056 0 5.75 1.842 7.25 4.533 1.5 1.691 2.25 3.891 2.25 6.217 0 2.326-.75 4.526-2.25 6.217-1.5 1.691-4.194 4.533-7.25 4.533a9.707 9.707 0 01-3.75-.783v-4.5c0-1.036.84-1.875 1.875-1.875h3.75a1.875 1.875 0 011.875 1.875v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 019 19.125v-4.5A1.875 1.875 0 0110.875 12.75h3.75a1.875 1.875 0 011.875 1.875v1.5c0 1.036.84 1.875 1.875 1.875H21A2.25 2.25 0 0023.25 15V9c0-2.326-.75-4.526-2.25-6.217C19.5 1.092 16.806-1.75 13.75-1.75c-1.591 0-3.115.44-4.5 1.25v4.533z" />
          <path d="M6.75 12.75v4.5A1.5 1.5 0 015.25 18.75h-4.5A1.5 1.5 0 01-.75 17.25v-4.5A1.5 1.5 0 01.75 11.25h4.5a1.5 1.5 0 011.5 1.5z" />
        </>
      )
    },
    {
      category: 'Retail • Operations Automation',
      title: 'Automate online store operations',
      description: 'Researched and implemented 3rd party software to automatically list, reprice, and prepare shipping for online storefront. Result: 25% more efficient operations and 10% increase in revenue',
      gradient: 'from-cyan-400 to-blue-500',
      iconColor: 'text-cyan-400',
      iconPath: (
        <>
          <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0018 9a3.75 3.75 0 00-3.75 3.75v7.875c0 .621-.504 1.125-1.125 1.125H5.625a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125h12.75c.621 0 1.125.504 1.125 1.125v5.25c0 .621.504 1.125 1.125 1.125h.75a3.75 3.75 0 003.75-3.75V3.375c0-1.036-.84-1.875-1.875-1.875H5.625zM19.5 10.5a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75z" clipRule="evenodd" />
          <path d="M9.75 6.75a.75.75 0 00-.75.75V17.25a.75.75 0 001.5 0V7.5a.75.75 0 00-.75-.75zM12.75 7.5a.75.75 0 00-.75.75v9.75a.75.75 0 001.5 0V8.25a.75.75 0 00-.75-.75zM15.75 8.25a.75.75 0 00-.75.75v8.25a.75.75 0 001.5 0V9a.75.75 0 00-.75-.75z" />
        </>
      )
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
        
        {/* Button to view more case studies - only show on home page */}
        {location.pathname === '/' && (
          <div className="text-center mt-12 animate-reveal" style={{ animationDelay: '0.4s' }}>
            <Link 
              to="/case-studies"
              className="inline-flex items-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 font-semibold hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              Look at more customer stories
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
