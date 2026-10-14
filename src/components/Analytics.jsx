import { useEffect } from 'react'

// Google Analytics 4. The measurement ID is public (it ships in every page),
// so it lives here rather than in a build secret.
// Page views on client-side route changes are picked up by GA4's enhanced
// measurement ("page changes based on browser history events"), on by default.
const GA_MEASUREMENT_ID = 'G-FCVFD8P5T9'

export default function Analytics() {
  useEffect(() => {
    // Keep local dev and previews out of the numbers
    if (!import.meta.env.PROD || window.gtag) return

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID)
  }, [])

  return null
}
