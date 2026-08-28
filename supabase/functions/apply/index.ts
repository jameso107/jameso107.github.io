// supabase/functions/apply/index.ts
//
// Public endpoint behind https://syzygy.services/careers
//
// Accepts a multipart/form-data application, stores the resume in the private
// `resumes` bucket, writes a row to public.job_applications, and emails a
// formatted summary to james@syzygy.services.
//
// The application is ALWAYS persisted before email is attempted, so a mail
// outage can never lose an applicant -- failures are recorded on the row in
// `email_error` and the applicant still sees a success state.
//
// Deployed with verify_jwt = false: this is an unauthenticated public form.
// Abuse controls are implemented in-function (origin allowlist, honeypot,
// submit-timing check, per-IP rate limit, strict field + file validation).

import { createClient } from 'jsr:@supabase/supabase-js@2'

const ALLOWED_ORIGINS = [
  'https://syzygy.services',
  'https://www.syzygy.services',
  'https://jameso107.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
]

const TO_EMAIL = Deno.env.get('CAREERS_TO_EMAIL') ?? 'james@syzygy.services'

// Mail goes out through AgentMail, the same transport the trivia-bot org uses.
// AGENTMAIL_API_KEY must be set as an edge function secret -- never commit it,
// this repo is public.
const AGENTMAIL_API_KEY = Deno.env.get('AGENTMAIL_API_KEY')
const AGENTMAIL_INBOX = Deno.env.get('AGENTMAIL_INBOX') ?? 'syzygy@agentmail.to'
const AGENTMAIL_BASE = 'https://api.agentmail.to/v0'

// Auto-reply mails a third party (the applicant), so it stays opt-in.
const SEND_AUTOREPLY = (Deno.env.get('CAREERS_SEND_AUTOREPLY') ?? 'false') === 'true'

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB, matches the bucket limit
const MAX_ATTACH_BYTES = 4 * 1024 * 1024 // larger resumes are linked, not attached
const SIGNED_URL_TTL = 60 * 60 * 24 * 30 // 30 days
const RATE_LIMIT_WINDOW_MIN = 15
const RATE_LIMIT_MAX = 5
const MIN_FILL_SECONDS = 3 // anything faster than this is a bot

const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'txt', 'rtf']

const FIELD_LIMITS: Record<string, number> = {
  full_name: 120,
  email: 254,
  phone: 40,
  location: 120,
  linkedin_url: 300,
  portfolio_url: 300,
  role_interest: 120,
  availability: 120,
  message: 5000,
  referral_source: 200,
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization, apikey, x-client-info',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  }
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  })
}

function clean(value: FormDataEntryValue | null, field: string): string {
  if (typeof value !== 'string') return ''
  // Strip control characters that would let an applicant forge header-ish lines.
  const stripped = value.replace(/[\u0000-\u001f\u007f]/g, '').trim()
  return stripped.slice(0, FIELD_LIMITS[field] ?? 500)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

// Only ever render applicant-supplied URLs when they are plainly http(s), so a
// `javascript:` value can't ride into the notification email.
function safeUrl(value: string): string {
  if (!value) return ''
  const trimmed = value.trim()
  // Drop a non-http(s) scheme outright rather than coercing it into a bogus
  // `https://mailto:...` URL. A colon followed by a digit is a port on a bare
  // host (example.com:8080), not a scheme.
  const scheme = /^([a-z][a-z0-9+.-]*):(\D|$)/i.exec(trimmed)?.[1]
  if (scheme && !/^https?$/i.test(scheme)) return ''

  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const url = new URL(withScheme)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : ''
  } catch {
    return ''
  }
}

function safeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? 'resume'
  return base.replace(/[^A-Za-z0-9._-]/g, '_').slice(-80) || 'resume'
}

function extensionOf(name: string): string {
  const parts = name.toLowerCase().split('.')
  return parts.length > 1 ? parts.pop()! : ''
}

