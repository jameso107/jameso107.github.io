export default function Definition() {
  return (
    <section id="definition" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/10"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-sky-500/10"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            What is <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">Syzygy</span>?
          </h2>
          <p className="mt-4 text-lg text-slate-300/90 max-w-4xl mx-auto leading-relaxed">
            A <em className="text-violet-300 not-italic font-semibold">Syz - y - gy</em> [siz - uh - gee] is the perfect alignment of three celestial bodies. AI demands perfect alignment, and our promise to you is to align <span className="font-semibold text-white">AI</span>, <span className="font-semibold text-white">people</span>, and <span className="font-semibold text-white">your business</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
