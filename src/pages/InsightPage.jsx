import { useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import FAQ from '../components/FAQ'
import InsightCard from '../components/InsightCard'
import { routeMeta, insightMeta, CALENDLY_URL } from '../data/routeMeta'
import { getInsight, getRelated } from '../data/insights'
import { getServiceForCta, servicePricingUrl } from '../data/services'
import { graph, articleSchema, breadcrumbSchema, faqSchema } from '../utils/structuredData'

function LinkedInIcon({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function ArrowIcon({ className = 'w-4 h-4' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NotFound() {
  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="Article Not Found"
        description="That article does not exist. Browse all Syzygy insights."
        canonicalUrl={routeMeta['/insights'].canonicalUrl}
        robots="noindex, follow"
      />
      <Header />
      <section className="pt-32 pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article not found</h1>
          <p className="text-slate-400 mb-8">The article you are looking for does not exist or has moved.</p>
          <Link
            to="/insights/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300"
          >
            Browse all insights
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default function InsightPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = getInsight(slug)

  // Markdown links are plain <a href="/pricing/">. Route internal ones through
  // the router so navigation stays client-side; leave modified clicks and
  // external links alone.
  const handleBodyClick = useCallback(
    (event) => {
      const anchor = event.target.closest?.('a')
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      if (!href.startsWith('/') || href.startsWith('//')) return
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (anchor.target && anchor.target !== '_self') return
      event.preventDefault()
      navigate(href)
    },
    [navigate],
  )

  if (!article) return <NotFound />

  const meta = insightMeta(article)
  const related = getRelated(article.slug, 3)
  const service = getServiceForCta(article.cta.service)
  const { author } = article

  const structuredData = graph(
    articleSchema(article, meta.canonicalUrl),
    breadcrumbSchema([
      { name: 'Home', url: routeMeta['/'].canonicalUrl },
      { name: 'Insights', url: routeMeta['/insights'].canonicalUrl },
      { name: article.title, url: meta.canonicalUrl },
    ]),
    article.faq.length > 0 && faqSchema(article.faq),
  )

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO {...meta} structuredData={structuredData} />
      <Header />
      <main>
        <article className="pt-32 pb-24 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/10"></div>
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/10"></div>
          </div>

          <div className="mx-auto max-w-3xl px-6">
            <nav aria-label="Breadcrumb" className="animate-reveal mb-8">
              <Link
                to="/insights/"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All insights
              </Link>
            </nav>

            {/* Article header */}
            <header className="animate-reveal" style={{ animationDelay: '0.05s' }}>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-violet-300 mb-5">{article.category}</div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] text-white tracking-tight">
                {article.title}
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-slate-300/90 leading-relaxed">{article.dek}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-400">
                <span>{article.readingMinutes} min read</span>
                <span aria-hidden="true">·</span>
                <span>
                  By <span className="text-slate-200">{author.name}</span>
                </span>
              </div>
              <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-violet-400 to-sky-400"></div>
            </header>

            {/* Key takeaways */}
            <aside
              aria-labelledby="key-takeaways"
              className="mt-12 rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-500/15 via-white/5 to-sky-500/10 p-7 md:p-8 animate-reveal"
              style={{ animationDelay: '0.1s' }}
            >
              <h2 id="key-takeaways" className="text-sm font-mono uppercase tracking-[0.2em] text-violet-200 mb-5">
                Key takeaways
              </h2>
              <ul className="space-y-3">
                {article.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-100 leading-relaxed">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-sky-400"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Body */}
            <div
              className="prose mt-14 animate-reveal"
              style={{ animationDelay: '0.15s' }}
              onClick={handleBodyClick}
              dangerouslySetInnerHTML={{ __html: article.html }}
            />

            {/* FAQ */}
            <FAQ items={article.faq} compact id="article-faq" />

            {/* CTA */}
            <section
              aria-labelledby="article-cta"
              className="mt-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 animate-reveal"
            >
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-3">{service.title}</div>
              <h2 id="article-cta" className="text-2xl md:text-3xl font-bold text-white mb-4">
                {article.cta.heading}
              </h2>
              <p className="text-slate-300/90 leading-relaxed mb-8">{article.cta.body}</p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50"
                >
                  Book an intro call
                  <ArrowIcon className="w-5 h-5" />
                </a>
                <Link
                  to={servicePricingUrl(service.id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-slate-200 hover:border-white/25 hover:bg-white/10 transition-all duration-300"
                >
                  About {service.title}
                </Link>
              </div>
            </section>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section aria-labelledby="related-articles" className="pb-24">
            <div className="mx-auto max-w-7xl px-6">
              <h2 id="related-articles" className="text-2xl md:text-3xl font-extrabold text-white mb-8 animate-reveal">
                Related articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((item, idx) => (
                  <InsightCard key={item.slug} article={item} style={{ animationDelay: `${idx * 0.08}s` }} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Author */}
        <section aria-labelledby="about-the-author" className="pb-32">
          <div className="mx-auto max-w-3xl px-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8 flex flex-col sm:flex-row gap-6 items-start animate-reveal">
              <img
                src={author.image}
                alt={author.name}
                width="80"
                height="80"
                loading="lazy"
                className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shrink-0"
              />
              <div>
                <h2 id="about-the-author" className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-2">
                  About the author
                </h2>
                <div className="text-xl font-bold text-white">{author.name}</div>
                <div className="text-sm text-violet-300 mb-3">{author.role}</div>
                <p className="text-sm text-slate-300/90 leading-relaxed mb-4">
                  James founded Syzygy to bring AI-led operations consulting to owner-led small and mid-sized businesses across the Midwest and beyond.
                </p>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-violet-300 transition-colors duration-300"
                >
                  <LinkedInIcon />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
