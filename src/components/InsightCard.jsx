import { Link } from 'react-router-dom'
import SpotlightCard from './SpotlightCard'
import { insightPath } from '../data/routeMeta'

// One article card. `featured` renders the large hero variant used at the top
// of /insights/. No dates anywhere, by design: articles are evergreen.
export default function InsightCard({ article, featured = false, style, headingLevel = 'h3' }) {
  const Heading = headingLevel
  const href = `${insightPath(article.slug)}/`

  if (featured) {
    return (
      <SpotlightCard
        spotlightColor="rgba(167, 139, 250, 0.16)"
        className="group rounded-3xl bg-gradient-to-br from-violet-500/15 via-white/5 to-sky-500/10 backdrop-blur-sm border border-white/15 hover:border-white/30 transition-all duration-500 hover:shadow-2xl animate-reveal overflow-hidden"
        style={style}
      >
        <Link to={href} className="relative z-10 block p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-6">
            <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-violet-200">Featured</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>
          <Heading className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight group-hover:text-violet-200 transition-colors duration-300 max-w-4xl">
            {article.title}
          </Heading>
          <p className="mt-6 text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-3xl">{article.dek}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 group-hover:text-white transition-colors duration-300">
            Read the article
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </SpotlightCard>
    )
  }

  return (
    <SpotlightCard
      spotlightColor="rgba(56, 189, 248, 0.14)"
      className="group rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-reveal overflow-hidden flex"
      style={style}
    >
      <Link to={href} className="relative z-10 flex flex-col p-6 md:p-7 flex-1">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-4">
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingMinutes} min read</span>
        </div>
        <Heading className="text-xl font-bold text-white leading-snug group-hover:text-violet-300 transition-colors duration-300">
          {article.title}
        </Heading>
        <p className="mt-3 text-sm text-slate-300/90 leading-relaxed flex-1">{article.dek}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm text-violet-400 group-hover:text-violet-300 transition-colors duration-300">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </SpotlightCard>
  )
}
