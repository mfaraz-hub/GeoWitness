import { EyeOff, IndianRupee, Unplug } from 'lucide-react'

const problems = [
  {
    icon: EyeOff,
    title: 'Invisible Infrastructure',
    desc: 'Billions of rupees are spent on public projects, yet citizens remain completely unaware of what is being built in their own neighbourhoods.',
    stat: '70%',
    statLabel: 'citizens unaware of local development projects',
    color: 'from-blue-600 to-cyan-500',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: IndianRupee,
    title: 'Budget Black Box',
    desc: 'Tax money funds hospitals, roads, and bridges — but there is no accessible way for the public to see how funds are allocated or utilised.',
    stat: '₹8L Cr+',
    statLabel: 'annual public infrastructure spend with poor visibility',
    color: 'from-orange-500 to-amber-400',
    glow: 'shadow-orange-500/20',
  },
  {
    icon: Unplug,
    title: 'Disconnected Citizens',
    desc: 'A deep gap exists between what government bodies accomplish and what citizens perceive — leading to mistrust and low civic engagement.',
    stat: '3 in 5',
    statLabel: 'citizens feel disconnected from governance decisions',
    color: 'from-purple-600 to-pink-500',
    glow: 'shadow-purple-500/20',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-[#0d1630] to-[#0a0f1e]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-5">
            The Problem
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            The Transparency Gap
            <br />
            <span className="text-gradient">in Public Works</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            India invests massively in public infrastructure, yet the people it serves are often the last to know.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`reveal card-glass p-7 rounded-2xl group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl ${p.glow}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <p.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{p.desc}</p>

              {/* Stat */}
              <div className="pt-4 border-t border-white/10">
                <div className={`text-3xl font-black bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
                  {p.stat}
                </div>
                <div className="text-white/40 text-xs mt-1">{p.statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom connector */}
        <div className="mt-16 flex justify-center reveal">
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
            HyperLocal Targeting Engine bridges this gap
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
