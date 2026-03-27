import { MapPin } from 'lucide-react'

const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const TwitterX = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const footerLinks = {
  Platform: ['How It Works', 'Features', 'Use Cases', 'Pricing'],
  'Civic Impact': ['Transparency Dashboard', 'Budget Tracker', 'Project Map', 'Citizen Reports'],
  Company: ['About Team', 'Roadmap', 'Blog', 'Press Kit'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Data Charter', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 overflow-hidden">
      <div className="absolute inset-0 bg-[#070d1a]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top section */}
        <div className="py-14 grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm text-white">GeoWitness</div>
                <div className="text-[10px] text-blue-400 font-medium tracking-widest uppercase">Civic Transparency</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              A geo-fencing based civic awareness platform connecting citizens to the development happening right around them.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[Github, TwitterX, LinkedinIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/35 hover:text-white/70 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/25 text-xs">
            © 2025 GeoWitness. All rights reserved. Built with ❤️ for a transparent India.
          </div>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Digital India / India flag stripe */}
        <div className="pb-2 flex justify-center">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-6 bg-orange-400 rounded-full" />
            <div className="h-0.5 w-6 bg-white/40 rounded-full" />
            <div className="h-0.5 w-6 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  )
}
