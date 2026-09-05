import { Link } from 'react-router-dom'
import SpotlightCard from './SpotlightCard'
import { services, servicePricingUrl } from '../data/services'

const stacks = ['OpenAI', 'Gemini', 'Claude', 'Vercel', 'n8n']

export default function Services() {
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
              What we do
            </h2>
            <p className="text-lg text-slate-300/90 leading-relaxed mb-6">
              Four ways to work with Syzygy. Pick the entry point that matches your risk tolerance and timeline; most clients start with an audit, prove the value with a prototype, then scale.
            </p>
            <Link
              to="/pricing/"
              className="inline-flex items-center gap-2 text-violet-300 hover:text-white font-semibold transition-colors duration-300"
            >
              See services and pricing
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="mt-10">
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
              <SpotlightCard
                key={service.id}
                spotlightColor="rgba(167, 139, 250, 0.18)"
                className="group rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-reveal flex flex-col"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="text-xs text-slate-400 font-mono mb-3">{service.type}</div>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-3`}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300/90 leading-relaxed flex-1">{service.description}</p>
                  {service.length && (
                    <div className="mt-4 text-xs text-slate-400">{service.length}</div>
                  )}
                  <Link
                    to={servicePricingUrl(service.id)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-white transition-colors duration-300"
                  >
                    Details and pricing
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
