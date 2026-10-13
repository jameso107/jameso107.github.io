// The five services, in the order they appear on /pricing/. They mirror the
// "Ways to Work Together" page of the client packets: Training and the Audit
// are the main offerings (`primary`), the rest sit under "Also available".
//
// Shared by the homepage Services section, the Pricing cards, the Service
// structured data, the article CTA cards (frontmatter `cta.service` maps onto
// `id` via CTA_SERVICE_MAP), and the generated llms.txt.
//
// `pricing` holds the owner-confirmed figures, published as starting rates.
// `headline` and `detail` are the visible copy on the pricing card; `offers`
// feeds Service.offers in the structured data and holds numbers only
// (minPrice / maxPrice in USD, optional unitText for recurring fees). A
// service without a published number gets an empty `offers` list rather than
// a "Quoted after the audit" string, which schema.org would reject as a price.

export const services = [
  {
    id: 'training',
    type: 'Training',
    title: 'AI Training',
    shortName: 'AI training for teams',
    description:
      'Live, hands-on workshops built on your own documents, jobs, and questions, so your team leaves using AI on real work instead of figuring it out alone.',
    length: 'Essentials 2 workshops · Playbook about 4 weeks',
    pricing: {
      headline: 'Starting at $2,000',
      detail: 'AI Essentials Training from $2,000. AI Playbook Training from $3,500.',
      offers: [
        { name: 'AI Essentials Training', minPrice: 2000 },
        { name: 'AI Playbook Training', minPrice: 3500 },
      ],
    },
    features: [
      'Essentials: two live workshops, a cheat sheet, and a starter prompt library',
      'Playbook: team interviews, three workshops, and a custom AI Playbook',
      'Reusable AI tools set up for your work (Playbook)',
      'Email support after the sessions',
    ],
    gradient: 'from-violet-500 to-purple-600',
    primary: true,
  },
  {
    id: 'audit',
    type: 'Audit',
    title: 'AI Audit',
    shortName: 'AI audit',
    description:
      'We interview your team and map how work actually moves through the business, then show you where AI fits, what to buy versus build, and the order to do it in.',
    length: 'Typically 2–4 weeks',
    pricing: {
      headline: 'Starting at $4,000',
      detail: 'Pair it with AI Playbook Training from $6,500 and save $1,000.',
      offers: [
        { name: 'AI Audit', minPrice: 4000 },
        { name: 'Audit + AI Playbook Training', minPrice: 6500 },
      ],
    },
    features: [
      'Interviews with your team',
      'A map of your process, start to finish',
      'Where AI fits, and what to buy vs. build',
      'A data safety check',
      'A prioritized action plan, walked through live',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    primary: true,
  },
  {
    id: 'partnership',
    type: 'Retainer',
    title: 'Ongoing Partnership',
    shortName: 'Ongoing AI advising partnership',
    description:
      'A standing advisor once the first engagement wraps: a biweekly call, a shared doc for your team’s questions, and research on the new tools worth your attention.',
    length: 'Month to month',
    pricing: {
      headline: 'Starting at $1,000/month',
      detail: 'Month to month, scaled to how much support your team wants.',
      offers: [{ name: 'Ongoing Partnership', minPrice: 1000, unitText: 'MONTH' }],
    },
    features: [
      'Biweekly advising call',
      'Shared question doc for your team',
      'Research on new tools and updates',
      'Iterations and continuous training as you grow',
    ],
    gradient: 'from-cyan-500 to-blue-500',
    primary: false,
  },
  {
    id: 'custom-tools',
    type: 'Build',
    title: 'Custom Tools & Builds',
    shortName: 'Custom AI tools and software builds',
    description:
      'Tools built around how your business runs, like an estimating assistant, a tracker for every job, or a project hub for schedules, tasks, and client updates.',
    length: null,
    pricing: {
      headline: 'Quoted after the audit',
      detail: 'Priced to the scope once we know what to build and which systems it touches.',
      offers: [],
    },
    features: [
      'Built around your real workflows',
      'Integrated with the tools you already use',
      'Full documentation and training',
    ],
    gradient: 'from-indigo-500 to-violet-500',
    primary: false,
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
    primary: false,
  },
]

// The Audit + AI Playbook Training package, the "Most popular" card on
// /pricing/. Its price is also an offer on the audit service above.
export const bundle = {
  id: 'audit-training',
  title: 'Audit + AI Playbook Training',
  headline: 'Starting at $6,500',
  savings: 'Save $1,000',
  description:
    'The audit tells us exactly what to teach, so the training lands faster. You get everything in both.',
  gradient: 'from-violet-500 to-sky-500',
}

// Frontmatter `cta.service` values -> service card id. `prototype` and
// `implementation` are retired service names, kept so older articles still
// land on the closest current service.
export const CTA_SERVICE_MAP = {
  training: 'training',
  audit: 'audit',
  prototype: 'custom-tools',
  implementation: 'custom-tools',
  'custom-tools': 'custom-tools',
  technology: 'technology',
  partnership: 'partnership',
}

// One-paragraph version of the figures above, for llms.txt and anywhere else
// the pricing model has to be stated in prose. Keep in step with `pricing`.
export const PRICING_MODEL =
  'All prices are starting rates for a typical small team and adjust for larger groups. AI Training starts at $2,000 for AI Essentials Training (two live workshops) and $3,500 for AI Playbook Training (about four weeks, with a custom AI Playbook). The AI Audit starts at $4,000 and typically takes 2–4 weeks; the Audit + AI Playbook Training package starts at $6,500, a $1,000 saving. The Ongoing Partnership starts at $1,000 per month, month to month. Custom Tools & Builds are quoted after the audit, and Technology Consulting is quoted per engagement. Every engagement is quoted individually after an intro call.'

export const getService = (id) => services.find((service) => service.id === id) || services[0]
export const getServiceForCta = (ctaService) => getService(CTA_SERVICE_MAP[ctaService] || 'audit')
export const servicePricingUrl = (id) => `/pricing/#${id}`