async function hashIp(ip: string): Promise<string> {
  const salt = Deno.env.get('SUPABASE_URL') ?? 'syzygy'
  const bytes = new TextEncoder().encode(`${salt}:${ip}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32)
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

interface Application {
  full_name: string
  email: string
  phone: string
  location: string
  linkedin_url: string
  portfolio_url: string
  role_interest: string
  availability: string
  message: string
  referral_source: string
  resume_filename: string | null
  resume_size_bytes: number | null
}

function buildEmailHtml(app: Application, resumeUrl: string, attached: boolean): string {
  const rows: Array<[string, string]> = [
    ['Email', `<a href="mailto:${escapeHtml(app.email)}" style="color:#7c3aed;">${escapeHtml(app.email)}</a>`],
    ['Phone', app.phone ? escapeHtml(app.phone) : ''],
    ['Location', app.location ? escapeHtml(app.location) : ''],
    ['Role of interest', app.role_interest ? escapeHtml(app.role_interest) : ''],
    ['Availability', app.availability ? escapeHtml(app.availability) : ''],
    [
      'LinkedIn',
      app.linkedin_url
        ? `<a href="${escapeHtml(app.linkedin_url)}" style="color:#7c3aed;">${escapeHtml(app.linkedin_url)}</a>`
        : '',
    ],
    [
      'Portfolio',
      app.portfolio_url
        ? `<a href="${escapeHtml(app.portfolio_url)}" style="color:#7c3aed;">${escapeHtml(app.portfolio_url)}</a>`
        : '',
    ],
    ['Heard about us via', app.referral_source ? escapeHtml(app.referral_source) : ''],
  ].filter(([, value]) => value !== '')

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e9e7f5;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e9e7f5;color:#111827;font-size:14px;">${value}</td>
        </tr>`,
    )
    .join('')

  const messageBlock = app.message
    ? `<div style="margin-top:24px;">
         <div style="font-size:13px;color:#6b7280;margin-bottom:8px;">Why they want to work at SYZYGY</div>
         <div style="background:#f7f6fd;border-left:3px solid #a78bfa;border-radius:6px;padding:14px 16px;color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(app.message)}</div>
       </div>`
    : ''

  const resumeBlock = app.resume_filename
    ? `<div style="margin-top:24px;">
         <div style="font-size:13px;color:#6b7280;margin-bottom:8px;">Resume</div>
         <div style="font-size:14px;color:#111827;">
           ${escapeHtml(app.resume_filename)}
           <span style="color:#6b7280;">(${formatBytes(app.resume_size_bytes ?? 0)})</span>
           ${attached ? '<span style="color:#6b7280;"> &mdash; attached to this email</span>' : ''}
         </div>
         ${
           resumeUrl
             ? `<a href="${escapeHtml(resumeUrl)}" style="display:inline-block;margin-top:10px;background:linear-gradient(90deg,#8b5cf6,#7c3aed);color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:10px 20px;border-radius:8px;">Download resume</a>
                <div style="margin-top:8px;font-size:12px;color:#9ca3af;">Secure link, expires in 30 days.</div>`
             : ''
         }
       </div>`
    : `<div style="margin-top:24px;font-size:14px;color:#6b7280;">No resume was attached to this application.</div>`

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(15,23,42,0.08);">
      <div style="background:linear-gradient(90deg,#0b1020,#1e1b4b);padding:24px 28px;">
        <div style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.5px;">SYZYGY<span style="color:#a78bfa;">.services</span></div>
        <div style="color:#94a3b8;font-size:13px;margin-top:4px;">New application from the careers page</div>
      </div>
      <div style="padding:28px;">
        <div style="font-size:22px;font-weight:700;color:#111827;">${escapeHtml(app.full_name)}</div>
        ${app.role_interest ? `<div style="font-size:14px;color:#7c3aed;font-weight:600;margin-top:4px;">${escapeHtml(app.role_interest)}</div>` : ''}
        <table style="width:100%;border-collapse:collapse;margin-top:20px;border-top:1px solid #e9e7f5;">${tableRows}</table>
        ${messageBlock}
        ${resumeBlock}
        <div style="margin-top:28px;padding-top:18px;border-top:1px solid #e9e7f5;font-size:12px;color:#9ca3af;">
          Reply to this email to respond directly to the applicant. Every application is also stored in the
          <strong>job_applications</strong> table in Supabase.
        </div>
      </div>
    </div>
  </body>
</html>`
}

function buildEmailText(app: Application, resumeUrl: string): string {
  const lines = [
    `New application - ${app.full_name}`,
    '',
    `Email: ${app.email}`,
    app.phone ? `Phone: ${app.phone}` : '',
    app.location ? `Location: ${app.location}` : '',
    app.role_interest ? `Role of interest: ${app.role_interest}` : '',
    app.availability ? `Availability: ${app.availability}` : '',
    app.linkedin_url ? `LinkedIn: ${app.linkedin_url}` : '',
    app.portfolio_url ? `Portfolio: ${app.portfolio_url}` : '',
    app.referral_source ? `Heard about us via: ${app.referral_source}` : '',
    '',
    app.message ? `Why SYZYGY:\n${app.message}` : '',
    '',
    app.resume_filename ? `Resume: ${app.resume_filename}` : 'No resume attached.',
    resumeUrl ? `Download (expires in 30 days): ${resumeUrl}` : '',
  ]
  return lines.filter((line) => line !== '').join('\n')
}

// One transport: AgentMail. `reply_to` is set to the applicant so hitting
// reply in the notification goes straight back to them.
async function agentMailSend(payload: Record<string, unknown>): Promise<void> {
  const res = await fetch(
    `${AGENTMAIL_BASE}/inboxes/${encodeURIComponent(AGENTMAIL_INBOX)}/messages/send`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${AGENTMAIL_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )
  if (!res.ok) {
    throw new Error(`agentmail send failed (${res.status}): ${(await res.text()).slice(0, 300)}`)
  }
}

async function sendNotification(
  app: Application,
  resumeUrl: string,
  attachment: { filename: string; content_type: string; content: string } | null,
): Promise<void> {
  await agentMailSend({
    to: [TO_EMAIL],
    reply_to: app.email,
    subject: `New application: ${app.full_name}${app.role_interest ? ` - ${app.role_interest}` : ''}`,
    text: buildEmailText(app, resumeUrl),
    html: buildEmailHtml(app, resumeUrl, attachment !== null),
    ...(attachment ? { attachments: [{ ...attachment, content_disposition: 'attachment' }] } : {}),
  })
}

async function sendAutoReply(app: Application): Promise<void> {
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#0b1020,#1e1b4b);padding:24px 28px;color:#ffffff;font-size:18px;font-weight:700;">SYZYGY<span style="color:#a78bfa;">.services</span></div>
      <div style="padding:28px;color:#111827;font-size:15px;line-height:1.6;">
        <p style="margin-top:0;">Hi ${escapeHtml(app.full_name.split(' ')[0])},</p>
        <p>Thanks for applying to SYZYGY.services &mdash; we've got your application and your resume.</p>
        <p>We read every one. If there's a fit, you'll hear from us directly at this address.</p>
        <p style="margin-bottom:0;">&mdash; The SYZYGY team</p>
      </div>
    </div>
  </body>
</html>`

  await agentMailSend({
    to: [app.email],
    reply_to: TO_EMAIL,
    subject: 'We received your application - SYZYGY.services',
    text: `Hi ${app.full_name.split(' ')[0]},\n\nThanks for applying to SYZYGY.services. We have your application and your resume, and we read every one. If there's a fit, you'll hear from us at this address.\n\n- The SYZYGY team`,
    html,
  })
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405, origin)
  }
  // Browsers always send Origin on cross-origin POSTs; a wrong one means the
  // request came from a site that isn't ours.
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json({ ok: false, error: 'Origin not allowed' }, 403, origin)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  )

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return json({ ok: false, error: 'Expected multipart/form-data.' }, 400, origin)
  }

  // --- bot checks -----------------------------------------------------------
  // Hidden field no human ever fills in.
  if (clean(form.get('website'), 'referral_source')) {
    return json({ ok: true, id: null }, 200, origin) // silently accept and drop
  }
  const renderedAt = Number(form.get('rendered_at'))
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    if ((Date.now() - renderedAt) / 1000 < MIN_FILL_SECONDS) {
      return json({ ok: false, error: 'That was a little too fast. Please try again.' }, 429, origin)
    }
  }

  // --- validation -----------------------------------------------------------
  const app: Application = {
    full_name: clean(form.get('full_name'), 'full_name'),
    email: clean(form.get('email'), 'email'),
    phone: clean(form.get('phone'), 'phone'),
    location: clean(form.get('location'), 'location'),
    linkedin_url: safeUrl(clean(form.get('linkedin_url'), 'linkedin_url')),
    portfolio_url: safeUrl(clean(form.get('portfolio_url'), 'portfolio_url')),
    role_interest: clean(form.get('role_interest'), 'role_interest'),
    availability: clean(form.get('availability'), 'availability'),
    message: clean(form.get('message'), 'message'),
    referral_source: clean(form.get('referral_source'), 'referral_source'),
    resume_filename: null,
    resume_size_bytes: null,
  }

  if (app.full_name.length < 2) {
    return json({ ok: false, error: 'Please enter your full name.' }, 400, origin)
  }
  if (!isEmail(app.email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400, origin)
  }

  const file = form.get('resume')
  const hasFile = file instanceof File && file.size > 0
  let fileBytes: Uint8Array | null = null
  let storedName = ''

  if (hasFile) {
    const f = file as File
    if (f.size > MAX_FILE_BYTES) {
      return json({ ok: false, error: 'Resume must be 10 MB or smaller.' }, 400, origin)
    }
    storedName = safeFilename(f.name)
    if (!ALLOWED_EXTENSIONS.includes(extensionOf(storedName))) {
      return json({ ok: false, error: 'Resume must be a PDF, DOC, DOCX, TXT, or RTF file.' }, 400, origin)
    }
    fileBytes = new Uint8Array(await f.arrayBuffer())
    app.resume_filename = storedName
    app.resume_size_bytes = f.size
  }

  // --- rate limit -----------------------------------------------------------
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('cf-connecting-ip') ??
    'unknown'
  const ipHash = await hashIp(ip)

  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MIN * 60 * 1000).toISOString()
  const { count } = await supabase
    .from('job_applications')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since)

  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return json(
      { ok: false, error: 'Too many submissions from this connection. Please try again later.' },
      429,
      origin,
    )
  }

  // --- persist (before email, so nothing can be lost) ------------------------
  const id = crypto.randomUUID()
  let resumePath: string | null = null

  if (fileBytes && hasFile) {
    const f = file as File
    resumePath = `${new Date().getUTCFullYear()}/${id}/${storedName}`
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(resumePath, fileBytes, {
        contentType: f.type || 'application/octet-stream',
        upsert: false,
      })
    if (uploadError) {
      console.error('resume upload failed', uploadError)
      // Keep going: an application without its file beats losing the applicant.
      resumePath = null
      app.resume_filename = null
      app.resume_size_bytes = null
    }
  }

  const { error: insertError } = await supabase.from('job_applications').insert({
    id,
    full_name: app.full_name,
    email: app.email,
    phone: app.phone || null,
    location: app.location || null,
    linkedin_url: app.linkedin_url || null,
    portfolio_url: app.portfolio_url || null,
    role_interest: app.role_interest || null,
    availability: app.availability || null,
    message: app.message || null,
    referral_source: app.referral_source || null,
    resume_path: resumePath,
    resume_filename: app.resume_filename,
    resume_size_bytes: app.resume_size_bytes,
    resume_content_type: hasFile ? (file as File).type || null : null,
    user_agent: (req.headers.get('user-agent') ?? '').slice(0, 500) || null,
    ip_hash: ipHash,
  })

  if (insertError) {
    console.error('insert failed', insertError)
    return json({ ok: false, error: 'Something went wrong saving your application.' }, 500, origin)
  }

  // --- signed resume link ---------------------------------------------------
  let resumeUrl = ''
  if (resumePath) {
    const { data: signed } = await supabase.storage
      .from('resumes')
      .createSignedUrl(resumePath, SIGNED_URL_TTL)
    resumeUrl = signed?.signedUrl ?? ''
  }

  // --- notify ---------------------------------------------------------------
  let emailSent = false
  let emailError: string | null = null

  try {
    if (AGENTMAIL_API_KEY) {
      // Small resumes ride along as an attachment; large ones stay behind the
      // signed link so the message itself never gets unwieldy.
      const attachment =
        fileBytes && app.resume_filename && fileBytes.byteLength <= MAX_ATTACH_BYTES
          ? {
              filename: app.resume_filename,
              content_type: (hasFile ? (file as File).type : '') || 'application/octet-stream',
              content: bytesToBase64(fileBytes),
            }
          : null
      await sendNotification(app, resumeUrl, attachment)
      emailSent = true

      if (SEND_AUTOREPLY) {
        try {
          await sendAutoReply(app)
        } catch (err) {
          console.error('auto-reply failed', err) // never fail the submission for this
        }
      }
    } else {
      emailError =
        'AGENTMAIL_API_KEY is not set in the edge function secrets, so no notification was ' +
        'sent. The application itself is safely stored.'
    }
  } catch (err) {
    emailError = err instanceof Error ? err.message : String(err)
    console.error('notification failed', emailError)
  }

  await supabase
    .from('job_applications')
    .update({ email_sent: emailSent, email_error: emailError })
    .eq('id', id)

  // The application is safely stored either way, so the applicant sees success.
  return json({ ok: true, id }, 200, origin)
})
