// Visible, non-collapsing FAQ. Every question and answer is real text in the
// HTML; pages mirror the same items into FAQPage structured data with
// faqSchema() so the markup and the schema can never disagree.
export default function FAQ({
  items,
  heading = 'Frequently asked questions',
  intro,
  id = 'faq',
  compact = false,
}) {
  if (!items || items.length === 0) return null

  return (
    <section id={id} className={`${compact ? 'py-16' : 'py-24'} relative overflow-hidden`}>
      {!compact && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/10"></div>
        </div>
      )}
      <div className={`mx-auto ${compact ? 'max-w-3xl px-0' : 'max-w-5xl px-6'}`}>
        <div className={`${compact ? 'mb-8' : 'text-center mb-14'} animate-reveal`}>
          <h2 className={`${compact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'} font-extrabold mb-4`}>
            {heading}
          </h2>
          {intro && <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">{intro}</p>}
        </div>

        <dl className={`grid gap-6 ${compact ? '' : 'md:grid-cols-2'}`}>
          {items.map((item, idx) => (
            <div
              key={item.q}
              className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 md:p-7 border border-white/10 animate-reveal"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <dt className="text-lg font-semibold text-white leading-snug">{item.q}</dt>
              <dd className="mt-3 text-slate-300/90 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
