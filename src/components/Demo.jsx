import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet'
import { Navigation, MapPin, Search, X, Building2, GraduationCap, Hospital, Construction, ShoppingBag } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { hospitals } from '../data/hospitals'
import { schools } from '../data/schools'
import { malls } from '../data/malls'
import { bridges } from '../data/bridges'
import { buildings } from '../data/buildings'

const allProjects = [...hospitals, ...schools, ...malls, ...bridges, ...buildings]

const categories = [
  { id: 'all', label: 'All', icon: MapPin, color: '#60a5fa' },
  { id: 'hospitals', label: 'Hospitals', icon: Hospital, color: '#3b82f6' },
  { id: 'schools', label: 'Schools', icon: GraduationCap, color: '#34d399' },
  { id: 'malls', label: 'Malls', icon: ShoppingBag, color: '#f59e0b' },
  { id: 'bridges', label: 'Bridges', icon: Construction, color: '#8b5cf6' },
  { id: 'buildings', label: 'Buildings', icon: Building2, color: '#ec4899' },
]

function MapUpdater({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

function ProjectDetails({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0d1630] rounded-2xl border border-white/10 max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#0d1630] border-b border-white/10 p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
              >
                <MapPin className="w-5 h-5" style={{ color: project.color }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{project.popupLabel}</h3>
                <span className="text-xs text-white/40">{project.type}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/50">Progress</span>
              <span className="text-lg font-bold" style={{ color: project.color }}>{project.progress}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${project.progress}%`, background: project.color }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card-glass rounded-xl p-4">
              <div className="text-xs text-white/40 mb-1">Budget</div>
              <div className="text-base font-bold text-white">{project.budget}</div>
              <div className="text-xs text-white/30 mt-1">Spent: {project.spent}</div>
            </div>
            <div className="card-glass rounded-xl p-4">
              <div className="text-xs text-white/40 mb-1">Deadline</div>
              <div className="text-base font-bold text-white">{project.deadline}</div>
            </div>
            <div className="card-glass rounded-xl p-4">
              <div className="text-xs text-white/40 mb-1">Workers</div>
              <div className="text-base font-bold text-white">{project.workers}</div>
            </div>
            <div className="card-glass rounded-xl p-4">
              <div className="text-xs text-white/40 mb-1">Safety Rating</div>
              <div className="text-base font-bold" style={{ color: project.color }}>{project.safetyRating}</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Project Description</h4>
            <p className="text-sm text-white/60 leading-relaxed">{project.description}</p>
          </div>

          <div className="card-glass rounded-xl p-4">
            <div className="text-xs text-white/40 mb-2">Public Impact</div>
            <div className="text-sm text-white/70">{project.impact}</div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Milestones</h4>
            <div className="space-y-2">
              {project.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      m.done ? 'bg-emerald-500/20 border-emerald-500' : 'bg-white/5 border-white/20'
                    } border`}
                  >
                    {m.done && <span className="w-2 h-2 bg-emerald-400 rounded-full" />}
                  </div>
                  <span className={`text-sm ${m.done ? 'text-white/70' : 'text-white/40'}`}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Recent Updates</h4>
            <div className="space-y-3">
              {project.updates.map((u, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-px bg-white/10 relative">
                    <div className="absolute -left-1 w-2 h-2 rounded-full" style={{ background: project.color, top: '6px' }} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-1">{u.date}</div>
                    <div className="text-sm text-white/60">{u.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-glass rounded-xl p-4 space-y-2">
            <h4 className="text-sm font-semibold text-white mb-2">Contractor Details</h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-white/40">Company</span>
                <span className="text-white/70">{project.contractor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Contact</span>
                <span className="text-white/70">{project.contractorContact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Email</span>
                <span className="text-white/70">{project.contractorEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Tender No.</span>
                <span className="text-white/70">{project.tenderNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Sanctioned By</span>
                <span className="text-white/70">{project.sanctionedBy}</span>
              </div>
            </div>
          </div>

          {project.complaints > 0 && (
            <div className="card-glass rounded-xl p-4 border-orange-500/20">
              <div className="text-xs text-orange-400 mb-1">⚠ Active Complaints: {project.complaints}</div>
              <div className="text-xs text-white/50">Under review by monitoring authority</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  const [userLocation, setUserLocation] = useState(null)
  const [locationName, setLocationName] = useState('Fetching location...')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [nearbyProjects, setNearbyProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [locationError, setLocationError] = useState(false)
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090])
  const [mapZoom, setMapZoom] = useState(12)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setMapCenter([latitude, longitude])
          setMapZoom(13)
          setLocationError(false)

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const address = data.address
              const name = address.neighbourhood || address.suburb || address.city || address.state || 'Your Location'
              setLocationName(name + `, ${address.city || address.state || ''}`)
            })
            .catch(() => setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`))
        },
        (error) => {
          console.error('Location error:', error)
          setLocationError(true)
          setLocationName('Location access denied')
          setUserLocation({ lat: 28.6139, lng: 77.2090 })
        }
      )
    } else {
      setLocationError(true)
      setLocationName('Geolocation not supported')
      setUserLocation({ lat: 28.6139, lng: 77.2090 })
    }
  }, [])

  useEffect(() => {
    if (userLocation) {
      const nearby = allProjects
        .map(p => {
          const distance = Math.sqrt(
            Math.pow((p.lat - userLocation.lat) * 111, 2) +
            Math.pow((p.lng - userLocation.lng) * 111 * Math.cos(userLocation.lat * Math.PI / 180), 2)
          )
          return { ...p, distance }
        })
        .filter(p => p.distance < 15)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 15)

      setNearbyProjects(nearby)
    }
  }, [userLocation])

  const filteredProjects = allProjects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const displayedProjects = searchQuery ? filteredProjects.slice(0, 50) : nearbyProjects

  return (
    <section id="demo" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] to-[#0d1630]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-5">
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ongoing Constructions{' '}
            <span className="text-gradient">Near You</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Interactive map showing {allProjects.length.toLocaleString()}+ civic projects across India.
          </p>
        </div>

        <div className="mb-6 reveal">
          <div className="card-glass rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-white/40">Current Location</div>
                <div className="text-sm font-semibold text-white">{locationName}</div>
              </div>
            </div>
            {locationError && (
              <button
                onClick={() => window.location.reload()}
                className="text-xs px-3 py-1.5 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-colors"
              >
                Enable Location
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 grid md:grid-cols-2 gap-4 reveal">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search Sites"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-white/5 text-white/50 hover:text-white/70'
                }`}
              >
                <cat.icon className="w-4 h-4" style={{ color: selectedCategory === cat.id ? cat.color : 'currentColor' }} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 reveal">
          <div className="card-glass rounded-2xl overflow-hidden h-[600px]">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <MapUpdater center={mapCenter} zoom={mapZoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {userLocation && (
                <Circle
                  center={[userLocation.lat, userLocation.lng]}
                  radius={100}
                  pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.3 }}
                />
              )}

              {displayedProjects.map(project => (
                <Circle
                  key={project.id}
                  center={[project.lat, project.lng]}
                  radius={project.radius}
                  pathOptions={{
                    color: project.color,
                    fillColor: project.color,
                    fillOpacity: 0.15,
                    weight: 2,
                  }}
                  eventHandlers={{
                    click: () => setSelectedProject(project)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="font-bold text-sm mb-1">{project.popupLabel}</div>
                      <div className="text-xs text-gray-600 mb-2">{project.type}</div>
                      <div className="text-xs">
                        <div>Progress: <strong>{project.progress}%</strong></div>
                        <div>Budget: <strong>{project.budget}</strong></div>
                        <div>Deadline: <strong>{project.deadline}</strong></div>
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="mt-2 text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        View Dashboard
                      </button>
                    </div>
                  </Popup>
                </Circle>
              ))}
            </MapContainer>
          </div>

          <div className="card-glass rounded-2xl p-6 h-[600px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">
                {searchQuery ? `${displayedProjects.length} Results` : 'Nearby Sites (15)'}
              </h3>
              <span className="text-xs text-white/40">{displayedProjects.length} projects</span>
            </div>

            <div className="space-y-3">
              {displayedProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project)
                    setMapCenter([project.lat, project.lng])
                    setMapZoom(15)
                  }}
                  className="bg-white/5 hover:bg-white/8 rounded-xl p-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: project.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1 truncate">{project.popupLabel}</h4>
                      <div className="text-xs text-white/40 mb-2">{project.type}</div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-white/50">
                          <strong style={{ color: project.color }}>{project.progress}%</strong> complete
                        </span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/50">{project.budget}</span>
                      </div>
                      {project.distance !== undefined && (
                        <div className="text-xs text-white/30 mt-1">
                          📍 {project.distance.toFixed(1)}km away
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${project.progress}%`, background: project.color }}
                    />
                  </div>
                </div>
              ))}

              {displayedProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-white/20" />
                  </div>
                  <div className="text-sm text-white/40">No projects found</div>
                  <div className="text-xs text-white/30 mt-1">Try adjusting your search or category filter</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
