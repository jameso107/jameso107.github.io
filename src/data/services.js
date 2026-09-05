// The four engagement types, in the order they appear on /pricing/.
//
// Shared by the homepage Services section, the Pricing cards, the Service
// structured data, the article CTA cards (frontmatter `cta.service` maps onto
// `id` via CTA_SERVICE_MAP), and the generated llms.txt. Engagement lengths
// come from the Process page timelines; no dollar figures live here on purpose
// (pricing is pending owner confirmation).

export const services = [
  {
    id: 'audit',
    type: 'Audit',
    title: 'AI Audit & Prototyping',
    shortName: 'AI audit and prototyping',
    description:
      'We map how your business actually runs, find the highest-return places AI or automation can help, and build a working prototype so you can see the improvement before committing to a full build.',
    length: 'Audit 2–4 weeks · Prototype 4–6 weeks',
    features: [
      'Discovery sessions',
      'ROI/feasibility analysis',
      'Internal/external audit',
      'Create a functional prototype',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    popular: true,
  },
  {
    id: 'implementation',
    type: 'Implementation',
    title: 'AI Implementation',
    shortName: 'Implementation',
    description:
      'We build the production version, integrate it with the systems you already use, document it, and train your team to run it without us.',
    length: 'Typically 8–12 weeks',
    features: [
      'Unlock production level ROI',
      'Full documentation and training',
      'Integrate into existing tech stack',
    ],
    gradient: 'from-violet-500 to-purple-600',
    popular: false,
  },
  {
    id: 'partnership',
    type: 'Retainer',
    title: 'Ongoing Partnership',
    shortName: 'Ongoing partnership',
    description:
      'A standing relationship after launch: iterations and support, monthly updates on what is new and worth your attention, continuous training, and strategy support for your leadership team.',
    length: 'Monthly, ongoing',
    features: [
      'Iterations & support',
      'Monthly emerging tech updates',
      'Continuous training',
      'Board room strategy support',
    ],
    gradient: 'from-cyan-500 to-blue-500',
    popular: false,
  },
  {
    id: 'technology',
    type: 'Advisory',
    title: 'Technology Consulting',
    shortName: 'Technology consulting and fractional technology leadership',
    description:
      'Fractional technology leadership for companies without a technical executive: website and product decisions, integrations between the tools you already pay for, vendor selection, and a roadmap you can hold people to.',
    length: null,
    features: [
      'Website design & development',
      'Technology integrations',
      'Product advising & strategy',
    ],
    gradient: 'from-pink-500 to-rose-500',
    popular: false,
  },
]

// Frontmatter `cta.service` values -> service card id.
export const CTA_SERVICE_MAP = {
  audit: 'audit',
  prototype: 'audit',
  implementation: 'implementation',
  technology: 'technology',
  partnership: 'partnership',
}

export const getService = (id) => services.find((service) => service.id === id) || services[0]
export const getServiceForCta = (ctaService) => getService(CTA_SERVICE_MAP[ctaService] || 'audit')
export const servicePricingUrl = (id) => `/pricing/#${id}`

// Timelines as stated on /process/. Kept here so the FAQs, llms.txt and the
// pricing cards quote the same numbers.
export const processSteps = [
  {
    title: 'Discovery Audit',
    timeline: '2–4 weeks',
    summary:
      'We unpack the job to be done, workflows, and constraints, working alongside your people, and leave you with an AI readiness assessment, an ROI opportunity analysis, and a 90-day roadmap.',
  },
  {
    title: 'Design and Prototype',
    timeline: '4–6 weeks',
    summary:
      'We spec the user experience, data strategy, evaluation plan, and success metrics, then build a working prototype or pilot your team can test on real work.',
  },
  {
    title: 'Build and Implement',
    timeline: '8–12 weeks',
    summary:
      'We turn the prototype into a production system integrated with your existing tools, with documentation, training, and security hardening.',
  },
  {
    title: 'Measure and Improve',
    timeline: 'Ongoing',
    summary:
      'We report the ROI and impact, then iterate with real-world feedback through an ongoing partnership if you want one.',
  },
]
