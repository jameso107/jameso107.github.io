import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import ProcessPage from './pages/ProcessPage'
import PricingPage from './pages/PricingPage'
import TeamPage from './pages/TeamPage'
import CareersPage from './pages/CareersPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ScrollToTop from './components/ScrollToTop'
import Analytics from './components/Analytics'

function App() {
  return (
    <Router>
      <Analytics />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </Router>
  )
}

export default App

