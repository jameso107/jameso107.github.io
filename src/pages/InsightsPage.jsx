import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import InsightCard from '../components/InsightCard'
import { routeMeta } from '../data/routeMeta'
import { getAllInsights, getFeatured, getCategories } from '../data/insights'
import { graph, breadcrumbSchema } from '../utils/structuredData'

export default function InsightsPage() {
  const articles = getAllInsights()
  const featured = getFeatured()
  const categories = getCategories()
  // Client-side only; the server always renders the full, unfiltered list.
  const [category, setCategory] = useState(null)

  const rest = articles.filter((article) => article !== featured)
  const visible = category ? articles.filter((article) => article.category === category) : rest

  const structuredData = graph(
    breadcrumbSchema([
      { name: 'Home', url: routeMeta['/'].canonicalUrl },
      { name: 'Insights', url: routeMeta['/insights'].canonicalUrl },
    ]),
  )

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO {...routeMeta['/insights']} structuredData={structuredData} />
      <Header />
      <main>
        <section className="pt-32 pb-32 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/20"></div>
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-14 animate-reveal">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">Insights</h1>
              <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
                Practical frameworks for owners and operators of small and mid-sized businesses — free, and written to be used.
              </p>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-20 animate-reveal">
                <h2 className="text-2xl font-bold text-white mb-3">Articles are on their way</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                  We are publishing our first set of guides for owners and operators. Check back soon.
                </p>
              </div>
            ) : (
              <>
                {categories.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-12 animate-reveal" role="group" aria-label="Filter by category">
                    <button
                      type="button"
                      onClick={() => setCategory(null)}
                      aria-pressed={category === null}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
                        category === null
                          ? 'border-violet-400/60 bg-violet-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategory(item === category ? null : item)}
                        aria-pressed={category === item}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
                          category === item
                            ? 'border-violet-400/60 bg-violet-500/20 text-white'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}

                {!category && featured && (
                  <div className="mb-10">
                    <InsightCard article={featured} featured headingLevel="h2" />
                  </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((article, idx) => (
                    <InsightCard
                      key={article.slug}
                      article={article}
                      headingLevel="h2"
                      style={{ animationDelay: `${Math.min(idx, 6) * 0.08}s` }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
