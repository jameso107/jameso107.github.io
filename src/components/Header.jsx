import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-[#0b1020]/80' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`glass mt-4 rounded-2xl shadow-lg flex items-center justify-between p-3 transition-all duration-300 ${scrolled ? 'border-white/20 shadow-2xl' : ''}`}>
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative size-10 rounded-full bg-gradient-to-tr from-violet-500 via-purple-500 to-sky-400 grid place-items-center font-bold text-white shadow-[0_0_20px_rgba(167,139,250,0.5)] group-hover:shadow-[0_0_30px_rgba(167,139,250,0.8)] transition-all duration-300">
              <span className="relative z-10">S</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-sky-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            </div>
            <span className="font-semibold tracking-wide text-lg">
              SYZYGY<span className="text-violet-400 bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">.services</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {['Definition', 'Services', 'Process', 'Work', 'Pricing'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-slate-300 hover:text-white relative group transition-colors duration-200"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-2.5 font-medium text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
            >
              Start a Project
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M13.5 4.5h6v6m0-6L10 14"/>
              </svg>
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
            {['Definition', 'Services', 'Process', 'Work', 'Pricing', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="block py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200" 
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
