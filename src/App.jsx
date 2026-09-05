import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import ProcessPage from './pages/ProcessPage'
import PricingPage from './pages/PricingPage'
import TeamPage from './pages/TeamPage'
import CareersPage from './pages/CareersPage'
import InsightsPage from './pages/InsightsPage'
import InsightPage from './pages/InsightPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './components/ScrollToTop'
import Analytics from './components/Analytics'

// Router-agnostic tree. The browser wraps it in <BrowserRouter> (below); the
// prerender step wraps it in <StaticRouter> (src/entry-server.jsx).
export function AppRoutes() {
  return (
    <>
      <Analytics />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:slug" element={<InsightPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
