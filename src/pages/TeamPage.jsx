import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TeamPage() {
  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <Header />
      <section className="pt-32 pb-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-pink-500/20"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 animate-reveal">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Our Team
            </h2>
            <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
              Meet the experts behind SYZYGY.services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center text-slate-300/90 leading-relaxed space-y-4">
              <p>
                Our team is coming together to bring you the best in AI consulting and implementation.
              </p>
              <p>
                More information about our team will be available soon.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

