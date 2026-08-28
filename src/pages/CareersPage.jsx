import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import SpotlightCard from '../components/SpotlightCard'
import ApplicationForm from '../components/ApplicationForm'
import { openRoles, responsibilities, idealCandidate, GENERAL_APPLICATION } from '../data/openRoles'
import { breadcrumbSchema, organizationSchema } from '../utils/structuredData'

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="mt-0.5 size-5 shrink-0 text-violet-400"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(null)

  const scrollToForm = (roleTitle) => {
    if (roleTitle) setSelectedRole(roleTitle)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://syzygy.services' },
    { name: 'Careers', url: 'https://syzygy.services/careers' },
  ])

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="Careers | Join Our Team"
        description="Join SYZYGY.services. We're looking for driven people who want to solve real business problems with AI and other emerging technologies. Apply to work with our Michigan-based AI consulting team."
        keywords="AI consulting jobs, AI careers Michigan, AI internship, AI engineer jobs, Ann Arbor AI jobs, AI consulting careers, work in AI"
        canonicalUrl="https://syzygy.services/careers"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbs, organizationSchema],
        }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/20"></div>
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="animate-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-200">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-violet-400"></span>
              </span>
              We&apos;re hiring
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold">
              Build the future of{' '}
              <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
                AI at work
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
              We&apos;re looking for driven people to solve business problems with AI and other
              emerging technologies. You&apos;ll work on real client problems from day one, with a
              team that cares more about what you can figure out than what&apos;s on your résumé.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '0.1s' }}>
            <button
              type="button"
              onClick={() => scrollToForm(null)}
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl shadow-violet-500/30 transition-all duration-300 hover:from-violet-600 hover:to-purple-700 hover:shadow-violet-500/50 hover:scale-105"
            >
              <span>Apply now</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="mailto:james@syzygy.services"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-medium text-slate-200 transition-all duration-300 hover:border-white/25 hover:bg-white/10"
            >
              Questions? Email us
            </a>
          </div>
        </div>
      </section>

      {/* What you'll do / who fits */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <SpotlightCard
              spotlightColor="rgba(167, 139, 250, 0.18)"
              className="group rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 border border-white/10 transition-all duration-500 hover:border-white/20 animate-reveal overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6">You&apos;ll help us</h2>
                <ul className="space-y-4">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-300/90 leading-relaxed">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.18)"
              className="group rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 border border-white/10 transition-all duration-500 hover:border-white/20 animate-reveal overflow-hidden"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6">You&apos;re a great fit if</h2>
                <ul className="space-y-4">
                  {idealCandidate.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-300/90 leading-relaxed">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Open roles -- renders only once openRoles has entries */}
      {openRoles.length > 0 && (
        <section className="py-16 relative">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12 animate-reveal">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Open{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  roles
                </span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {openRoles.map((role, idx) => (
                <SpotlightCard
                  key={role.id}
                  spotlightColor="rgba(167, 139, 250, 0.18)"
                  className="group rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 border border-white/10 transition-all duration-500 hover:border-white/20 hover:scale-[1.02] animate-reveal overflow-hidden"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 z-0`}
                  ></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300">
                      {role.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {[role.type, role.location].filter(Boolean).map((meta) => (
                        <span
                          key={meta}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300"
                        >
                          {meta}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-slate-400 leading-relaxed">{role.summary}</p>
                    {role.highlights?.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {role.highlights.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-slate-400">
                            <CheckIcon />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <button
                      type="button"
                      onClick={() => scrollToForm(role.title)}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors duration-300 hover:text-violet-200"
                    >
                      Apply for this role
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application form */}
      <section id="apply" className="py-16 pb-32 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl bg-sky-500/20"></div>
        </div>

        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-10 animate-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Tell us about{' '}
              <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
                yourself
              </span>
            </h2>
            <p className="text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed">
              {openRoles.length > 0
                ? 'Pick a role below, or submit a general application and we’ll find the right fit.'
                : 'We don’t have specific openings posted right now, but we read every application and reach out when something fits.'}
            </p>
          </div>

          <div className="animate-reveal" style={{ animationDelay: '0.1s' }}>
            <ApplicationForm defaultRole={selectedRole || GENERAL_APPLICATION} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
