import { GraduationCap, Lightbulb, Award, Users } from 'lucide-react'

const teamMembers = [
  {
    name: 'Team Lead',
    role: 'Product & Strategy',
    initials: 'TL',
    color: '#3b82f6',
    bio: 'Final year engineering student passionate about civic-tech and public policy.',
  },
  {
    name: 'Dev Lead',
    role: 'Full-Stack & Geo-Fencing',
    initials: 'DL',
    color: '#ff9933',
    bio: 'Specialises in React Native, location APIs, and cloud-native architecture.',
  },
  {
    name: 'Design Lead',
    role: 'UX/UI & Data Viz',
    initials: 'DE',
    color: '#34d399',
    bio: 'Creates intuitive, accessible interfaces that make complex data feel simple.',
  },
  {
    name: 'Research Lead',
    role: 'Policy & Impact Analysis',
    initials: 'RL',
    color: '#a78bfa',
    bio: 'Focuses on e-governance research, citizen feedback loops, and impact metrics.',
  },
]

const badges = [
  { icon: GraduationCap, label: 'Student Innovation' },
  { icon: Lightbulb, label: 'Civic-Tech' },
  { icon: Award, label: 'National Competition' },
  { icon: Users, label: 'Cross-Disciplinary' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] to-[#0d1630]" />
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-5">
            About the Team
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Built by Students,{' '}
            <span className="text-gradient">For Citizens</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            We are a cross-disciplinary team of engineering, design, and policy students
            driven by the belief that technology can and should serve democracy.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {teamMembers.map((m, i) => (
            <div
              key={m.name}
              className="reveal card-glass rounded-2xl p-6 text-center group hover:-translate-y-2 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Avatar */}
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white group-hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${m.color}40, ${m.color}20)`, border: `2px solid ${m.color}40` }}
                >
                  {m.initials}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0d1630]"
                  style={{ background: m.color }}
                />
              </div>

              <h3 className="font-bold text-white mb-0.5">{m.name}</h3>
              <div className="text-xs font-medium mb-3" style={{ color: m.color }}>{m.role}</div>
              <p className="text-white/40 text-xs leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>

        {/* Innovation story */}
        <div className="reveal">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(255,153,51,0.04), rgba(52,211,153,0.06))',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Our Innovation{' '}
                  <span className="text-gradient-saffron">Story</span>
                </h3>
                <p className="text-white/55 leading-relaxed mb-5">
                  HyperLocal Targeting Engine was born during a civic hackathon, when we asked a simple question:
                  <em className="text-white/80"> "Why don't citizens know what's being built next door?"</em>
                </p>
                <p className="text-white/55 leading-relaxed">
                  We combined geo-fencing technology, open government data, and human-centred design to create
                  a platform that doesn't just inform — it empowers. Built with the entrepreneurship spirit,
                  this is our contribution to a more transparent, participatory India.
                </p>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-4">
                {badges.map((b, i) => (
                  <div
                    key={b.label}
                    className="card-glass rounded-xl p-4 flex items-center gap-3"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-4 h-4 text-white/70" />
                    </div>
                    <span className="text-sm font-medium text-white/70">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
