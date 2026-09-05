import { useEffect, useRef, useState } from 'react'
import { roleOptions, GENERAL_APPLICATION } from '../data/openRoles'

// Supabase edge function on the syzygy-pipeline project. It stores the
// application + resume and emails james@syzygy.services.
const APPLY_ENDPOINT =
  import.meta.env.VITE_APPLY_ENDPOINT ||
  'https://emtyvxboqqzlfgaxlxfq.supabase.co/functions/v1/apply'

const MAX_FILE_BYTES = 10 * 1024 * 1024
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'txt', 'rtf']

const inputClass =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-500 ' +
  'outline-none transition-all duration-200 focus:border-violet-400/60 focus:bg-white/[0.07] ' +
  'focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50'

function formatBytes(size) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function extensionOf(name) {
  const parts = name.toLowerCase().split('.')
  return parts.length > 1 ? parts.pop() : ''
}

function Field({ label, htmlFor, required, error, hint, children }) {
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
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  )
}

export default function ApplicationForm({ defaultRole }) {
  // Bots that instantly POST a freshly loaded form are rejected server-side.
  const [renderedAt] = useState(() => Date.now())
  const fileInputRef = useRef(null)

  const [values, setValues] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    role_interest: defaultRole || roleOptions[0] || GENERAL_APPLICATION,
    availability: '',
    linkedin_url: '',
    portfolio_url: '',
    message: '',
    referral_source: '',
    website: '', // honeypot
  })
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [progress, setProgress] = useState(0)
  const [submitError, setSubmitError] = useState('')

  // Clicking a role card up on the page retargets the dropdown without
  // remounting the form, so anything already typed survives.
  useEffect(() => {
    if (defaultRole) setValues((prev) => ({ ...prev, role_interest: defaultRole }))
  }, [defaultRole])

  const update = (name) => (e) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const acceptFile = (candidate) => {
    if (!candidate) return
    if (!ALLOWED_EXTENSIONS.includes(extensionOf(candidate.name))) {
      setErrors((prev) => ({ ...prev, resume: 'Please upload a PDF, DOC, DOCX, TXT, or RTF file.' }))
      return
    }
    if (candidate.size > MAX_FILE_BYTES) {
      setErrors((prev) => ({ ...prev, resume: 'That file is over 10 MB. Please upload a smaller one.' }))
      return
    }
    setErrors((prev) => ({ ...prev, resume: undefined }))
    setFile(candidate)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    acceptFile(e.dataTransfer.files?.[0])
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const validate = () => {
    const next = {}
    if (values.full_name.trim().length < 2) next.full_name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!file) next.resume = 'Please attach your resume.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    setSubmitError('')
    if (!validate()) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }

    const data = new FormData()
    Object.entries(values).forEach(([key, value]) => data.append(key, value))
    data.append('rendered_at', String(renderedAt))
    if (file) data.append('resume', file)

    setStatus('submitting')
    setProgress(0)

    // XHR rather than fetch: it reports upload progress, which matters when
    // someone is pushing a multi-megabyte resume over a phone connection.
    const xhr = new XMLHttpRequest()
    xhr.open('POST', APPLY_ENDPOINT)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) setProgress(Math.round((event.loaded / event.total) * 100))
    }
    xhr.onload = () => {
      let body = {}
      try {
        body = JSON.parse(xhr.responseText)
      } catch {
        /* non-JSON response handled below */
      }
      if (xhr.status >= 200 && xhr.status < 300 && body.ok) {
        setStatus('success')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setStatus('error')
        setSubmitError(
          body.error || 'Something went wrong sending your application. Please try again.',
        )
      }
    }
    xhr.onerror = () => {
      setStatus('error')
      setSubmitError(
        'We could not reach the server. Check your connection and try again, or email james@syzygy.services directly.',
      )
    }
    xhr.send(data)
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-10 border border-white/10 text-center animate-reveal">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-8 text-white">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Application received</h3>
        <p className="text-slate-300/90 max-w-lg mx-auto leading-relaxed">
          Thanks for applying, {values.full_name.split(' ')[0]}. We read every application. If
          there&apos;s a fit, we&apos;ll reach out at{' '}
          <span className="text-violet-300">{values.email}</span>.
        </p>
      </div>
    )
  }

  const busy = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 md:p-10 border border-white/10"
    >
      {/* Honeypot: off-screen, not hidden, so bots that read styles still fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update('website')}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full name" htmlFor="full_name" required error={errors.full_name}>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            disabled={busy}
            value={values.full_name}
            onChange={update('full_name')}
            aria-invalid={errors.full_name ? 'true' : undefined}
            aria-describedby={errors.full_name ? 'full_name-error' : undefined}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </Field>

        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={busy}
            value={values.email}
            onChange={update('email')}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass}
            placeholder="jane@example.com"
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={busy}
            value={values.phone}
            onChange={update('phone')}
            className={inputClass}
            placeholder="(734) 555-0142"
          />
        </Field>

        <Field label="Location" htmlFor="location" hint="City and state is plenty.">
          <input
            id="location"
            name="location"
            type="text"
            disabled={busy}
            value={values.location}
            onChange={update('location')}
            className={inputClass}
            placeholder="Ann Arbor, MI"
          />
        </Field>

        <Field label="Role of interest" htmlFor="role_interest">
          {/* A real chevron element rather than a CSS background image: Tailwind's
              arbitrary-value parser silently drops an inline SVG data URI. */}
          <div className="relative">
            <select
              id="role_interest"
              name="role_interest"
              disabled={busy}
              value={values.role_interest}
              onChange={update('role_interest')}
              className={`${inputClass} appearance-none pr-12`}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role} className="bg-[#0b1020] text-white">
                  {role}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Field>

        <Field
          label="Availability"
          htmlFor="availability"
          hint="When you could start, and full- or part-time."
        >
          <input
            id="availability"
            name="availability"
            type="text"
            disabled={busy}
            value={values.availability}
            onChange={update('availability')}
            className={inputClass}
            placeholder="Summer 2026, full-time"
          />
        </Field>

        <Field label="LinkedIn" htmlFor="linkedin_url">
          <input
            id="linkedin_url"
            name="linkedin_url"
            type="url"
            inputMode="url"
            disabled={busy}
            value={values.linkedin_url}
            onChange={update('linkedin_url')}
            className={inputClass}
            placeholder="linkedin.com/in/janedoe"
          />
        </Field>

        <Field label="Portfolio, GitHub, or site" htmlFor="portfolio_url">
          <input
            id="portfolio_url"
            name="portfolio_url"
            type="url"
            inputMode="url"
            disabled={busy}
            value={values.portfolio_url}
            onChange={update('portfolio_url')}
            className={inputClass}
            placeholder="github.com/janedoe"
          />
        </Field>
      </div>

      {/* Resume dropzone */}
      <div className="mt-6">
        <span className="block text-sm font-medium text-slate-300 mb-2">
          Resume<span className="text-violet-400 ml-1">*</span>
        </span>

        {file ? (
          <div className="flex items-center gap-4 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 text-violet-300">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-white">{file.name}</div>
              <div className="text-xs text-slate-400">{formatBytes(file.size)}</div>
            </div>
            <button
              type="button"
              onClick={clearFile}
              disabled={busy}
              className="shrink-0 rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="resume"
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-all duration-200 ${
              dragging
                ? 'border-violet-400/70 bg-violet-500/10'
                : 'border-white/15 bg-white/5 hover:border-violet-400/40 hover:bg-white/[0.07]'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="mb-3 size-8 text-slate-400">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 10l5-5 5 5M12 5v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm text-slate-300">
              <span className="font-semibold text-violet-300">Click to upload</span> or drag and drop
            </span>
            <span className="mt-1 text-xs text-slate-500">PDF, DOC, DOCX, TXT, or RTF &middot; up to 10 MB</span>
          </label>
        )}

        <input
          ref={fileInputRef}
          id="resume"
          name="resume"
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx,.txt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/rtf"
          disabled={busy}
          onChange={(e) => acceptFile(e.target.files?.[0])}
          aria-invalid={errors.resume ? 'true' : undefined}
          aria-describedby={errors.resume ? 'resume-error' : undefined}
        />
        {errors.resume && (
          <p id="resume-error" className="mt-1.5 text-sm text-rose-400">
            {errors.resume}
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-6">
        <Field
          label="Why Syzygy?"
          htmlFor="message"
          hint="A few sentences on what draws you to this work is plenty."
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={5000}
            disabled={busy}
            value={values.message}
            onChange={update('message')}
            className={`${inputClass} resize-y`}
            placeholder="Tell us about a problem you broke down and solved."
          />
        </Field>

        <Field label="How did you hear about us?" htmlFor="referral_source">
          <input
            id="referral_source"
            name="referral_source"
            type="text"
            disabled={busy}
            value={values.referral_source}
            onChange={update('referral_source')}
            className={inputClass}
            placeholder="A friend, LinkedIn, a class, and so on"
          />
        </Field>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          {submitError}
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="order-2 text-xs text-slate-500 sm:order-1">
          We only use what you send here to consider you for a role.
        </p>
        <button
          type="submit"
          disabled={busy}
          className="order-1 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl shadow-violet-500/30 transition-all duration-300 hover:from-violet-600 hover:to-purple-700 hover:shadow-violet-500/50 disabled:cursor-not-allowed disabled:opacity-70 sm:order-2 sm:w-auto"
        >
          {busy ? (
            <>
              <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span>{progress > 0 && progress < 100 ? `Uploading ${progress}%` : 'Submitting…'}</span>
            </>
          ) : (
            <>
              <span>Submit application</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
