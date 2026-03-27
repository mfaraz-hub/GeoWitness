import { MapPin, Bell, BarChart3, Building2, Smartphone, Globe2 } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Geo-Fencing Technology',
    desc: 'Define precise digital boundaries around any civic project. Automatically trigger content when users enter the zone — no app interaction needed.',
    color: '#3b82f6',
    tag: 'Core',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    desc: 'Rich push notifications with project titles, progress bars, budget snapshots, and completion dates — delivered the moment they matter most.',
    color: '#ff9933',
    tag: 'Engagement',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Data Updates',
    desc: 'Live dashboards sync with government project databases to show accurate, up-to-date information — no stale data, no confusion.',
    color: '#34d399',
    tag: 'Transparency',
  },
  {
    icon: Building2,
    title: 'Project Transparency Dashboard',
    desc: 'A full breakdown of every civic project: funding sources, contractor details, milestone tracking, and public benefit reports.',
    color: '#a78bfa',
    tag: 'Accountability',
  },
  {
    icon: Smartphone,
    title: 'Mobile Integration',
    desc: 'Native Android & iOS support with seamless background location services, accessible offline cached data, and adaptive UI.',
    color: '#f472b6',
    tag: 'Accessibility',
  },
  {
    icon: Globe2,
    title: 'Multi-location Scalability',
    desc: 'Deploy across thousands of zones simultaneously — from a single municipal ward to a national smart city rollout.',
    color: '#38bdf8',
    tag: 'Scale',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1630] to-[#0a0f1e] grid-dots" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-5">
            Key Features
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Everything You Need
            <br />
            <span className="text-gradient">for Civic Transparency</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Six powerful capabilities designed for scale, trust, and real civic impact.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal group card-glass rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${f.color}15`, color: f.color, border: `1px solid ${f.color}25` }}
                >
                  {f.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                {f.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>

              {/* Hover glow accent */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px ${f.color}08, 0 0 30px ${f.color}10` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
