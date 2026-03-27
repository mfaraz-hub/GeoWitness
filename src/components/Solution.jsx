import { MapPin, Radio, Bell, LayoutDashboard } from 'lucide-react'

const steps = [
  {
    icon: MapPin,
    step: '01',
    title: 'Enter the Zone',
    desc: 'A citizen walks near a defined geo-fenced area — a hospital upgrade, a new bridge, or a metro construction site.',
    color: '#3b82f6',
    bg: 'from-blue-600/20 to-blue-800/10',
  },
  {
    icon: Radio,
    step: '02',
    title: 'System Detects Location',
    desc: 'The platform\'s geo-engine instantly detects the user\'s proximity to the registered civic project zone using GPS.',
    color: '#a78bfa',
    bg: 'from-purple-600/20 to-purple-800/10',
  },
  {
    icon: Bell,
    step: '03',
    title: 'Smart Notification Sent',
    desc: 'A rich, targeted notification is pushed to the user\'s device with real-time, project-specific information.',
    color: '#ff9933',
    bg: 'from-orange-500/20 to-orange-800/10',
  },
  {
    icon: LayoutDashboard,
    step: '04',
    title: 'View Project Details',
    desc: 'Citizens explore a full transparency dashboard — budget, timelines, contractor info, completion percentage, and civic impact.',
    color: '#34d399',
    bg: 'from-emerald-600/20 to-emerald-800/10',
  },
]

// Flow diagram SVG
function FlowDiagram() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-10">
      {/* Connection line */}
      <div className="absolute top-1/2 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-400 to-emerald-400 hidden md:block -translate-y-1/2 z-0" />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="reveal flex flex-col items-center text-center"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Icon circle */}
            <div
              className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${s.bg} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              style={{ borderColor: `${s.color}40` }}
            >
              <s.icon className="w-7 h-7" style={{ color: s.color }} />
              <span
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                style={{ background: s.color }}
              >
                {s.step.replace('0', '')}
              </span>
            </div>

            {/* Text */}
            <h4 className="font-bold text-white text-sm mb-2">{s.title}</h4>
            <p className="text-white/45 text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Solution() {
  return (
    <section id="solution" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] to-[#0d1630]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-4 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-5">
            The Solution
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            How{' '}
            <span className="text-gradient">Geo-Fencing</span>
            {' '}Works
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            A four-step journey from physical location to digital transparency — in seconds.
          </p>
        </div>

        <FlowDiagram />

        {/* Explainer card */}
        <div className="mt-10 reveal">
          <div className="card-glass rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Powered by{' '}
                <span className="text-gradient-saffron">Precision Geo-Fencing</span>
              </h3>
              <p className="text-white/55 leading-relaxed mb-5">
                Geo-fencing creates an invisible digital boundary around a real-world location.
                When a user's device enters this boundary, the system triggers a contextual,
                hyper-relevant notification — no searching required.
              </p>
              <ul className="space-y-3">
                {[
                  'Radius customizable from 50m to 5km per zone',
                  'Works on Android & iOS via push notifications',
                  'Privacy-first: no data stored after exit',
                  'Near real-time (<500ms) trigger latency',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="mt-1 w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: animated geo-fence graphic */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Outer rings */}
                {[120, 96, 72].map((r, i) => (
                  <div
                    key={r}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className="rounded-full border-2 border-dashed"
                      style={{
                        width: `${r * 2}px`,
                        height: `${r * 2}px`,
                        borderColor: `rgba(255,153,51,${0.15 + i * 0.12})`,
                        animation: `spin-slow ${10 + i * 5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                      }}
                    />
                  </div>
                ))}
                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/40 animate-float">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                </div>
                {/* Moving user dot */}
                <div className="absolute inset-0 flex items-center justify-center animate-move-pin" style={{ transformOrigin: 'center' }}>
                  <div
                    className="w-6 h-6 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 flex items-center justify-center"
                    style={{ transform: 'translate(90px, -30px)' }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                {/* Label */}
                <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-orange-400/70 font-medium">
                  Geo-Fenced Zone
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
