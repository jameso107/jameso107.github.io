import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to just below the header (approximately 120px from top)
    // This ensures the header doesn't cover the top section content
    // Use setTimeout to ensure the page has rendered before scrolling
    // Use instant scroll for better mobile compatibility
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 120)
    }, 0)

    return () => clearTimeout(scrollTimer)
  }, [pathname])

  return null
}

