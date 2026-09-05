// The four engagement types, in the order they appear on /pricing/.
//
// Shared by the homepage Services section, the Pricing cards, the Service
// structured data, the article CTA cards (frontmatter `cta.service` maps onto
// `id` via CTA_SERVICE_MAP), and the generated llms.txt. Engagement lengths
// come from the Process page timelines.
//
// `pricing` holds the owner-confirmed figures. `headline` and `detail` are the
// visible copy on the pricing card; `offers` feeds Service.offers in the
// structured data and holds numbers only (minPrice / maxPrice in USD, optional
// unitText for recurring fees). A tier without a published number gets an empty
// `offers` list rather than a "Contact for quote" string, which schema.org
// would reject as a price.

export const services = [
  {
    id: 'audit',
    type: 'Audit',
    title: 'AI Audit & Prototyping',
    shortName: 'AI audit and prototyping',
    description:
      'We map how your business actually runs, find the highest-return places AI or automation can help, and build a working prototype so you can see the improvement before committing to a full build.',
    length: 'Audit 2–4 weeks · Prototype 4–6 weeks',
    pricing: {
      headline: 'Starting at $3,000',
      detail: 'Discovery Audit from $3,000 (2–4 weeks). Design and Prototype typically $6,000–$8,000 (4–6 weeks).',
      offers: [
        { name: 'Discovery Audit', minPrice: 3000 },
        { name: 'Design and Prototype', minPrice: 6000, maxPrice: 8000 },
      ],
    },
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
    length: 'Typically 8–12+ weeks',
    pricing: {
      headline: 'Scoped per project',
      detail: 'Quoted after the prototype, based on the scope and the systems involved.',
      offers: [],
    },
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
    pricing: {
      headline: 'From $2,000 per month',
      detail: 'Month to month, with the scope set together after launch.',
      offers: [{ name: 'Ongoing Partnership', minPrice: 2000, unitText: 'MONTH' }],
    },
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
    pricing: {
      headline: 'Contact for quote',
      detail: 'Priced to the scope, from a single decision to a standing fractional role.',
      offers: [],
    },
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

// One-paragraph version of the figures above, for llms.txt and anywhere else
// the pricing model has to be stated in prose. Keep in step with `pricing`.
export const PRICING_MODEL =
  'AI Audit & Prototyping starts at $3,000 for the Discovery Audit (2–4 weeks); the Design and Prototype phase typically runs $6,000–$8,000 (4–6 weeks). AI Implementation is scoped per project (typically 8–12+ weeks). The Ongoing Partnership is from $2,000 per month. Technology Consulting is quoted per engagement. Every engagement is quoted individually after an intro call.'

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
