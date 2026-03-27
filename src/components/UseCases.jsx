import { Hospital, Construction, TrainFront, Lightbulb } from 'lucide-react'

const cases = [
  {
    icon: Hospital,
    title: 'Government Hospital Upgrades',
    desc: 'Citizens near a hospital under renovation receive details about new ICU wings, equipment purchases, and completion timelines.',
    budget: '₹42 Cr',
    progress: 75,
    status: 'In Progress',
    statusColor: '#3b82f6',
    tag: 'Healthcare',
    tagColor: '#3b82f6',
    example: {
      title: 'AIIMS Expansion — Block C',
      detail: 'New 200-bed wing + MRI facility',
    },
  },
  {
    icon: Construction,
    title: 'New Bridge Construction',
    desc: 'Commuters driving near a river crossing get notified about alternative routes, project milestones, and expected reopening dates.',
    budget: '₹118 Cr',
    progress: 42,
    status: 'Under Construction',
    statusColor: '#ff9933',
    tag: 'Infrastructure',
    tagColor: '#ff9933',
    example: {
      title: 'Yamuna Cable Bridge — Phase 2',
      detail: 'Spanning 1.2km | 4-lane capacity',
    },
  },
  {
    icon: TrainFront,
    title: 'Road & Metro Projects',
    desc: 'Metro riders and pedestrians near elevated corridors learn about the route map, station count, and green commute impact data.',
    budget: '₹2,800 Cr',
    progress: 61,
    status: 'On Track',
    statusColor: '#34d399',
    tag: 'Transport',
    tagColor: '#34d399',
    example: {
      title: 'Phase 4 Metro — Aerocity to Tughlakabad',
      detail: '22 stations | Operational by 2027',
    },
  },
  {
    icon: Lightbulb,
    title: 'Smart City Initiatives',
    desc: 'Residents walking through smart districts see data on solar installations, Wi-Fi coverage, smart pole deployments, and energy savings.',
    budget: '₹350 Cr',
    progress: 88,
    status: 'Near Complete',
    statusColor: '#a78bfa',
    tag: 'Smart City',
    tagColor: '#a78bfa',
    example: {
      title: 'Pune Smart District — Zone 4',
      detail: '3,200 smart poles deployed',
    },
  },
]

function ProgressBar({ value, color }) {
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  )
}

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] to-[#0d1630]" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-5">
            Use Cases
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Real Projects.{' '}
            <span className="text-gradient-saffron">Real Impact.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            See how HyperLocal transforms awareness across four major civic domains.
          </p>
        </div>

        {/* Case cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className="reveal card-glass rounded-2xl p-7 group hover:-translate-y-1.5 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.tagColor}15`, border: `1px solid ${c.tagColor}30` }}
                >
                  <c.icon className="w-6 h-6" style={{ color: c.tagColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-base leading-tight">{c.title}</h3>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${c.tagColor}15`, color: c.tagColor }}
                  >
                    {c.tag}
                  </span>
                </div>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-5">{c.desc}</p>

              {/* Sample notification preview */}
              <div
                className="rounded-xl p-4 mb-5 text-xs"
                style={{ background: `${c.tagColor}08`, border: `1px solid ${c.tagColor}20` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: c.tagColor }} />
                  <span className="font-semibold text-white/80">{c.example.title}</span>
                </div>
                <div className="text-white/40 pl-4">{c.example.detail}</div>
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                <span>Budget: <strong className="text-white/70">{c.budget}</strong></span>
                <span
                  className="px-2 py-0.5 rounded-full font-medium text-[11px]"
                  style={{ background: `${c.statusColor}15`, color: c.statusColor }}
                >
                  {c.status}
                </span>
              </div>
              <ProgressBar value={c.progress} color={c.tagColor} />
              <div className="text-right text-xs text-white/30 mt-1">{c.progress}% complete</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
