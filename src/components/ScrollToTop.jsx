import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to just below the header (approximately 120px from top)
    // This ensures the header doesn't cover the top section content
    window.scrollTo({
      top: 120,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

