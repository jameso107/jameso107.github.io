import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL_HREF } from '../data/routeMeta'
import ProjectForm from './ProjectForm'

export default function Contact({ 
  heading = "Ready to align your team around",
  headingHighlight = "AI that delivers",
  description = "No commitment needed, let's talk AI.",
  headingGradient = "from-violet-400 to-sky-400"
}) {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl bg-sky-500/20"></div>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12 animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            {heading} <span className={`bg-gradient-to-r ${headingGradient} bg-clip-text text-transparent`}>{headingHighlight}</span>?
          </h2>
          <p className="text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl animate-reveal" style={{ animationDelay: '0.1s' }}>
          <ProjectForm />
        </div>

        <p className="mt-8 text-center text-slate-400 animate-reveal" style={{ animationDelay: '0.15s' }}>
          Prefer to talk first? Call{' '}
          <a href={PHONE_TEL_HREF} className="font-semibold text-slate-200 hover:text-white underline-offset-4 hover:underline transition-colors duration-200">
            {PHONE_DISPLAY}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-slate-200 hover:text-white underline-offset-4 hover:underline transition-colors duration-200">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
