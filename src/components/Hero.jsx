import { MapPin, ArrowRight, Play } from 'lucide-react'

// Animated city map SVG
function CityMap() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
      {/* Grid roads */}
      {[60, 120, 180, 240, 300, 360].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="600" y2={y} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="8 4" />
      ))}
      {[75, 150, 225, 300, 375, 450, 525].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="8 4" />
      ))}

      {/* Main roads */}
      <line x1="0" y1="200" x2="600" y2="200" stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="300" y1="0" x2="300" y2="400" stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="0" y1="100" x2="600" y2="320" stroke="#3b82f6" strokeWidth="1" />
      <line x1="0" y1="300" x2="600" y2="80" stroke="#3b82f6" strokeWidth="1" />

      {/* Buildings */}
      {[
        [80, 130, 40, 50], [140, 140, 35, 40], [200, 120, 45, 60],
        [350, 130, 55, 70], [430, 140, 40, 50], [500, 125, 35, 55],
        [80, 230, 45, 50], [150, 240, 30, 40], [220, 225, 50, 55],
        [370, 235, 40, 45], [450, 230, 35, 50], [510, 240, 45, 40],
      ].map(([x, y, w, h], i) => (
        <rect
          key={i}
          x={x} y={y} width={w} height={h}
          fill={`rgba(59,130,246,${0.08 + (i % 3) * 0.04})`}
          stroke="rgba(96,165,250,0.3)"
          strokeWidth="0.5"
          rx="2"
        />
      ))}

      {/* Geo-fence circles */}
      <circle cx="300" cy="200" r="80" fill="none" stroke="#ff9933" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" className="animate-draw-fence" style={{ strokeDashoffset: 600 }} />
      <circle cx="300" cy="200" r="60" fill="rgba(255,153,51,0.06)" stroke="#ff9933" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />

      {/* Moving location pins */}
      <g className="animate-move-pin" style={{ transformOrigin: '150px 180px' }}>
        <circle cx="150" cy="180" r="6" fill="#3b82f6" />
        <circle cx="150" cy="180" r="12" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5" className="animate-pulse-ring" />
        <circle cx="150" cy="180" r="20" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
      </g>

      {/* Static pins */}
      <g>
        <circle cx="300" cy="200" r="8" fill="#ff9933" />
        <circle cx="300" cy="200" r="16" fill="none" stroke="#ff9933" strokeWidth="1.5" opacity="0.6" className="animate-ping-dot" />
      </g>
      <g>
        <circle cx="420" cy="150" r="5" fill="#60a5fa" />
        <circle cx="420" cy="150" r="10" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5" />
      </g>
      <g>
        <circle cx="180" cy="280" r="5" fill="#a78bfa" />
        <circle cx="180" cy="280" r="10" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden map-grid"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1525] via-[#0a0f1e] to-[#0a0f1e]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />

      {/* Animated city map background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-5xl">
          <CityMap />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-ping-dot" />
          Civic-Tech Innovation · Digital India
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 animate-slide-up">
          See Development{' '}
          <span className="text-gradient">Around You</span>
          <br />
          <span className="text-white">— In Real Time</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-200">
          Step inside a geo-fenced zone near a hospital, bridge, or metro project —
          and instantly know what's being built, how much is spent, and why it matters to you.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up delay-300">
          <a
            href="#demo"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full font-bold text-white text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <Play className="w-5 h-5" /> Explore Demo
          </a>
          <a
            href="#solution"
            className="flex items-center gap-2 px-8 py-4 border-2 border-white/20 rounded-full font-bold text-white text-lg hover:border-orange-400 hover:text-orange-400 hover:-translate-y-1 transition-all duration-300"
          >
            Learn More <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto animate-slide-up delay-500">
          {[
            { num: '500+', label: 'Zones Mapped' },
            { num: '2M+', label: 'Citizens Reached' },
            { num: '98%', label: 'Accuracy Rate' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-gradient-saffron">{s.num}</div>
              <div className="text-xs text-white/40 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <div className="text-white/30 text-xs tracking-widest uppercase">Scroll</div>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
