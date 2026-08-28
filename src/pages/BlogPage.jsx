import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { routeMeta } from '../data/routeMeta'
import { breadcrumbSchema } from '../utils/structuredData'
import { getAllPosts } from '../data/blogPosts'

export default function BlogPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://syzygy.services' },
    { name: 'Blog', url: 'https://syzygy.services/blog' }
  ])

  const blogPosts = getAllPosts()

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        {...routeMeta['/blog']}
        structuredData={breadcrumbs}
      />
      <Header />
      <section className="pt-32 pb-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/20"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 animate-reveal">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Blog
            </h2>
            <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
              Thoughts on AI, consulting, and building solutions that actually work
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-20 animate-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 mx-auto text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
                <p className="text-slate-400">
                  Blog posts will appear here soon. Check back for insights on AI consulting, strategy, and implementation.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, idx) => (
                <article
                  key={post.id}
                  className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative z-10">
                    <div className="text-xs text-slate-400 font-mono mb-3">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{post.author}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-sm text-violet-400 hover:text-violet-300 transition-colors duration-300 inline-flex items-center gap-1"
                      >
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

