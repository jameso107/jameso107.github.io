import { Link } from 'react-router-dom'
import InsightCard from './InsightCard'
import { getAllInsights, getFeatured } from '../data/insights'

// Homepage strip: the featured article plus the next two in curated order.
export default function InsightsStrip() {
  const all = getAllInsights()
  if (all.length === 0) return null

  const featured = getFeatured()
  const picks = [featured, ...all.filter((article) => article !== featured)].slice(0, 3)

  return (
    <section id="insights" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full blur-3xl bg-violet-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 animate-reveal">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3">Insights</h2>
            <p className="text-lg text-slate-300/90 max-w-2xl">
              Practical frameworks for owners and operators of small and mid-sized businesses — free, and written to be used.
            </p>
          </div>
          <Link
            to="/insights/"
            className="inline-flex items-center gap-2 text-violet-300 hover:text-white font-semibold transition-colors duration-300"
          >
            All insights
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {picks.map((article, idx) => (
            <InsightCard key={article.slug} article={article} style={{ animationDelay: `${idx * 0.1}s` }} />
          ))}
        </div>
      </div>
    </section>
  )
}
