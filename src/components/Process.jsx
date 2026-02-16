import { Link } from 'react-router-dom'

export default function Process() {
  const boxes = [
    {
      title: 'Our Process',
      link: '/process',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      title: 'Our Pricing',
      link: '/pricing',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Our Team',
      link: '/team',
      gradient: 'from-pink-400 to-rose-500',
    }
  ]

  return (
    <section id="process" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-sky-500/20"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            How we work
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {boxes.map((box, idx) => (
            <Link
              key={box.title}
              to={box.link}
              className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal overflow-hidden cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Connecting line (hidden on last item) */}
              {idx < boxes.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-violet-500/30 to-transparent z-[-1] pointer-events-none"></div>
              )}
              
              {/* Gradient glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${box.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 z-0`}></div>
              
              <div className="relative z-10 flex items-center justify-center min-h-[140px]">
                <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300 text-center leading-tight">
                  {box.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

