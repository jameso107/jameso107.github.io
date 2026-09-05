// Anonymized outcomes from real engagements; src/components/Work.jsx is the
// source of truth for which result belongs to which client. Region-level
// descriptors only — never client names or cities.
export const results = [
  {
    stat: '5+ hours a week',
    label: 'back for every Sales Engineer',
    detail:
      'A West Michigan manufacturer turns prints, specs, and past quotes into structured estimates with a document-grounded assistant, freeing its Sales Engineers for customer work.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    stat: '18% more efficient',
    label: 'quoting operations',
    detail:
      'A mid-Atlantic manufacturer uses a custom AI engine to analyze specification documents and flag contract exceptions, turning quotes around faster.',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    stat: '400+ employees',
    label: 'using a custom LLM suite daily',
    detail:
      'A West Michigan automotive company rolled out a custom LLM suite we built. More than 400 employees use it in their daily work, with room to grow into more of the business.',
    gradient: 'from-cyan-400 to-teal-400',
  },
]

export default function Results() {
  return (
    <section id="results" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-purple-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14 animate-reveal">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Results</h2>
          <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
            What the highest-return improvement looks like in practice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((result, idx) => (
            <div
              key={result.stat}
              className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 border border-white/10 animate-reveal"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${result.gradient} bg-clip-text text-transparent`}>
                {result.stat}
              </div>
              <div className="mt-1 text-sm font-semibold text-white">{result.label}</div>
              <p className="mt-4 text-sm text-slate-300/90 leading-relaxed">{result.detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Client names withheld. Ask about any of these on an intro call.
        </p>
      </div>
    </section>
  )
}
