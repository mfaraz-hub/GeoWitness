import { Brain, Plug2, Languages, TreePine } from 'lucide-react'

const roadmap = [
  {
    icon: Brain,
    phase: 'Phase 2',
    title: 'AI-Based Personalization',
    desc: 'Machine learning models that tailor project highlights, impact summaries, and alert frequency based on individual user interests and commute patterns.',
    timeline: 'Q3 2025',
    color: '#3b82f6',
    status: 'In Development',
  },
  {
    icon: Plug2,
    phase: 'Phase 3',
    title: 'Government API Integration',
    desc: 'Direct live sync with official portals — PMGSY, Smart Cities Mission, state PWD databases — ensuring 100% verified, real-time project data.',
    timeline: 'Q4 2025',
    color: '#ff9933',
    status: 'Planned',
  },
  {
    icon: Languages,
    phase: 'Phase 4',
    title: 'Multilingual Support',
    desc: '22+ Indian languages powered by Bhashini API. Citizens receive notifications in Hindi, Tamil, Telugu, Bengali, Marathi, and more — in their mother tongue.',
    timeline: 'Q1 2026',
    color: '#34d399',
    status: 'Planned',
  },
  {
    icon: TreePine,
    phase: 'Phase 5',
    title: 'Rural Expansion',
    desc: 'Lightweight, low-bandwidth version for rural areas under PMGSY and Jal Jeevan Mission — bringing transparency to India\'s 640,000 villages.',
    timeline: 'Q2 2026',
    color: '#a78bfa',
    status: 'Research',
  },
]

export default function FutureScope() {
  return (
    <section id="future" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1630] to-[#0a0f1e]" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-5">
            Future Roadmap
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Where We're{' '}
            <span className="text-gradient">Headed Next</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            An ambitious roadmap to expand reach, intelligence, and inclusivity.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-orange-400/30 to-purple-500/20 hidden md:block" />

          <div className="space-y-8">
            {roadmap.map((item, i) => (
              <div
                key={item.phase}
                className={`reveal relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Content */}
                <div className="flex-1 md:max-w-[calc(50%-40px)]">
                  <div className="card-glass rounded-2xl p-6 group hover:-translate-y-1.5 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
                        >
                          {item.status}
                        </div>
                        <div className="text-white/30 text-xs mt-1">{item.timeline}</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">{item.phase}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Center dot (desktop) */}
                <div
                  className="hidden md:flex w-8 h-8 rounded-full border-2 items-center justify-center flex-shrink-0 bg-[#0d1630] z-10 self-center"
                  style={{ borderColor: item.color }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                </div>

                {/* Empty spacer for alternating layout */}
                <div className="hidden md:block flex-1 md:max-w-[calc(50%-40px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
