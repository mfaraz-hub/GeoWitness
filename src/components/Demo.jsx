import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Circle, CircleMarker, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Bell, X, ChevronRight, IndianRupee, Calendar, CheckCircle2, Users, FileText, AlertTriangle, TrendingUp, Building2, Phone, Mail, ExternalLink, Clock, Shield, Wrench } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Project pin custom icon
const projectIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:36px;height:36px;
    background:linear-gradient(135deg,#f97316,#f59e0b);
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    border:3px solid white;
    box-shadow:0 4px 16px rgba(249,115,22,0.5);
  "></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
})

// User marker icon
const userIcon = (active) => L.divIcon({
  className: '',
  html: `<div style="
    width:20px;height:20px;
    background:${active ? '#22c55e' : '#3b82f6'};
    border-radius:50%;
    border:3px solid white;
    box-shadow:0 0 0 4px ${active ? 'rgba(34,197,94,0.3)' : 'rgba(59,130,246,0.3)'};
    transition:all 0.5s ease;
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

// ─── Coordinates from provided Leaflet snippet ───────────────────────────────
// Primary: Government Hospital at [28.6139, 77.2090] (Connaught Place area, Delhi)
// Geo-fence radius: 500m   Color: blue
// ─────────────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    name: 'Government Hospital Upgrade',
    popupLabel: 'Government Hospital Upgrade Completed',
    type: 'Government Hospital',
    lat: 28.6139,
    lng: 77.2090,
    radius: 500,
    budget: '₹42.3 Cr',
    spent: '₹31.7 Cr',
    progress: 75,
    deadline: 'Dec 2025',
    color: '#3b82f6',
    contractor: 'Delhi Infrastructure Ltd.',
    contractorContact: '+91-11-2345-6789',
    contractorEmail: 'projects@dil.gov.in',
    sanctionedBy: 'MCD — Health & Sanitation Dept.',
    tenderNo: 'MCD/H&S/2023/0471',
    startDate: 'Jan 2024',
    workers: 184,
    safetyRating: 'A+',
    lastInspection: '14 Mar 2026',
    nextInspection: '14 Apr 2026',
    description: 'Complete upgrade of the 240-bed government hospital including new ICU wing, OPD block, modern diagnostic labs, and emergency trauma centre. Expected to serve 3,000+ patients daily upon completion.',
    impact: '3,000+ daily patients, 240 beds upgraded, 4 new speciality wings',
    complaints: 2,
    updates: [
      { date: 'Mar 2026', text: 'Interior fit-out 60% complete. Equipment procurement in progress.' },
      { date: 'Jan 2026', text: 'Electrical & plumbing works signed off. Fire NOC received.' },
      { date: 'Oct 2025', text: 'Structural frame completed ahead of schedule by 3 weeks.' },
    ],
    milestones: [
      { label: 'Foundation Work', done: true },
      { label: 'Structural Frame', done: true },
      { label: 'Electrical & Plumbing', done: true },
      { label: 'Interior Fit-out', done: false },
      { label: 'Equipment Installation', done: false },
    ],
  },
  {
    id: 2,
    name: 'Yamuna Cable Bridge — Phase 2',
    popupLabel: 'Yamuna Cable Bridge — Under Construction',
    type: 'Infrastructure',
    lat: 28.6304,
    lng: 77.2897,
    radius: 500,
    budget: '₹118 Cr',
    spent: '₹49.6 Cr',
    progress: 42,
    deadline: 'Mar 2026',
    color: '#f97316',
    contractor: 'Gammon India Pvt. Ltd.',
    contractorContact: '+91-11-4567-8901',
    contractorEmail: 'bridges@gammonindia.com',
    sanctionedBy: 'DUSIB — Infrastructure Wing',
    tenderNo: 'DUSIB/INF/2022/1102',
    startDate: 'Sep 2023',
    workers: 312,
    safetyRating: 'B+',
    lastInspection: '2 Mar 2026',
    nextInspection: '2 Apr 2026',
    description: 'Phase 2 of the iconic Yamuna Cable-Stayed Bridge connecting East Delhi to Central Delhi. Will carry 6 lanes of traffic and a dedicated cycle track, cutting cross-river commute by ~40 minutes.',
    impact: '6-lane capacity, ~40 min commute reduction, 80,000 daily vehicles expected',
    complaints: 5,
    updates: [
      { date: 'Mar 2026', text: 'Cable tower no. 2 reaching final elevation. Deck slab pouring underway.' },
      { date: 'Dec 2025', text: 'Piling and foundation works on both banks completed.' },
      { date: 'Aug 2025', text: 'Environmental clearance obtained. River-bed work commenced.' },
    ],
    milestones: [
      { label: 'Piling & Foundation', done: true },
      { label: 'Cable Towers', done: true },
      { label: 'Deck Construction', done: false },
      { label: 'Surfacing & Railings', done: false },
    ],
  },
  {
    id: 3,
    name: 'Metro Phase 4 — Aerocity Corridor',
    popupLabel: 'Metro Phase 4 — Active Construction Zone',
    type: 'Transport',
    lat: 28.6229,
    lng: 77.0689,
    radius: 500,
    budget: '₹2,800 Cr',
    spent: '₹1,708 Cr',
    progress: 61,
    deadline: 'Jun 2027',
    color: '#a78bfa',
    contractor: 'AFCONS Infrastructure Ltd.',
    contractorContact: '+91-22-6612-0000',
    contractorEmail: 'metro@afcons.com',
    sanctionedBy: 'DMRC — Phase 4 Project Cell',
    tenderNo: 'DMRC/P4/2021/AEL-07',
    startDate: 'Apr 2022',
    workers: 1240,
    safetyRating: 'A',
    lastInspection: '20 Mar 2026',
    nextInspection: '20 Apr 2026',
    description: 'Underground metro corridor linking Janakpuri West to RK Ashram Marg via Aerocity and Tughlakabad. 23.6 km stretch with 11 stations, integrating with IGI Airport Terminal 1.',
    impact: '11 new stations, 23.6 km corridor, 500,000+ daily riders projected',
    complaints: 11,
    updates: [
      { date: 'Mar 2026', text: 'Station structure at Aerocity 70% complete. TBM boring reached km 14.' },
      { date: 'Nov 2025', text: 'Underground boring milestone: 10 km of tunnel completed.' },
      { date: 'Jul 2025', text: 'All land acquisition disputes resolved. Signalling system tender awarded.' },
    ],
    milestones: [
      { label: 'Land Acquisition', done: true },
      { label: 'Underground Boring', done: true },
      { label: 'Station Structure', done: false },
      { label: 'Systems & Signalling', done: false },
    ],
  },
]

// Route walks from ~800m outside the hospital zone into it
// Starting north-east of [28.6139, 77.2090], stepping closer each tick
const userRoute = [
  [28.6210, 77.2180],   // ~1.1km away — outside
  [28.6190, 77.2160],   // ~900m
  [28.6170, 77.2140],   // ~700m
  [28.6155, 77.2115],   // ~400m — approaching boundary
  [28.6139, 77.2090],   // ← exact pin coords — inside zone (radius 500m)
]

// Component to pan/zoom map programmatically
function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.8 })
  }, [center, zoom])
  return null
}

// Dark tile layer style override
const mapContainerStyle = `
  .leaflet-container {
    background: #0d1a30 !important;
    font-family: inherit;
  }
  .leaflet-tile {
    filter: brightness(0.55) saturate(0.4) hue-rotate(200deg) !important;
  }
  .leaflet-control-attribution {
    background: rgba(10,15,30,0.7) !important;
    color: rgba(255,255,255,0.3) !important;
    font-size: 9px !important;
  }
  .leaflet-control-attribution a { color: rgba(255,255,255,0.4) !important; }
  .leaflet-control-zoom a {
    background: rgba(10,15,30,0.8) !important;
    color: rgba(255,255,255,0.6) !important;
    border-color: rgba(255,255,255,0.1) !important;
  }
  .leaflet-popup-content-wrapper {
    background: #111827 !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 12px !important;
    color: white !important;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5) !important;
  }
  .leaflet-popup-tip { background: #111827 !important; }
  .leaflet-popup-close-button { color: rgba(255,255,255,0.4) !important; }
`

// Full Dashboard Modal
function DashboardModal({ project, onClose }) {
  const [tab, setTab] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'financials', label: 'Financials' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'contractor', label: 'Contractor' },
  ]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: '#0d1630', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 px-6 pt-6 pb-4" style={{ background: '#0d1630', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}>
                <Building2 className="w-5 h-5" style={{ color: project.color }} />
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: project.color }}>{project.type}</div>
                <h2 className="text-white font-black text-base leading-snug">{project.name}</h2>
              </div>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0 mt-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                style={tab === t.id
                  ? { background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }
                  : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 pt-5 space-y-5">

          {/* ── OVERVIEW TAB ── */}
          {tab === 'overview' && (
            <>
              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>

              {/* KPI strip */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: IndianRupee, label: 'Total Budget', val: project.budget, color: '#ff9933' },
                  { icon: TrendingUp, label: 'Progress', val: `${project.progress}%`, color: '#34d399' },
                  { icon: Calendar, label: 'Deadline', val: project.deadline, color: '#60a5fa' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
                    <item.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: item.color }} />
                    <div className="text-white font-bold text-sm">{item.val}</div>
                    <div className="text-white/40 text-[10px] mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Overall Completion</span>
                  <span className="font-semibold" style={{ color: '#34d399' }}>{project.progress}%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%`, background: `linear-gradient(90deg, ${project.color}, #34d399)` }} />
                </div>
              </div>

              {/* Milestones */}
              <div>
                <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Milestones</div>
                <div className="space-y-2">
                  {project.milestones.map((m, i) => (
                    <div key={m.label} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${m.done ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/30 border border-white/15'}`}>
                        {m.done ? '✓' : i + 1}
                      </div>
                      <span className={`text-sm flex-1 ${m.done ? 'text-white/40 line-through' : 'text-white/80'}`}>{m.label}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${m.done ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                        {m.done ? 'Done' : 'In Progress'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citizen Impact */}
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,153,51,0.06)', border: '1px solid rgba(255,153,51,0.15)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider">Citizen Impact</span>
                </div>
                <p className="text-white/70 text-sm">{project.impact}</p>
              </div>
            </>
          )}

          {/* ── FINANCIALS TAB ── */}
          {tab === 'financials' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Sanctioned Budget', val: project.budget, sub: 'As approved', color: '#60a5fa' },
                  { label: 'Amount Spent', val: project.spent, sub: 'Disbursed to date', color: '#34d399' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4" style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
                    <div className="text-white/40 text-xs mb-1">{item.label}</div>
                    <div className="text-2xl font-black" style={{ color: item.color }}>{item.val}</div>
                    <div className="text-white/30 text-[10px] mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Spend progress */}
              <div>
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Budget Utilisation</span>
                  <span className="text-emerald-400 font-semibold">{Math.round((parseFloat(project.spent.replace(/[₹, Cr]/g,'')) / parseFloat(project.budget.replace(/[₹, Cr]/g,''))) * 100)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${Math.round((parseFloat(project.spent.replace(/[₹, Cr]/g,'')) / parseFloat(project.budget.replace(/[₹, Cr]/g,''))) * 100)}%` }} />
                </div>
              </div>

              {[
                { label: 'Sanctioned By', val: project.sanctionedBy, icon: Shield },
                { label: 'Tender / File No.', val: project.tenderNo, icon: FileText },
                { label: 'Contract Start', val: project.startDate, icon: Calendar },
                { label: 'Expected Completion', val: project.deadline, icon: Clock },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <row.icon className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white/35 text-[10px] uppercase tracking-wide">{row.label}</div>
                    <div className="text-white/80 text-sm font-medium mt-0.5">{row.val}</div>
                  </div>
                </div>
              ))}

              <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-amber-400 text-xs font-semibold">Citizen Complaints Filed</div>
                  <div className="text-white/60 text-sm mt-0.5">{project.complaints} complaint{project.complaints !== 1 ? 's' : ''} registered via GeoWitness portal</div>
                </div>
              </div>
            </>
          )}

          {/* ── TIMELINE TAB ── */}
          {tab === 'timeline' && (
            <>
              <div className="flex gap-4 text-sm">
                {[
                  { label: 'Workers On-Site', val: project.workers.toLocaleString(), icon: Users, color: '#a78bfa' },
                  { label: 'Safety Rating', val: project.safetyRating, icon: Shield, color: '#34d399' },
                ].map((item) => (
                  <div key={item.label} className="flex-1 rounded-xl p-3" style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
                    <item.icon className="w-4 h-4 mb-1.5" style={{ color: item.color }} />
                    <div className="text-white font-bold">{item.val}</div>
                    <div className="text-white/40 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Recent Updates</div>
                <div className="relative pl-5 border-l border-white/10 space-y-4">
                  {project.updates.map((u, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white/20" style={{ background: i === 0 ? project.color : 'rgba(255,255,255,0.1)' }} />
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: i === 0 ? project.color : 'rgba(255,255,255,0.3)' }}>{u.date}</div>
                      <p className="text-white/70 text-sm leading-relaxed">{u.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {[
                { label: 'Last Inspection', val: project.lastInspection, icon: Wrench },
                { label: 'Next Scheduled Inspection', val: project.nextInspection, icon: Calendar },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <row.icon className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <div>
                    <div className="text-white/35 text-[10px] uppercase tracking-wide">{row.label}</div>
                    <div className="text-white/80 text-sm font-medium mt-0.5">{row.val}</div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* ── CONTRACTOR TAB ── */}
          {tab === 'contractor' && (
            <>
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{project.contractor}</div>
                    <div className="text-white/40 text-xs mt-0.5">Primary Contractor</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { icon: Phone, label: 'Contact', val: project.contractorContact },
                    { icon: Mail, label: 'Email', val: project.contractorEmail },
                    { icon: Shield, label: 'Sanctioned By', val: project.sanctionedBy },
                    { icon: FileText, label: 'Tender No.', val: project.tenderNo },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3 py-2 border-t border-white/5">
                      <row.icon className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                      <span className="text-white/35 text-xs w-24 flex-shrink-0">{row.label}</span>
                      <span className="text-white/70 text-xs">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Transparency Portal</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  All documents, bills, and inspection reports for this project are available on the GeoWitness public transparency portal. Citizens can raise RTI requests or file complaints directly.
                </p>
                <button className="mt-3 text-blue-400 text-xs font-semibold flex items-center gap-1 hover:text-blue-300 transition-colors">
                  Visit Portal <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

// Notification card
function NotificationCard({ project, onClose, onViewDashboard }) {
  return (
    <div className="bg-[#111827] border border-orange-500/30 rounded-2xl p-5 shadow-2xl shadow-orange-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs text-orange-400 font-semibold tracking-wide">GeoWitness Alert</div>
            <div className="text-[11px] text-white/40">Just now · New Delhi</div>
          </div>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <h4 className="text-white font-bold text-sm mb-0.5">{project.name}</h4>
      <p className="text-orange-400/70 text-[11px] mb-3">{project.type} · You are within the geo-fenced zone</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: IndianRupee, label: 'Budget', val: project.budget, color: '#ff9933' },
          { icon: CheckCircle2, label: 'Progress', val: `${project.progress}%`, color: '#34d399' },
          { icon: Calendar, label: 'Deadline', val: project.deadline, color: '#60a5fa' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-2.5 text-center"
            style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}
          >
            <item.icon className="w-3 h-3 mx-auto mb-1" style={{ color: item.color }} />
            <div className="text-white font-bold text-[11px]">{item.val}</div>
            <div className="text-white/40 text-[9px]">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>Completion Status</span>
          <span className="text-emerald-400 font-medium">{project.progress}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-1000"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {project.milestones.map((m) => (
          <div key={m.label} className="flex items-center gap-2 text-xs">
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${m.done ? 'bg-emerald-500' : 'bg-white/10 border border-white/20'}`}>
              {m.done && <span className="text-white text-[8px]">✓</span>}
            </div>
            <span className={m.done ? 'text-white/50 line-through' : 'text-white/80'}>{m.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onViewDashboard}
        className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
      >
        View Full Dashboard <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export default function Demo() {
  const [userPos, setUserPos] = useState(userRoute[0])
  const [userInZone, setUserInZone] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [notifVisible, setNotifVisible] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090])
  const [mapZoom, setMapZoom] = useState(13)
  const timersRef = useRef([])

  const steps = [
    'Select a project pin on the map to focus, or press Replay Demo...',
    'User is walking near the civic project area...',
    'Approaching the geo-fenced boundary...',
    'Geo-fence crossed! Detecting project data...',
    '🔔 Notification sent to device!',
    'User is viewing the project transparency dashboard.',
  ]

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const runDemo = () => {
    if (running) return
    clearTimers()
    setRunning(true)
    setStep(1)
    setNotifVisible(false)
    setUserInZone(false)
    setUserPos(userRoute[0])
    setActiveProject(null)
    setMapCenter([28.6139, 77.2090])
    setMapZoom(13)

    userRoute.forEach((pos, i) => {
      const t = setTimeout(() => {
        setUserPos(pos)
        if (i === 1) setStep(2)
        if (i === 3) setStep(3)
        if (i === 4) {
          setUserInZone(true)
          setStep(4)
          setActiveProject(projects[0])
          setMapCenter([28.6139, 77.2090])
          setMapZoom(15)
        }
      }, 800 + i * 1000)
      timersRef.current.push(t)
    })

    const t1 = setTimeout(() => { setStep(5); setNotifVisible(true) }, 6200)
    const t2 = setTimeout(() => setRunning(false), 7000)
    timersRef.current.push(t1, t2)
  }

  const handleProjectClick = (project) => {
    clearTimers()
    setRunning(false)
    setActiveProject(project)
    setNotifVisible(true)
    setMapCenter([project.lat, project.lng])
    setMapZoom(15)
    setStep(5)
  }

  useEffect(() => {
    const t = setTimeout(runDemo, 800)
    return () => { clearTimeout(t); clearTimers() }
  }, [])

  return (
    <>
    {dashboardOpen && activeProject && (
      <DashboardModal project={activeProject} onClose={() => setDashboardOpen(false)} />
    )}
    <section id="demo" className="relative py-28 overflow-hidden">
      <style>{mapContainerStyle}</style>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1630] to-[#0a0f1e]" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-900/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-5">
            Live Interactive Map
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ongoing{' '}
            <span className="text-gradient-saffron">Constructions</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A real map of Delhi showing geo-fenced civic project zones. Click any pin or press Replay to simulate a user entering a zone.
          </p>
        </div>

        {/* Project selector chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 reveal">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProjectClick(p)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: activeProject?.id === p.id ? `${p.color}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeProject?.id === p.id ? p.color : 'rgba(255,255,255,0.1)'}`,
                color: activeProject?.id === p.id ? p.color : 'rgba(255,255,255,0.5)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: p.color }}
              />
              {p.name.split('—')[0].trim()}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Map — 3 cols */}
          <div className="lg:col-span-3 reveal">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                height: '420px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 40px rgba(0,0,0,0.4)',
              }}
            >
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ width: '100%', height: '100%' }}
                zoomControl={true}
                scrollWheelZoom={false}
              >
                <MapController center={mapCenter} zoom={mapZoom} />

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Geo-fence circles for each project */}
                {projects.map((p) => (
                  <Circle
                    key={p.id}
                    center={[p.lat, p.lng]}
                    radius={p.radius}
                    pathOptions={{
                      color: p.color,
                      fillColor: p.color,
                      fillOpacity: activeProject?.id === p.id ? 0.12 : 0.06,
                      weight: activeProject?.id === p.id ? 2.5 : 1.5,
                      dashArray: '8 6',
                    }}
                  />
                ))}

                {/* Project markers */}
                {projects.map((p) => (
                  <Marker
                    key={p.id}
                    position={[p.lat, p.lng]}
                    icon={L.divIcon({
                      className: '',
                      html: `<div style="
                        width:32px;height:32px;
                        background:linear-gradient(135deg,${p.color},${p.color}bb);
                        border-radius:50% 50% 50% 0;
                        transform:rotate(-45deg);
                        border:2.5px solid white;
                        box-shadow:0 4px 20px ${p.color}70;
                        cursor:pointer;
                      "></div>`,
                      iconSize: [32, 32],
                      iconAnchor: [16, 32],
                      popupAnchor: [0, -36],
                    })}
                    eventHandlers={{ click: () => handleProjectClick(p) }}
                  >
                    <Popup>
                      <div style={{ color: 'white', minWidth: '200px', padding: '4px 2px' }}>
                        <div style={{ fontSize: '11px', color: p.color, fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.type}</div>
                        {/* popupLabel mirrors the exact bindPopup text from the Leaflet snippet */}
                        <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', lineHeight: '1.4' }}>{p.popupLabel}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>
                          <span>Budget: <strong style={{ color: '#ff9933' }}>{p.budget}</strong></span>
                          <span>Progress: <strong style={{ color: '#34d399' }}>{p.progress}%</strong></span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ width: `${p.progress}%`, height: '100%', background: `linear-gradient(90deg,${p.color},#34d399)`, borderRadius: '99px' }} />
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
                          📍 Geo-fence radius: {p.radius}m
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Animated user marker */}
                <CircleMarker
                  center={userPos}
                  radius={9}
                  pathOptions={{
                    color: userInZone ? '#22c55e' : '#3b82f6',
                    fillColor: userInZone ? '#22c55e' : '#3b82f6',
                    fillOpacity: 1,
                    weight: 3,
                    opacity: 1,
                  }}
                >
                  <Popup>
                    <div style={{ color: 'white', fontSize: '12px', padding: '2px' }}>
                      <strong>📍 You</strong><br />
                      <span style={{ color: userInZone ? '#22c55e' : '#93c5fd', fontSize: '11px' }}>
                        {userInZone ? '✅ Inside geo-fenced zone' : 'Walking near project area'}
                      </span>
                    </div>
                  </Popup>
                </CircleMarker>

                {/* Outer pulse ring for user */}
                <CircleMarker
                  center={userPos}
                  radius={18}
                  pathOptions={{
                    color: userInZone ? '#22c55e' : '#3b82f6',
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    weight: 1.5,
                    opacity: 0.4,
                  }}
                />
              </MapContainer>
            </div>

            {/* Step indicator */}
            <div className="mt-4 card-glass rounded-xl px-5 py-3 flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300"
                style={{ background: userInZone ? '#22c55e' : '#ff9933', boxShadow: `0 0 6px ${userInZone ? '#22c55e' : '#ff9933'}` }}
              />
              <p className="text-sm text-white/60">{steps[step]}</p>
            </div>

            {/* Replay button */}
            <button
              onClick={runDemo}
              disabled={running}
              className={`mt-3 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                running
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {running ? 'Simulation Running...' : 'Replay Demo'}
            </button>
          </div>

          {/* Notification panel — 2 cols */}
          <div className="lg:col-span-2 reveal delay-200">
            <div className="mb-4 text-sm font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notification Preview
            </div>
            {notifVisible && activeProject
              ? (
                <div className={`transition-all duration-500 ${notifVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <NotificationCard project={activeProject} onClose={() => setNotifVisible(false)} onViewDashboard={() => setDashboardOpen(true)} />
                </div>
              )
              : (
                <div className="card-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[220px]">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-white/20" />
                  </div>
                  <p className="text-white/30 text-sm leading-relaxed">
                    Notification appears when the user enters a geo-fenced zone.
                    <br /><span className="text-white/20 text-xs mt-1 block">Click a project pin or press Replay.</span>
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
