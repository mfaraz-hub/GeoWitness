import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Circle, CircleMarker, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Bell, X, ChevronRight, IndianRupee, Calendar, CheckCircle2 } from 'lucide-react'
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
    radius: 500,           // exact radius from snippet
    budget: '₹42.3 Cr',
    progress: 75,
    deadline: 'Dec 2025',
    color: '#3b82f6',      // blue — matching snippet's color:'blue'
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
    progress: 42,
    deadline: 'Mar 2026',
    color: '#f97316',
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
    progress: 61,
    deadline: 'Jun 2027',
    color: '#a78bfa',
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

// Notification card
function NotificationCard({ project, onClose }) {
  return (
    <div className="bg-[#111827] border border-orange-500/30 rounded-2xl p-5 shadow-2xl shadow-orange-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs text-orange-400 font-semibold tracking-wide">HyperLocal Alert</div>
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

      <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity">
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
    <section id="demo" className="relative py-28 overflow-hidden">
      <style>{mapContainerStyle}</style>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1630] to-[#0a0f1e]" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-900/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-5">
            Live Interactive Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Watch It{' '}
            <span className="text-gradient-saffron">Happen Live</span>
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
                  <NotificationCard project={activeProject} onClose={() => setNotifVisible(false)} />
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
  )
}
