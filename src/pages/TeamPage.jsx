import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { breadcrumbSchema, personSchema } from '../utils/structuredData'

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'James Oosterhouse',
      role: 'Founder & CEO',
      description: 'Leading SYZYGY.services with a vision to align AI, people, and business for real-world impact.',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQGqELc5V3rjLg/profile-displayphoto-shrink_800_800/B56ZUkc2eaHoAk-/0/1740073298172?e=1771459200&v=beta&t=s5ArP1sIX4O2P1A7SUev2aDH83r3ltqWCf6esWDAE70',
      linkedin: 'https://www.linkedin.com/in/james-oosterhouse/',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      name: 'Christian Reinhardt',
      role: 'Co-founder & Director of Research',
      description: 'Driving research initiatives and staying at the forefront of AI technology and innovation.',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQEJhgJrDPALQg/profile-displayphoto-crop_800_800/B4EZlN6bHvIwAI-/0/1757948785495?e=1771459200&v=beta&t=bRNfVOYuMqYhc74h0NR83ntvUPhc3IQibPoAbrswqYs',
      linkedin: 'https://www.linkedin.com/in/christian-reinhardt-186b7428a/',
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      name: 'Hannah TerHaar',
      role: 'Co-founder & Director of Marketing',
      description: 'Shaping our brand and connecting with clients to communicate the value of AI alignment.',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQHA1852c9AQ0g/profile-displayphoto-crop_800_800/B56ZpHCSutHYAI-/0/1762128375283?e=1771459200&v=beta&t=jACVj-MHYsyRRH7E6pxwk0BsehpCDuoyHQXeHnkHAa0',
      linkedin: 'https://www.linkedin.com/in/hannahterhaar/',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Ethan Franklin',
      role: 'AI Engineer',
      description: 'Building and implementing AI solutions to drive business value and innovation.',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQH7_3EzrvLp8g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666198810019?e=1771459200&v=beta&t=iJh3ADyZd9bjBhkxAf3VzXpBnc-3bqOeGdv7T-3JhWQ',
      linkedin: 'https://www.linkedin.com/in/ethanmfranklin/',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Max Cooper',
      role: 'AI Engineer',
      description: 'Building and implementing AI solutions to drive business value and innovation.',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQG9B97-XF1ogA/profile-displayphoto-crop_800_800/B4EZq9aK6tIUAM-/0/1764114348625?e=1771459200&v=beta&t=KLJi-vZK2qAO3CteGhwVkbXxjNwQby2OO_EGT9yA1lY',
      linkedin: 'https://www.linkedin.com/in/cooper-maxwell/',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Kyle Cornell',
      role: 'AI Engineer',
      description: 'Building and implementing AI solutions to drive business value and innovation.',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQFQjsuvZlcDuA/profile-displayphoto-shrink_800_800/B56ZUbt6C7GQAk-/0/1739926774631?e=1771459200&v=beta&t=OtDMeDNvbJr0arBbOFOWPl15TuIPeeJhyWYVozuKjl4',
      linkedin: 'https://www.linkedin.com/in/kylecornell04/',
      gradient: 'from-rose-500 to-pink-500'
    }
  ]

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://syzygy.services' },
    { name: 'Our Team', url: 'https://syzygy.services/team' }
  ])

  const personSchemas = teamMembers.map(member => personSchema(member))

  return (
    <div className="gradient min-h-screen text-slate-200 selection:bg-violet-300/30 selection:text-white">
      <SEO
        title="AI Consultants & Experts | Our Team"
        description="Meet the AI consulting service experts at SYZYGY.services serving Michigan and Midwest small businesses: James Oosterhouse (Founder & CEO), Christian Reinhardt (Co-founder & Director of Research), and Hannah TerHaar (Co-founder & Director of Marketing)."
        keywords="AI consultants, AI experts, AI consulting team, AI consulting service team, AI strategy consultants, AI implementation experts, Michigan AI consultants, Midwest AI consultants"
        canonicalUrl="https://syzygy.services/team"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbs, ...personSchemas]
        }}
      />
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
              Meet the University of Michigan experts behind SYZYGY.services. We may be young, but we know AI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-reveal overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 z-0`}></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="mb-4 relative">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at SYZYGY.services`}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full blur-3xl bg-violet-500/20"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl bg-sky-500/20"></div>
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12 animate-reveal">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Interested in joining <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">our team</span>?
            </h2>
            <p className="text-lg text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
              We're always looking for talented individuals passionate about AI and helping businesses succeed. If you're excited about aligning AI, people, and business, we'd love to hear from you.
            </p>
          </div>
          
          <div className="flex justify-center animate-reveal" style={{ animationDelay: '0.1s' }}>
            <a 
              href="https://forms.gle/PHqVb3Lpk319SVBU6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-4 font-semibold text-white hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
            >
              <span>Apply to join our team</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

