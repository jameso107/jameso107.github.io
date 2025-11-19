import { useState } from 'react'
import Header from '../components/Header'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { breadcrumbSchema } from '../utils/structuredData'

export default function ProcessPage() {
  const [expandedStep, setExpandedStep] = useState(null)

  const steps = [
    {
      number: '01',
      title: 'Discovery Audit',
      subtitle: 'Discover',
      description: 'We unpack the job‑to‑be‑done, workflows, and constraints. We work alongside your people every step of the way.',
      gradient: 'from-violet-500 to-purple-600',
      timeline: '2-4 weeks',
      deliverables: [
        'AI Readiness Assessment Report',
        'ROI Opportunity Analysis',
        'Risk & Feasibility Evaluation',
        '90-Day Strategic Roadmap'
      ],
      clientInvolvement: [
        'Participate in discovery sessions',
        'Provide access to key stakeholders',
        'Share business goals and constraints',
        'Review and approve audit findings'
      ],
      keyActivities: [
        'Stakeholder interviews and workshops',
        'Workflow and process analysis',
        'Technology stack assessment',
        'Competitive landscape review'
      ],
      outcomes: [
        'Clear understanding of AI opportunities',
        'Prioritized list of high-ROI initiatives',
        'Risk mitigation strategies',
        'Actionable implementation plan'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Design and Prototype',
      subtitle: 'Design',
      description: 'Spec the UX, retrieval strategy, evaluation plan, and success metrics to unlock real value for your business. Your dreams are translated into real code.',
      gradient: 'from-sky-400 to-blue-500',
      timeline: '4-6 weeks',
      deliverables: [
        'Working prototype or pilot',
        'User experience specifications',
        'Technical architecture design',
        'Evaluation and testing framework'
      ],
      clientInvolvement: [
        'Provide feedback on prototypes',
        'Participate in user testing sessions',
        'Validate design decisions',
        'Approve technical approach'
      ],
      keyActivities: [
        'UX/UI design and wireframing',
        'Retrieval strategy development',
        'Rapid prototyping and iteration',
        'User testing and feedback collection'
      ],
      outcomes: [
        'Validated proof of concept',
        'User-tested interface design',
        'Clear success metrics defined',
        'Team trained on prototype usage'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-4-8a2 2 0 012 2v6a2 2 0 01-2 2h-6m-4-4V8a2 2 0 012-2h2M9 12h6" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Build and Implement',
      subtitle: 'Build',
      description: 'Integrate real AI solutions into your business processes. Our custom or 3rd-party tools will unlock real ROI into your business.',
      gradient: 'from-cyan-400 to-blue-500',
      timeline: '8-12 weeks',
      deliverables: [
        'Production-ready AI solution',
        'Complete documentation',
        'Team training materials',
        'Integration with existing systems'
      ],
      clientInvolvement: [
        'Provide production environment access',
        'Participate in training sessions',
        'Support integration testing',
        'Approve go-live decisions'
      ],
      keyActivities: [
        'Custom development or tool integration',
        'Security and compliance hardening',
        'Performance optimization',
        'Comprehensive testing and QA'
      ],
      outcomes: [
        'Fully functional AI system in production',
        'Team trained and ready to operate',
        'Documentation for ongoing support',
        'Measurable ROI from day one'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      number: '04',
      title: 'Measure and Improve',
      subtitle: 'Measure',
      description: 'We showcase the ROI and impact your team has now unlocked. Iterate with real‑world feedback.',
      gradient: 'from-pink-400 to-rose-500',
      timeline: 'Ongoing',
      deliverables: [
        'ROI impact report',
        'Performance analytics dashboard',
        'Iteration roadmap',
        'Continuous improvement plan'
      ],
      clientInvolvement: [
        'Share usage data and feedback',
        'Participate in review sessions',
        'Prioritize improvement opportunities',
        'Approve enhancement requests'
      ],
      keyActivities: [
        'Performance monitoring and analytics',
        'User feedback collection',
        'ROI measurement and reporting',
        'Iterative improvements and updates'
      ],
      outcomes: [
        'Quantified business impact',
        'Optimized system performance',
        'Continuous value delivery',
        'Scalable growth path'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ]

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://syzygy.services' },
    { name: 'Our Process', url: 'https://syzygy.services/process' }
  ])

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="AI Consulting Process | How We Work"
        description="Learn about SYZYGY.services proven AI consulting service process for Michigan and Midwest small businesses: Discovery Audit, Design & Prototype, Build & Implement, and Measure & Improve. A structured approach to AI success."
        keywords="AI consulting process, AI consulting service process, AI strategy development, AI implementation process, AI consulting methodology, Michigan AI consulting, Midwest AI consulting"
        canonicalUrl="https://syzygy.services/process"
        structuredData={breadcrumbs}
      />
      <Header />
      <section className="pt-32 pb-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-sky-500/20"></div>
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-20 animate-reveal">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              How we work
            </h2>
            <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
              A proven process that delivers results
            </p>
          </div>
          
          {/* Vertical Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500/30 via-sky-500/30 to-pink-500/30 hidden md:block"></div>
            
            {steps.map((step, idx) => {
              const isExpanded = expandedStep === idx
              const progress = ((idx + 1) / steps.length) * 100
              
              return (
                <div key={step.number} className="relative mb-16 md:mb-24 last:mb-0">
                  {/* Timeline dot and connector */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 top-12 md:top-16 z-20">
                    <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${step.gradient} p-1 shadow-2xl transition-all duration-500 ${isExpanded ? 'scale-110' : 'scale-100'}`}>
                      <div className="w-full h-full rounded-full bg-[#0b1020] flex items-center justify-center">
                        <div className={`transition-colors duration-300 ${
                          step.gradient.includes('violet') ? 'text-violet-400' :
                          step.gradient.includes('sky') ? 'text-sky-400' :
                          step.gradient.includes('cyan') ? 'text-cyan-400' :
                          'text-pink-400'
                        }`}>
                          {step.icon}
                        </div>
                      </div>
                      {/* Progress ring */}
                      <div className="absolute inset-0 rounded-full border-4 border-transparent" style={{
                        background: `conic-gradient(from 0deg, ${step.gradient.includes('violet') ? '#8b5cf6' : step.gradient.includes('sky') ? '#0ea5e9' : step.gradient.includes('cyan') ? '#06b6d4' : '#f43f5e'} ${progress}%, transparent ${progress}%)`,
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        padding: '4px'
                      }}></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`relative ml-20 md:ml-0 md:w-[calc(50%-60px)] group cursor-pointer transition-all duration-500 ${
                      idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                    onClick={() => setExpandedStep(isExpanded ? null : idx)}
                  >
                    <div className={`relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border transition-all duration-500 overflow-hidden ${
                      isExpanded 
                        ? `border-white/30 shadow-2xl scale-[1.02]` 
                        : 'border-white/10 hover:border-white/20 hover:shadow-xl'
                    }`}>
                      {/* Gradient glow */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 ${isExpanded ? 'opacity-20' : 'group-hover:opacity-10'} blur-xl transition-opacity duration-500 z-0`}></div>
                      
                      <div className="relative z-10 p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className={`text-sm font-mono mb-2 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                              {step.number} • {step.timeline}
                            </div>
                            <h3 className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                              {step.title}
                            </h3>
                            {step.subtitle && (
                              <div className="text-sm text-slate-400 mb-4">{step.subtitle}</div>
                            )}
                            <p className="text-slate-300 leading-relaxed">{step.description}</p>
                          </div>
                          {/* Expand/Collapse indicator */}
                          <div className={`ml-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-400">
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-white/10 space-y-6 animate-reveal">
                            {/* Deliverables */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`}></span>
                                Deliverables
                              </h4>
                              <ul className="space-y-2">
                                {step.deliverables.map((item, i) => (
                                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex-shrink-0"></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Client Involvement */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`}></span>
                                Your Involvement
                              </h4>
                              <ul className="space-y-2">
                                {step.clientInvolvement.map((item, i) => (
                                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex-shrink-0"></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Key Activities */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`}></span>
                                Key Activities
                              </h4>
                              <ul className="space-y-2">
                                {step.keyActivities.map((item, i) => (
                                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex-shrink-0"></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Outcomes */}
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient}`}></span>
                                Expected Outcomes
                              </h4>
                              <ul className="space-y-2">
                                {step.outcomes.map((item, i) => (
                                  <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                                    <span className="mt-1.5 size-1.5 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex-shrink-0"></span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Contact 
        heading="Ready to start this process with"
        headingHighlight="your team"
        description="No commitment needed, let's talk AI."
        headingGradient="from-violet-400 to-sky-400"
      />
      <Footer />
    </div>
  )
}

