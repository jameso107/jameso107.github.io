import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { routeMeta, POSITIONING } from '../data/routeMeta'
import LogoLoop from '../components/LogoLoop'
import SpotlightCard from '../components/SpotlightCard'
import { graph, breadcrumbSchema, personSchema } from '../utils/structuredData'

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'James Oosterhouse',
      role: 'Founder & CEO',
      description: 'Leading Syzygy with a vision to align AI, people, and business for real-world impact.',
      image: '/james.jpg',
      linkedin: 'https://www.linkedin.com/in/james-oosterhouse/',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      name: 'Christian Reinhardt',
      role: 'Co-founder & Director of Research',
      description: 'Driving research initiatives and staying at the forefront of AI technology and innovation.',
      image: '/christian.jpg',
      linkedin: 'https://www.linkedin.com/in/christian-reinhardt-186b7428a/',
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      name: 'Hannah TerHaar',
      role: 'Co-founder & Director of Marketing',
      description: 'Shaping our brand and connecting with clients to communicate the value of AI alignment.',
      image: '/hannah.jpg',
      linkedin: 'https://www.linkedin.com/in/hannahterhaar/',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Ethan Franklin',
      role: 'AI Engineer',
      description: 'Building and implementing AI solutions to drive business value and innovation.',
      image: '/ethan.jpg',
      linkedin: 'https://www.linkedin.com/in/ethanmfranklin/',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Max Cooper',
      role: 'AI Engineer',
      description: 'Building and implementing AI solutions to drive business value and innovation.',
      image: '/max.jpg',
      linkedin: 'https://www.linkedin.com/in/cooper-maxwell/',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Kyle Cornell',
      role: 'AI Engineer',
      description: 'Building and implementing AI solutions to drive business value and innovation.',
      image: '/kyle.jpg',
      linkedin: 'https://www.linkedin.com/in/kylecornell04/',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      name: 'Colin Miller',
      role: 'AI Development Intern',
      description: 'Building the next generation of educational AI tools for Syzygy and our clients.',
      image: '/colin.jpg',
      gradient: 'from-indigo-500 to-blue-600'
    }
  ]

  const companyLogos = [
    { src: '/logos/capital-one.png', alt: 'Capital One', title: 'Capital One' },
    { src: '/logos/nasa.png', alt: 'NASA', title: 'NASA' },
    { src: '/logos/jpl.png', alt: 'NASA Jet Propulsion Laboratory', title: 'Jet Propulsion Laboratory' },
    { src: '/logos/meta.png', alt: 'Meta', title: 'Meta' },
    { src: '/logos/ucf.png', alt: 'University of Central Florida', title: 'University of Central Florida' },
    { src: '/logos/michigan-medicine.png', alt: 'Michigan Medicine', title: 'Michigan Medicine' },
    { src: '/logos/nissan.png', alt: 'Nissan', title: 'Nissan' },
    { src: '/logos/lmcu.png', alt: 'Lake Michigan Credit Union', title: 'Lake Michigan Credit Union' },
    { src: '/logos/abercrombie.png', alt: 'Abercrombie & Fitch', title: 'Abercrombie & Fitch' }
  ]

  // Plain-text version of the logo loop below, so the employers are readable
  // by anyone (and anything) that does not render images.
  const priorEmployers = companyLogos.map((logo) => logo.title)
  const priorEmployersSentence = `${priorEmployers.slice(0, -1).join(', ')}, and ${priorEmployers[priorEmployers.length - 1]}`

  const structuredData = graph(
    breadcrumbSchema([
      { name: 'Home', url: routeMeta['/'].canonicalUrl },
      { name: 'Our Team', url: routeMeta['/team'].canonicalUrl },
    ]),
    ...teamMembers.map((member) => personSchema(member)),
  )

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO {...routeMeta['/team']} structuredData={structuredData} />
      <Header />
      <main>
      <section className="pt-32 pb-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full blur-3xl bg-pink-500/20"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 animate-reveal">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Our Team
            </h1>
            <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
              Meet the University of Michigan experts behind Syzygy. We may be young, but we know AI.
            </p>
            <p className="mt-6 text-base text-slate-300/80 max-w-3xl mx-auto leading-relaxed">
              {POSITIONING}
            </p>
            <p className="mt-4 text-base text-slate-300/80 max-w-3xl mx-auto leading-relaxed">
              Before Syzygy, our team worked at {priorEmployersSentence}.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, idx) => (
              <SpotlightCard
                key={member.name}
                spotlightColor="rgba(167, 139, 250, 0.18)"
                className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 z-0`}></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="mb-4 relative">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at Syzygy`}
                      className="w-32 h-32 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=a78bfa&color=fff&size=128`
                      }}
                    />
                  </div>
                  
                  {/* Name and Role */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <div className="text-sm font-semibold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {member.role}
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {member.description}
                  </p>
                  
                  {/* LinkedIn Link */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      View LinkedIn
                    </a>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Recruiting now lives on /careers */}
          <div className="mt-14 text-center animate-reveal" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/careers/"
              className="group inline-flex items-center gap-2 text-slate-400 transition-colors duration-300 hover:text-violet-300"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-violet-400"></span>
              </span>
              <span>We&apos;re hiring &mdash; see open roles and apply</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Companies We've Worked For */}
      <section className="pb-24 -mt-12 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10 animate-reveal">
            <h2 className="text-2xl md:text-3xl font-bold text-white/90">
              Companies We've <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Worked For</span>
            </h2>
          </div>
          <div className="animate-reveal" style={{ animationDelay: '0.1s' }}>
            <LogoLoop
              logos={companyLogos}
              speed={70}
              direction="left"
              logoHeight={52}
              gap={72}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#0b1020"
              ariaLabel="Companies we've worked for"
            />
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}

