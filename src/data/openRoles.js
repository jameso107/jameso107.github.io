// Open roles shown on /careers.
//
// Leave `openRoles` empty to run a general "always accepting applications"
// page. Add an entry and the page grows a role card for it automatically and
// the application form's "Role of interest" dropdown picks it up -- no other
// file needs to change.
//
// Each role:
//   id          unique slug, also the value stored in job_applications.role_interest
//   title       display name
//   type        e.g. 'Full-time', 'Internship', 'Contract'
//   location    e.g. 'Ann Arbor, MI / Remote'
//   summary     one or two sentences for the card
//   highlights  short bullets shown under the summary
//   gradient    tailwind gradient used for the card's accent glow

export const openRoles = []

// The general application is always available, listed last in the dropdown.
export const GENERAL_APPLICATION = 'General application'

export const roleOptions = [
  ...openRoles.map((role) => role.title),
  GENERAL_APPLICATION,
]

// What the work actually looks like -- mirrors the language used in the
// original recruiting form.
export const responsibilities = [
  'Map workflows and uncover opportunities for automation',
  'Analyze business problems and create ROI-backed recommendations',
  'Support development of AI products and client deliverables',
  'Research tools, trends, and best practices',
]

export const idealCandidate = [
  'You love breaking down problems',
  'You’re curious about AI and the future of work',
  'You communicate clearly and think analytically',
  'You want hands-on experience with real clients and real impact',
]
