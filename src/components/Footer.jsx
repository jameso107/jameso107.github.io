import { Link } from 'react-router-dom'
import Logo from './Logo'

const footerLinks = [
  { to: '/process', label: 'Our Process' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/team', label: 'Our Team' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
]

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

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:james@syzygy.services"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
