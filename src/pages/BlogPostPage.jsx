import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { breadcrumbSchema } from '../utils/structuredData'
import { getPostBySlug } from '../data/blogPosts'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
        <Header />
        <section className="pt-32 pb-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-slate-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300"
            >
              Back to Blog
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://syzygy.services' },
    { name: 'Blog', url: 'https://syzygy.services/blog' },
    { name: post.title, url: `https://syzygy.services/blog/${post.slug}` }
  ])

  // Create article schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'SYZYGY.services',
      logo: {
        '@type': 'ImageObject',
        url: 'https://syzygy.services/logo.png'
      }
    }
  }

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title={`${post.title} | SYZYGY.services Blog`}
        description={post.excerpt}
        keywords="AI aptitude, Midwest small business, midsized business AI, AI consulting service, Michigan AI consulting, small business AI, AI for small business, Midwest AI consulting"
        canonicalUrl={`https://syzygy.services/blog/${post.slug}`}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbs, articleSchema]
        }}
      />
      <Header />
      <article className="pt-32 pb-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/10"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/10"></div>
        </div>

        <div className="mx-auto max-w-4xl px-6">
          {/* Back to blog link */}
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors duration-300 mb-8 animate-reveal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
          </Link>

          {/* Post header */}
          <header className="mb-12 animate-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="text-sm text-slate-400 font-mono mb-4">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {post.author}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-violet-400 to-sky-400"></div>
          </header>

          {/* Post content */}
          <div 
            className="animate-reveal blog-content"
            style={{ animationDelay: '0.2s' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author info */}
          <div className="mt-12 pt-8 border-t border-white/10 animate-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-white">{post.author}</div>
                <div className="text-sm text-slate-400">Founder & CEO, SYZYGY.services</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 animate-reveal" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your AI Aptitude?</h3>
            <p className="text-slate-300 mb-6">
              Let's discuss how SYZYGY.services can help your Midwest small or midsized business harness the power of AI.
            </p>
            <a 
              href="https://calendly.com/syzygy-intro/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50"
            >
              Schedule a Consultation
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}

