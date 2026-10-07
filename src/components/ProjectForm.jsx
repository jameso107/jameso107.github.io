import { useState } from 'react'
import { CONTACT_EMAIL } from '../data/routeMeta'
import { firstTouch } from '../lib/attribution'

// Homebase's public lead endpoint. It creates the contact, the company and a
// lead on the pipeline, and emails the team at once. It accepts requests only
// from syzygy.services.
const LEADS_ENDPOINT =
  import.meta.env.VITE_LEADS_ENDPOINT || 'https://homebase.syzygy.services/api/leads'

const inputClass =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-500 ' +
  'outline-none transition-all duration-200 focus:border-violet-400/60 focus:bg-white/[0.07] ' +
  'focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50'

const HOW_HEARD = [
  '',
  'Google or another search engine',
  'ChatGPT, Claude or another AI assistant',
  'LinkedIn',
  'A referral from someone I know',
  'An event',
  'Other',
]

function Field({ label, htmlFor, required, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-2">
        {label}
        {required && <span className="text-violet-400 ml-1">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-rose-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function ProjectForm() {
  // A bot that posts the instant the page loads is filed as spam server-side.
  const [renderedAt] = useState(() => Date.now())
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    how_heard: '',
    website: '', // honeypot
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [submitError, setSubmitError] = useState('')

  const update = (name) => (e) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (values.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'A sentence or two about what you need helps us reply usefully.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    setSubmitError('')
    if (!validate()) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim() || null,
          message: values.message.trim(),
          how_heard: values.how_heard || null,
          website: values.website || null,
          rendered_at: renderedAt,
          ...firstTouch(),
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || 'Something went wrong.')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-10 border border-white/10 text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-8 text-white">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Thanks, {values.name.trim().split(' ')[0]}</h3>
        <p className="text-slate-300/90 max-w-lg mx-auto leading-relaxed">
          Your note reached us. One of us will reply to{' '}
          <span className="text-violet-300">{values.email.trim()}</span> within one business day.
        </p>
      </div>
    )
  }

  const busy = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 md:p-10 border border-white/10 text-left"
    >
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="project-website">Leave this field empty</label>
        <input
          id="project-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update('website')}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" htmlFor="project-name" required error={errors.name}>
          <input
            id="project-name"
            type="text"
            autoComplete="name"
            className={inputClass}
            value={values.name}
            onChange={update('name')}
            disabled={busy}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'project-name-error' : undefined}
          />
        </Field>
        <Field label="Work email" htmlFor="project-email" required error={errors.email}>
          <input
            id="project-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={values.email}
            onChange={update('email')}
            disabled={busy}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'project-email-error' : undefined}
          />
        </Field>
        <Field label="Company" htmlFor="project-company">
          <input
            id="project-company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            value={values.company}
            onChange={update('company')}
            disabled={busy}
          />
        </Field>
        <Field label="How did you hear about us?" htmlFor="project-how-heard">
          <select
            id="project-how-heard"
            className={`${inputClass} appearance-none`}
            value={values.how_heard}
            onChange={update('how_heard')}
            disabled={busy}
          >
            {HOW_HEARD.map((option) => (
              <option key={option} value={option} className="bg-slate-900">
                {option || 'Choose one (optional)'}
              </option>
            ))}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field label="What are you hoping to fix or build?" htmlFor="project-message" required error={errors.message}>
            <textarea
              id="project-message"
              rows={5}
              className={inputClass}
              value={values.message}
              onChange={update('message')}
              disabled={busy}
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? 'project-message-error' : undefined}
            />
          </Field>
        </div>
      </div>

      {status === 'error' && submitError ? (
        <p role="alert" className="mt-5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {submitError} You can also email{' '}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-slate-500">We reply within one business day. No mailing lists.</p>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3.5 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 disabled:opacity-60"
        >
          {busy ? 'Sending…' : 'Start a project'}
        </button>
      </div>
    </form>
  )
}
