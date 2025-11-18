import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-16 border-t border-white/10 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl bg-violet-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-slate-400">
              © {currentYear} <span className="font-semibold text-white">SYZYGY<span className="text-violet-400">.services</span></span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            {['Work', 'Contact'].map((link) => (
              <a 
                key={link}
                href={`#${link.toLowerCase()}`} 
                className="text-slate-400 hover:text-white relative group transition-colors duration-200"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
