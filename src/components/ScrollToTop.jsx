import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Land at the very top on every route change.
    // (Section top padding already clears the fixed header, so no offset is needed.)
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)

    return () => clearTimeout(scrollTimer)
  }, [pathname])

  return null
}

