import SpotlightCard from './SpotlightCard'
import StarBorder from './StarBorder'
import { services } from '../data/services'
import { CONTACT_EMAIL } from '../data/routeMeta'

const QUOTE_HREF = `mailto:${CONTACT_EMAIL}?subject=Quote%20request`

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full blur-3xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-sky-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-reveal">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-2xl mx-auto">
            Start small, prove value, then scale.
          </h1>
          <p className="mt-6 text-lg text-slate-300/90 max-w-2xl mx-auto">
            Four ways to work with Syzygy. Each phase is scoped on its own, so you decide whether to continue after the audit, after the prototype, and after the build.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {services.map((plan, idx) => (
            <SpotlightCard
              key={plan.id}
              spotlightColor="rgba(56, 189, 248, 0.18)"
              className={`group rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal ${
                plan.popular
                  ? `border-blue-500/50 ring-2 ring-blue-500/30 md:-mt-4 md:mb-4`
                  : 'border-white/10 hover:border-white/20'
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Anchor target for /pricing/#<id> links from articles and the homepage */}
              <span id={plan.id} className="absolute -top-32" aria-hidden="true"></span>

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
                <h2 className={`text-xl font-bold mb-3 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                  {plan.title}
                </h2>
                <p className="text-sm text-slate-300/90 leading-relaxed mb-4">{plan.description}</p>
                {plan.length && (
                  <div className="text-xs text-slate-400 mb-4">
                    <span className="text-slate-500">Engagement length:</span> {plan.length}
                  </div>
                )}

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <span className="mt-1.5 size-1.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.popular ? (
                  <StarBorder
                    as="a"
                    href={QUOTE_HREF}
                    color="#38bdf8"
                    speed="5s"
                    thickness={2}
                    className="hover:scale-105 transition-transform duration-300"
                    innerClassName={`bg-gradient-to-r ${plan.gradient} text-white text-sm font-semibold py-2.5 px-5`}
                  >
                    Contact for quote
                  </StarBorder>
                ) : (
                  <a
                    href={QUOTE_HREF}
                    className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  >
                    Contact for quote
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 max-w-3xl mx-auto">
          Contact us for a customized quote based on your scope and requirements.
        </p>
      </div>
    </section>
  )
}
