import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { CONTACT_EMAIL, LEGAL_NAME, PHONE_DISPLAY, PHONE_TEL_HREF } from '../data/routeMeta'

const footerLinks = [
  { to: '/process/', label: 'Our Process' },
  { to: '/pricing/', label: 'Pricing' },
  { to: '/insights/', label: 'Insights' },
  { to: '/team/', label: 'Our Team' },
  { to: '/careers/', label: 'Careers' },
]

// Baked in at build time (vite.config.js `define`) so the prerendered HTML and
// the first client render agree; refreshed after hydration in case the site
// has not been rebuilt since New Year.
const BUILD_YEAR = typeof __BUILD_YEAR__ !== 'undefined' ? __BUILD_YEAR__ : '2026'

export default function Footer() {
  const [year, setYear] = useState(BUILD_YEAR)
  useEffect(() => {
    setYear(String(new Date().getFullYear()))
  }, [])

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
              © {year} <span className="font-semibold text-white">{LEGAL_NAME}</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" aria-label="Footer">
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
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href={PHONE_TEL_HREF}
              className="text-slate-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
        <p className="mt-8 text-sm text-slate-500 max-w-3xl">
          Syzygy is a consulting firm for small and mid-sized businesses that leads with AI. Based in Michigan, serving the Midwest and remote clients nationwide.
        </p>
      </div>
    </footer>
  )
}
