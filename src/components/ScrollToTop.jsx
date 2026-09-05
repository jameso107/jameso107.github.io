import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Land at the very top on every route change, or on the anchored section
    // when the URL carries a hash (e.g. /pricing/#audit from an article CTA).
    // (Section top padding already clears the fixed header, so no offset is needed.)
    const scrollTimer = setTimeout(() => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      if (target) {
        target.scrollIntoView({ block: 'start' })
      } else {
        window.scrollTo(0, 0)
      }
    }, 0)

    return () => clearTimeout(scrollTimer)
  }, [pathname, hash])

  return null
}
