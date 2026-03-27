import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "I walk past the new metro construction every day. HyperLocal finally told me when it would be done — and why the road was closed. I felt informed for the first time.",
    name: 'Priya Sharma',
    role: 'Daily Commuter, Delhi',
    avatar: 'PS',
    color: '#3b82f6',
  },
  {
    quote: "As a civic journalist, I've always struggled to get transparent budget data. This platform puts the numbers right in your hands — exactly when and where they're relevant.",
    name: 'Arjun Mehta',
    role: 'Civic Journalist, Mumbai',
    avatar: 'AM',
    color: '#ff9933',
  },
  {
    quote: "Our NGO could use this to track hospital upgrades in real time and verify government claims. This is the accountability tool India has been waiting for.",
    name: 'Dr. Kavita Nair',
    role: 'Director, Jan Vikas NGO',
    avatar: 'KN',
    color: '#34d399',
  },
  {
    quote: "This perfectly aligns with our ward's smart city digital engagement goals. We'd love to pilot this for our upcoming road development projects.",
    name: 'Rajan Patel',
    role: 'Municipal Councillor, Pune',
    avatar: 'RP',
    color: '#a78bfa',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] to-[#0d1630]" />
      <div className="absolute right-0 top-1/2 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-5">
            Community Voices
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            What Citizens Are{' '}
            <span className="text-gradient">Saying</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            From commuters to policy researchers — HyperLocal speaks to every citizen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="reveal card-glass rounded-2xl p-7 group hover:-translate-y-1.5 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 mb-4 opacity-30" style={{ color: t.color }} />

              {/* Quote text */}
              <p className="text-white/70 text-base leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `${t.color}25`, border: `2px solid ${t.color}40`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
                <div
                  className="ml-auto w-1.5 h-8 rounded-full"
                  style={{ background: t.color, opacity: 0.4 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
