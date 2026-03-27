import { useState } from 'react'
import { Send, Handshake, Play, Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', org: '', email: '', type: 'demo', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', org: '', email: '', type: 'demo', message: '' })
  }

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1630] to-[#0a0f1e]" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[700px] h-[400px] bg-blue-900/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-5">
            Get Involved
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Let's Build a{' '}
            <span className="text-gradient">Transparent India</span>
            {' '}Together
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Whether you're a government body, NGO, investor, or curious citizen — we'd love to connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* CTA cards — 2 cols */}
          <div className="lg:col-span-2 space-y-4 reveal">
            {[
              {
                icon: Handshake,
                title: 'Partner With Us',
                desc: 'For government bodies, municipal corporations, and NGOs interested in piloting the platform.',
                color: '#ff9933',
                type: 'partner',
              },
              {
                icon: Play,
                title: 'Request a Demo',
                desc: 'See a live walkthrough tailored to your city, ward, or project type.',
                color: '#3b82f6',
                type: 'demo',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="card-glass rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setForm((f) => ({ ...f, type: c.type }))}
                style={{
                  border: form.type === c.type ? `1px solid ${c.color}40` : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: form.type === c.type ? `0 0 20px ${c.color}15` : 'none',
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
                  >
                    <c.icon className="w-5 h-5" style={{ color: c.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{c.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact info */}
            <div className="card-glass rounded-2xl p-6 space-y-4">
              {[
                { icon: Mail, label: 'hello@hyperlocal.in', color: '#60a5fa' },
                { icon: Phone, label: '+91 98XXX XXXXX', color: '#34d399' },
                { icon: MapPin, label: 'New Delhi, India', color: '#ff9933' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} />
                  <span className="text-white/50 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form — 3 cols */}
          <div className="lg:col-span-3 reveal delay-200">
            <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: 'name', label: 'Your Name', placeholder: 'Rahul Verma', type: 'text' },
                  { id: 'org', label: 'Organisation', placeholder: 'Municipal Corp / NGO / etc.', type: 'text' },
                ].map((f) => (
                  <div key={f.id}>
                    <label className="block text-xs font-medium text-white/50 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.id]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.id]: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Enquiry Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="demo">Request a Demo</option>
                  <option value="partner">Partnership Enquiry</option>
                  <option value="invest">Investment / Funding</option>
                  <option value="research">Research Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your city, project, or how you'd like to collaborate..."
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                  sent
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5'
                }`}
              >
                {sent ? (
                  <>✓ Message Sent! We'll be in touch soon.</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
