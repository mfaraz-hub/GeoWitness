import { useEffect, useRef, useState } from 'react'
import { Shield, Users, TrendingUp, Flag } from 'lucide-react'

const stats = [
  { value: 70, suffix: '%', label: 'Citizens currently unaware of local development', color: '#ff9933' },
  { value: 2.1, suffix: 'M+', label: 'Citizens targeted in pilot rollout', color: '#3b82f6', decimal: true },
  { value: 89, suffix: '%', label: 'User satisfaction in civic awareness surveys', color: '#34d399' },
  { value: 3, suffix: 'x', label: 'Increase in civic participation after deployment', color: '#a78bfa' },
]

const impacts = [
  {
    icon: Shield,
    title: 'Builds Trust',
    desc: 'Transparent data and verifiable project info builds lasting trust between citizens and government bodies.',
    color: '#3b82f6',
  },
  {
    icon: TrendingUp,
    title: 'Promotes Accountability',
    desc: 'Real-time tracking means public officials are incentivised to deliver on time and within budget.',
    color: '#ff9933',
  },
  {
    icon: Users,
    title: 'Encourages Participation',
    desc: 'Informed citizens are empowered to attend public hearings, submit feedback, and engage with civic processes.',
    color: '#34d399',
  },
  {
    icon: Flag,
    title: 'Supports Digital India',
    desc: 'Aligns directly with e-governance, Jan Bhagidari, and the Smart Cities Mission under the Digital India initiative.',
    color: '#a78bfa',
  },
]

function AnimatedNumber({ value, suffix, decimal, color }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const target = value
        const duration = 1800
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(decimal ? +(eased * target).toFixed(1) : Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, decimal])

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-black" style={{ color }}>
      {display}{suffix}
    </span>
  )
}

export default function Impact() {
  return (
    <section id="impact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1630] via-[#0a0f1e] to-[#0d1630]" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] bg-blue-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-5">
            Civic Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Numbers That{' '}
            <span className="text-gradient">Tell the Story</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            The case for hyper-local civic transparency is not just moral — it's measurable.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal card-glass rounded-2xl p-6 text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <AnimatedNumber value={s.value} suffix={s.suffix} decimal={s.decimal} color={s.color} />
              <p className="text-white/40 text-xs mt-3 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Impact pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {impacts.map((imp, i) => (
            <div
              key={imp.title}
              className="reveal card-glass rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `${imp.color}15`, border: `1px solid ${imp.color}30` }}
              >
                <imp.icon className="w-5 h-5" style={{ color: imp.color }} />
              </div>
              <h3 className="font-bold text-white mb-2">{imp.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{imp.desc}</p>
            </div>
          ))}
        </div>

        {/* Digital India banner */}
        <div className="mt-12 reveal">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,153,51,0.08), rgba(255,255,255,0.03), rgba(19,78,74,0.08))',
              border: '1px solid rgba(255,153,51,0.2)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-1.5 w-10 bg-orange-400 rounded-full" />
              <div className="h-1.5 w-10 bg-white rounded-full" />
              <div className="h-1.5 w-10 bg-green-500 rounded-full" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Aligned with <span className="text-gradient-saffron">Digital India</span> Vision
            </h3>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              HyperLocal Targeting Engine directly supports the government's Jan Bhagidari initiative,
              Smart Cities Mission, and the e-Governance transparency mandate.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
