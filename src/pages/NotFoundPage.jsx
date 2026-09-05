import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { NOT_FOUND_META } from '../data/routeMeta'

// Rendered into dist/404.html, which GitHub Pages serves for any path without
// a file. Unknown client-side routes land here too.
export default function NotFoundPage() {
  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO {...NOT_FOUND_META} />
      <Header />
      <section className="pt-32 pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center animate-reveal">
          <div className="text-sm font-mono text-slate-400 mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Page not found</h1>
          <p className="text-lg text-slate-300/90 mb-10">
            That page does not exist or has moved. Our articles for owners and operators now live under Insights.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300"
            >
              Back to home
            </Link>
            <Link
              to="/insights/"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-slate-200 hover:border-white/25 hover:bg-white/10 transition-all duration-300"
            >
              Browse insights
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
