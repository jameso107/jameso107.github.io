import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = (e) => {
    // If on homepage, replay animation by clearing sessionStorage and reloading
    if (location.pathname === '/') {
      e.preventDefault()
      sessionStorage.removeItem('openingAnimationShown')
      window.location.reload()
    }
  }

  return (
    <header className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl ${scrolled ? 'bg-[#0b1020]/80' : 'bg-[#0b1020]/40'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className={`glass rounded-2xl shadow-lg flex items-center justify-between p-3 transition-all duration-300 ${scrolled ? 'border-white/20 shadow-2xl' : ''}`}>
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <Logo size="md" />
            </div>
            <span className="font-semibold tracking-wide text-lg">
              SYZYGY<span className="text-violet-400 bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">.services</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link 
              to="/process" 
              className="text-slate-300 hover:text-white relative group transition-colors duration-200"
            >
              Our Process
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/case-studies" 
              className="text-slate-300 hover:text-white relative group transition-colors duration-200"
            >
              Customer Stories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/pricing" 
              className="text-slate-300 hover:text-white relative group transition-colors duration-200"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/team" 
              className="text-slate-300 hover:text-white relative group transition-colors duration-200"
            >
              Our Team
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a 
              href="https://calendly.com/jamesoo-umich"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-2.5 font-medium text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
            >
              Start a Project
            </a>
          </nav>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex size-10 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200" 
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-reveal">
          <div className="glass mt-2 rounded-2xl p-4 space-y-2 border-white/20">
            <Link 
              to="/process" 
              className="block py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Our Process
            </Link>
            <Link 
              to="/case-studies" 
              className="block py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Customer Stories
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/team" 
              className="block py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(false)}
            >
              Our Team
            </Link>
            <a 
              href="https://calendly.com/jamesoo-umich"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
