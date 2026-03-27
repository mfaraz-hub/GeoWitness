import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, WMSTileLayer, Circle, CircleMarker, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Bell, X, ChevronRight, IndianRupee, Calendar, CheckCircle2, Users, FileText, AlertTriangle, TrendingUp, Building2, Phone, Mail, ExternalLink, Clock, Shield, Wrench, Layers, Heart, GraduationCap, Truck, ShoppingBag } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ─── DATASET DEFINITIONS ──────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    name: 'Government Hospital Upgrade',
    popupLabel: 'Government Hospital Upgrade — In Progress',
    type: 'Government Hospital',
    category: 'hospitals',
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
    category: 'bridges',
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
    category: 'bridges',
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
  // ── SCHOOLS ──────────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'Govt. Model School — Bengaluru North',
    popupLabel: 'New Government Model School — Under Construction',
    type: 'Education',
    category: 'schools',
    lat: 13.0827,
    lng: 77.5877,
    radius: 400,
    budget: '₹14.8 Cr',
    spent: '₹8.9 Cr',
    progress: 60,
    deadline: 'Aug 2026',
    color: '#22d3ee',
    contractor: 'Karnataka Building Construction Corp.',
    contractorContact: '+91-80-2220-1001',
    contractorEmail: 'projects@kbcc.karnataka.gov.in',
    sanctionedBy: 'Dept. of Public Instruction, Karnataka',
    tenderNo: 'DPI/KA/2023/SCH-114',
    startDate: 'Mar 2024',
    workers: 88,
    safetyRating: 'A',
    lastInspection: '10 Mar 2026',
    nextInspection: '10 Apr 2026',
    description: 'Construction of a new 3-storey model school with 36 classrooms, science labs, a computer centre, and a 500-seat auditorium for students in the North Bengaluru municipal zone.',
    impact: '1,800 students to benefit, 36 new classrooms, 4 science labs',
    complaints: 1,
    updates: [
      { date: 'Mar 2026', text: 'Second floor slab poured. Staircase and elevator shaft ongoing.' },
      { date: 'Dec 2025', text: 'Ground floor structure complete. Electrical conduit laying started.' },
      { date: 'Aug 2025', text: 'Foundation and plinth completed. RCC columns rising.' },
    ],
    milestones: [
      { label: 'Foundation & Plinth', done: true },
      { label: 'Ground Floor Structure', done: true },
      { label: 'Upper Floors', done: false },
      { label: 'Interior & Fit-out', done: false },
      { label: 'Playground & Landscaping', done: false },
    ],
  },
  {
    id: 5,
    name: 'Navodaya Vidyalaya Expansion — Mysuru',
    popupLabel: 'Navodaya Vidyalaya New Block — Active Site',
    type: 'Education',
    category: 'schools',
    lat: 12.2958,
    lng: 76.6394,
    radius: 350,
    budget: '₹9.2 Cr',
    spent: '₹3.1 Cr',
    progress: 34,
    deadline: 'Jan 2027',
    color: '#22d3ee',
    contractor: 'Prakruthi Constructions Pvt. Ltd.',
    contractorContact: '+91-821-244-0099',
    contractorEmail: 'mys@prakruthi.in',
    sanctionedBy: 'Navodaya Vidyalaya Samiti — Southern Region',
    tenderNo: 'NVS/SR/2023/MYS-07',
    startDate: 'Oct 2024',
    workers: 54,
    safetyRating: 'B+',
    lastInspection: '5 Mar 2026',
    nextInspection: '5 Apr 2026',
    description: 'Addition of a residential hostel block (120 rooms), new dining hall, and a multi-purpose sports complex for the Navodaya Vidyalaya campus in Mysuru district.',
    impact: '120 hostel rooms, dining hall for 600 students, full sports complex',
    complaints: 0,
    updates: [
      { date: 'Feb 2026', text: 'Column casting of hostel block reaching first floor level.' },
      { date: 'Nov 2025', text: 'Foundation work completed for all three blocks.' },
      { date: 'Oct 2025', text: 'Site clearance and soil testing completed.' },
    ],
    milestones: [
      { label: 'Site Preparation', done: true },
      { label: 'Foundation Work', done: true },
      { label: 'Superstructure', done: false },
      { label: 'Roofing & Finishing', done: false },
    ],
  },
  // ── BRIDGES ───────────────────────────────────────────────────────────────
  {
    id: 6,
    name: 'Cauvery ROB — Mandya Bypass',
    popupLabel: 'Cauvery Rail Over-Bridge — Construction Active',
    type: 'Bridge',
    category: 'bridges',
    lat: 12.5244,
    lng: 76.8974,
    radius: 600,
    budget: '₹67 Cr',
    spent: '₹28.4 Cr',
    progress: 42,
    deadline: 'Sep 2026',
    color: '#fb923c',
    contractor: 'L&T Construction — Transport Infrastructure',
    contractorContact: '+91-22-6705-0505',
    contractorEmail: 'rob@larsentoubro.com',
    sanctionedBy: 'NHAI — Karnataka Circle',
    tenderNo: 'NHAI/KA/2022/ROB-55',
    startDate: 'Jun 2023',
    workers: 210,
    safetyRating: 'A',
    lastInspection: '18 Mar 2026',
    nextInspection: '18 Apr 2026',
    description: 'Construction of a 4-lane Rail Over-Bridge across the Cauvery river and Southern Railways line near Mandya, eliminating a dangerous level crossing and easing traffic on NH-275.',
    impact: 'Eliminates dangerous level crossing, 4-lane road, 40,000 vehicles/day',
    complaints: 3,
    updates: [
      { date: 'Mar 2026', text: 'Pier caps cast on 6 of 9 piers. PSC girder launching underway.' },
      { date: 'Dec 2025', text: 'Railway NOC obtained. Pier construction proceeding.' },
      { date: 'Sep 2025', text: 'Bore piling completed on both abutments.' },
    ],
    milestones: [
      { label: 'Piling & Abutments', done: true },
      { label: 'Pier Construction', done: false },
      { label: 'Girder Launching', done: false },
      { label: 'Deck & Railing', done: false },
    ],
  },
  {
    id: 7,
    name: 'Netravathi Flyover — Mangaluru Port Road',
    popupLabel: 'Netravathi Flyover — Piling Works Active',
    type: 'Bridge',
    category: 'bridges',
    lat: 12.8698,
    lng: 74.8428,
    radius: 550,
    budget: '₹84 Cr',
    spent: '₹12.6 Cr',
    progress: 15,
    deadline: 'Dec 2027',
    color: '#fb923c',
    contractor: 'HOWE India Pvt. Ltd.',
    contractorContact: '+91-44-2815-1500',
    contractorEmail: 'mgr@howeindia.com',
    sanctionedBy: 'KRIDL — Karnataka Roads Infrastructure',
    tenderNo: 'KRIDL/MNG/2024/FLY-09',
    startDate: 'Jan 2025',
    workers: 130,
    safetyRating: 'B',
    lastInspection: '1 Mar 2026',
    nextInspection: '1 Apr 2026',
    description: 'Six-lane flyover spanning the Netravathi river approach road, connecting Mangaluru New Port with NH-75. Includes pedestrian footpaths and a scenic river viewing gallery.',
    impact: '6-lane flyover, port traffic relief, 60,000 vehicles/day projected',
    complaints: 2,
    updates: [
      { date: 'Mar 2026', text: 'Bore piling 40% complete. Mobilisation of batching plant done.' },
      { date: 'Jan 2026', text: 'Contractor mobilisation and site office setup completed.' },
      { date: 'Jan 2025', text: 'Work order issued. Survey and utility shifting underway.' },
    ],
    milestones: [
      { label: 'Survey & Utility Shifting', done: true },
      { label: 'Piling Works', done: false },
      { label: 'Pier & Abutment', done: false },
      { label: 'Superstructure', done: false },
    ],
  },
  // ── MALLS ─────────────────────────────────────────────────────────────────
  {
    id: 8,
    name: 'Prestige Kochi Mall — Phase 3',
    popupLabel: 'Prestige Kochi Mall Phase 3 — Superstructure Rising',
    type: 'Commercial',
    category: 'malls',
    lat: 9.9312,
    lng: 76.2673,
    radius: 450,
    budget: '₹310 Cr',
    spent: '₹201.5 Cr',
    progress: 65,
    deadline: 'Nov 2026',
    color: '#f472b6',
    contractor: 'Prestige Construction Ltd.',
    contractorContact: '+91-80-2211-5353',
    contractorEmail: 'commercial@prestigegroup.in',
    sanctionedBy: 'Kochi Municipal Corp. — Commercial Division',
    tenderNo: 'KMC/COM/2022/MALL-03',
    startDate: 'Jul 2022',
    workers: 560,
    safetyRating: 'A+',
    lastInspection: '22 Mar 2026',
    nextInspection: '22 Apr 2026',
    description: 'Phase 3 expansion of Prestige Kochi Mall adding a 4-floor retail podium, 12-screen multiplex, food court with 50 outlets, and rooftop sky-garden. Total leasable area: 4.2 lakh sq.ft.',
    impact: '4.2 lakh sq.ft new retail, 3,000+ jobs, 12-screen multiplex',
    complaints: 4,
    updates: [
      { date: 'Mar 2026', text: 'Multiplex floors 3–4 slab poured. HVAC ductwork installation ongoing.' },
      { date: 'Dec 2025', text: 'Façade glazing 70% complete on retail podium.' },
      { date: 'Aug 2025', text: 'Structural steel for multiplex wing fully erected.' },
    ],
    milestones: [
      { label: 'Foundation & Basement', done: true },
      { label: 'Structural Frame', done: true },
      { label: 'Façade & Glazing', done: false },
      { label: 'Interior Fit-out', done: false },
      { label: 'Multiplex & Food Court', done: false },
    ],
  },
  {
    id: 9,
    name: 'Nexus Whitefield Mall — New Wing',
    popupLabel: 'Nexus Whitefield Mall Expansion — Topping Out',
    type: 'Commercial',
    category: 'malls',
    lat: 12.9698,
    lng: 77.7500,
    radius: 400,
    budget: '₹195 Cr',
    spent: '₹156 Cr',
    progress: 80,
    deadline: 'Jun 2026',
    color: '#f472b6',
    contractor: 'Shapoorji Pallonji & Co.',
    contractorContact: '+91-22-6735-3535',
    contractorEmail: 'retail@shapoorji.com',
    sanctionedBy: 'BBMP — Commercial Building Division',
    tenderNo: 'BBMP/COM/2022/NXS-11',
    startDate: 'Apr 2022',
    workers: 420,
    safetyRating: 'A',
    lastInspection: '15 Mar 2026',
    nextInspection: '15 Apr 2026',
    description: 'New south wing of Nexus Whitefield Mall featuring a luxury retail zone, 6-screen IMAX theatre, adventure zone, and dedicated EV parking with 200 charging bays.',
    impact: '2.8 lakh sq.ft, IMAX theatre, 200 EV bays, 2,000+ jobs',
    complaints: 3,
    updates: [
      { date: 'Mar 2026', text: 'Interior cladding and waterproofing complete on all floors.' },
      { date: 'Jan 2026', text: 'Rooftop slab and IMAX theatre shell fully complete.' },
      { date: 'Sep 2025', text: 'Structural topping-out ceremony held.' },
    ],
    milestones: [
      { label: 'Foundation & Piling', done: true },
      { label: 'Structural Frame', done: true },
      { label: 'Roofing & Waterproofing', done: true },
      { label: 'Interior Fit-out', done: false },
      { label: 'EV Charging & MEP', done: false },
    ],
  },
  // ── OTHER BUILDINGS ───────────────────────────────────────────────────────
  {
    id: 10,
    name: 'BBMP Multi-Level Car Park — Shivajinagar',
    popupLabel: 'BBMP MLCP Shivajinagar — Steel Frame Rising',
    type: 'Civic Building',
    category: 'buildings',
    lat: 12.9794,
    lng: 77.5961,
    radius: 350,
    budget: '₹52 Cr',
    spent: '₹19.5 Cr',
    progress: 37,
    deadline: 'Mar 2027',
    color: '#34d399',
    contractor: 'Tata Projects Ltd.',
    contractorContact: '+91-40-6611-7000',
    contractorEmail: 'civic@tataprojects.com',
    sanctionedBy: 'BBMP — Town Planning Division',
    tenderNo: 'BBMP/TP/2023/MLCP-07',
    startDate: 'Aug 2024',
    workers: 98,
    safetyRating: 'A+',
    lastInspection: '12 Mar 2026',
    nextInspection: '12 Apr 2026',
    description: 'Eight-storey multi-level car park in Shivajinagar CBD with 1,200 mechanised parking bays, EV charging on every floor, and a dedicated bus bay for BMTC integration.',
    impact: '1,200 parking bays, reduces on-street parking by 80%, 200 EV points',
    complaints: 1,
    updates: [
      { date: 'Mar 2026', text: 'Steel frame up to 4th floor. Composite deck slab casting ongoing.' },
      { date: 'Dec 2025', text: 'Structural steel erection commenced after column base plates set.' },
      { date: 'Oct 2025', text: 'Pile caps and raft foundation poured. Ground floor plinth done.' },
    ],
    milestones: [
      { label: 'Foundation & Pile Cap', done: true },
      { label: 'Ground Floor Plinth', done: true },
      { label: 'Steel Frame (Floors 1–8)', done: false },
      { label: 'Façade & Cladding', done: false },
      { label: 'Mechanical Parking Systems', done: false },
    ],
  },
  {
    id: 11,
    name: 'Hubli Smart City Command Centre',
    popupLabel: 'Hubli Smart City Command Centre — Fit-out Stage',
    type: 'Civic Building',
    category: 'buildings',
    lat: 15.3647,
    lng: 75.1240,
    radius: 300,
    budget: '₹28 Cr',
    spent: '₹23.8 Cr',
    progress: 85,
    deadline: 'May 2026',
    color: '#34d399',
    contractor: 'NEC Corporation India Ltd.',
    contractorContact: '+91-80-4179-1100',
    contractorEmail: 'smartcity@nec.com',
    sanctionedBy: 'Hubli-Dharwad Smart City Ltd.',
    tenderNo: 'HDSCL/ICT/2022/CMD-01',
    startDate: 'Jan 2023',
    workers: 45,
    safetyRating: 'A+',
    lastInspection: '20 Mar 2026',
    nextInspection: '20 Apr 2026',
    description: 'State-of-the-art integrated command and control centre for Hubli-Dharwad Smart City — housing 24×7 surveillance analytics, traffic management, grievance redressal, and emergency response systems.',
    impact: 'Monitors 2,000+ CCTV cameras, real-time traffic AI, 50+ city services integrated',
    complaints: 0,
    updates: [
      { date: 'Mar 2026', text: 'Server room commissioning complete. Operator console install ongoing.' },
      { date: 'Jan 2026', text: 'Networking and CCTV integration 90% done. UAT in progress.' },
      { date: 'Oct 2025', text: 'Civil works complete. IT infrastructure installation commenced.' },
    ],
    milestones: [
      { label: 'Civil Construction', done: true },
      { label: 'Server Room Setup', done: true },
      { label: 'Network Integration', done: true },
      { label: 'Operator Consoles', done: false },
      { label: 'Live Operations Launch', done: false },
    ],
  },
  {
    id: 12,
    name: 'Kalaburagi District Court Complex',
    popupLabel: 'New District Court Complex — RCC Frame Complete',
    type: 'Civic Building',
    category: 'buildings',
    lat: 17.3297,
    lng: 76.8343,
    radius: 400,
    budget: '₹38 Cr',
    spent: '₹15.2 Cr',
    progress: 40,
    deadline: 'Oct 2027',
    color: '#34d399',
    contractor: 'PWD Karnataka — Special Projects',
    contractorContact: '+91-8472-225678',
    contractorEmail: 'kalaburagi@pwd.karnataka.gov.in',
    sanctionedBy: 'Karnataka PWD — High Court Building Cell',
    tenderNo: 'PWD/KA/2023/COURT-04',
    startDate: 'Nov 2023',
    workers: 76,
    safetyRating: 'B+',
    lastInspection: '8 Mar 2026',
    nextInspection: '8 Apr 2026',
    description: 'New integrated court complex for Kalaburagi district with 20 court halls, a public facilititation centre, legal aid clinic, e-court infrastructure, and a secure custody centre.',
    impact: '20 court halls, reduces case backlog, 500+ daily litigants served',
    complaints: 1,
    updates: [
      { date: 'Feb 2026', text: 'RCC frame for main building fully complete. Brick masonry ongoing.' },
      { date: 'Nov 2025', text: 'Foundation and columns for Block-B completed.' },
      { date: 'Jun 2025', text: 'Block-A RCC frame reached final level.' },
    ],
    milestones: [
      { label: 'Foundation', done: true },
      { label: 'RCC Frame', done: true },
      { label: 'Masonry & Plaster', done: false },
      { label: 'Flooring & Doors', done: false },
      { label: 'e-Court IT Setup', done: false },
    ],
  },
]

// ── LAYER CATEGORIES ──────────────────────────────────────────────────────────
const layerCategories = [
  { id: 'all', label: 'All', icon: Layers, color: '#ffffff' },
  { id: 'hospitals', label: 'Hospitals', icon: Heart, color: '#3b82f6' },
  { id: 'schools', label: 'Schools', icon: GraduationCap, color: '#22d3ee' },
  { id: 'bridges', label: 'Bridges', icon: Truck, color: '#fb923c' },
  { id: 'malls', label: 'Malls', icon: ShoppingBag, color: '#f472b6' },
  { id: 'buildings', label: 'Buildings', icon: Building2, color: '#34d399' },
]

// Route walks from ~800m outside the hospital zone into it
const userRoute = [
  [28.6210, 77.2180],
  [28.6190, 77.2160],
  [28.6170, 77.2140],
  [28.6155, 77.2115],
  [28.6139, 77.2090],
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
              <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>

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

              <div>
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Overall Completion</span>
                  <span className="font-semibold" style={{ color: '#34d399' }}>{project.progress}%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%`, background: `linear-gradient(90deg, ${project.color}, #34d399)` }} />
                </div>
              </div>

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
            <div className="text-[11px] text-white/40">Just now · Geo-Fenced Zone</div>
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
        {project.milestones.slice(0, 4).map((m) => (
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

// ── WMS Legend item ──────────────────────────────────────────────────────────
function WmsLegendItem({ layerName, layerId }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://kgis.ksrsac.in/kgismaps1/services/Health/Health/MapServer/WmsServer?request=GetLegendGraphic&version=1.3.0&format=image/png&layer=${layerId}`}
        alt={layerName}
        className="w-5 h-5 object-contain flex-shrink-0"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <span className="text-white/50 text-[10px] truncate">{layerName}</span>
    </div>
  )
}

// ── MAIN DEMO COMPONENT ───────────────────────────────────────────────────────
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
  const [activeLayer, setActiveLayer] = useState('all')
  const [showWmsHealth, setShowWmsHealth] = useState(false)
  const [showWmsLegend, setShowWmsLegend] = useState(false)
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

  const handleLayerChange = (layerId) => {
    setActiveLayer(layerId)
    // When switching to Karnataka layers, pan map there
    if (layerId === 'hospitals' && showWmsHealth) {
      setMapCenter([15.3173, 75.7139])
      setMapZoom(7)
    }
  }

  useEffect(() => {
    const t = setTimeout(runDemo, 800)
    return () => { clearTimeout(t); clearTimers() }
  }, [])

  const visibleProjects = activeLayer === 'all'
    ? projects
    : projects.filter((p) => p.category === activeLayer)

  // WMS sublayers to display in legend (sample from capabilities)
  const wmsLegendLayers = [
    { name: 'District Hospital', id: 91 },
    { name: 'Community Health Center', id: 89 },
    { name: 'Primary Health Center', id: 88 },
    { name: 'Taluk Hospital', id: 90 },
    { name: 'Sub Center', id: 87 },
    { name: 'Blood Bank', id: 55 },
    { name: 'Medical College', id: 5 },
    { name: 'Nursing College', id: 4 },
    { name: 'Ayurveda Hospital', id: 45 },
    { name: 'Homoeopathy Hospital', id: 43 },
  ]

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
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-5">
            Live Interactive Map
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ongoing{' '}
            <span className="text-gradient-saffron">Constructions</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A real map showing geo-fenced civic project zones across India. Click any pin or press Replay to simulate a user entering a zone.
          </p>
        </div>

        {/* Layer category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-5 reveal">
          {layerCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => handleLayerChange(cat.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: activeLayer === cat.id ? `${cat.color}18` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeLayer === cat.id ? cat.color : 'rgba(255,255,255,0.1)'}`,
                  color: activeLayer === cat.id ? cat.color : 'rgba(255,255,255,0.45)',
                }}
              >
                <Icon className="w-3 h-3" />
                {cat.label}
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                  style={{ background: activeLayer === cat.id ? `${cat.color}30` : 'rgba(255,255,255,0.08)' }}>
                  {cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length}
                </span>
              </button>
            )
          })}
        </div>

        {/* WMS toggle */}
        <div className="flex justify-center mb-6 reveal">
          <button
            onClick={() => {
              setShowWmsHealth(!showWmsHealth)
              if (!showWmsHealth) {
                setMapCenter([15.3173, 75.7139])
                setMapZoom(7)
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: showWmsHealth ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${showWmsHealth ? '#3b82f6' : 'rgba(255,255,255,0.12)'}`,
              color: showWmsHealth ? '#60a5fa' : 'rgba(255,255,255,0.4)',
            }}
          >
            <Heart className="w-3 h-3" />
            Karnataka Health Facilities (WMS — Live Dataset)
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: showWmsHealth ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.08)' }}>
              {showWmsHealth ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* WMS info banner */}
        {showWmsHealth && (
          <div className="mb-5 reveal">
            <div className="rounded-xl p-4 flex flex-wrap items-start gap-4" style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Live WMS Layer — KSRSAC Karnataka Health GIS</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Real health facility data served via WMS from <strong className="text-white/70">kgis.ksrsac.in</strong> — the Karnataka State Remote Sensing Application Centre.
                  Includes District Hospitals, CHCs, PHCs, Sub-Centres, Blood Banks, Medical Colleges, Ayush facilities, and more across all Karnataka districts.
                </p>
              </div>
              <button
                onClick={() => setShowWmsLegend(!showWmsLegend)}
                className="flex-shrink-0 text-blue-400/70 hover:text-blue-400 text-xs font-semibold transition-colors"
              >
                {showWmsLegend ? 'Hide Legend' : 'Show Legend'}
              </button>
            </div>

            {showWmsLegend && (
              <div className="mt-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-3">Layer Legend (Sample)</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {wmsLegendLayers.map((l) => (
                    <WmsLegendItem key={l.id} layerName={l.name} layerId={l.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project selector chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 reveal">
          {visibleProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProjectClick(p)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: activeProject?.id === p.id ? `${p.color}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeProject?.id === p.id ? p.color : 'rgba(255,255,255,0.1)'}`,
                color: activeProject?.id === p.id ? p.color : 'rgba(255,255,255,0.5)',
              }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
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
                height: '480px',
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

                {/* Karnataka WMS Health Facilities layer */}
                {showWmsHealth && (
                  <WMSTileLayer
                    url="https://kgis.ksrsac.in/kgismaps1/services/Health/Health/MapServer/WmsServer"
                    layers="87,88,89,90,91,55,5,4,45,43,38,46,71"
                    format="image/png"
                    transparent={true}
                    version="1.3.0"
                    opacity={0.85}
                    attribution='Health GIS &copy; KSRSAC Karnataka'
                  />
                )}

                {/* Geo-fence circles for visible projects */}
                {visibleProjects.map((p) => (
                  <Circle
                    key={p.id}
                    center={[p.lat, p.lng]}
                    radius={p.radius}
                    pathOptions={{
                      color: p.color,
                      fillColor: p.color,
                      fillOpacity: activeProject?.id === p.id ? 0.14 : 0.06,
                      weight: activeProject?.id === p.id ? 2.5 : 1.5,
                      dashArray: '8 6',
                    }}
                  />
                ))}

                {/* Project markers */}
                {visibleProjects.map((p) => (
                  <Marker
                    key={p.id}
                    position={[p.lat, p.lng]}
                    icon={L.divIcon({
                      className: '',
                      html: `<div style="
                        width:30px;height:30px;
                        background:linear-gradient(135deg,${p.color},${p.color}bb);
                        border-radius:50% 50% 50% 0;
                        transform:rotate(-45deg);
                        border:2.5px solid white;
                        box-shadow:0 4px 20px ${p.color}70;
                        cursor:pointer;
                      "></div>`,
                      iconSize: [30, 30],
                      iconAnchor: [15, 30],
                      popupAnchor: [0, -34],
                    })}
                    eventHandlers={{ click: () => handleProjectClick(p) }}
                  >
                    <Popup>
                      <div style={{ color: 'white', minWidth: '200px', padding: '4px 2px' }}>
                        <div style={{ fontSize: '11px', color: p.color, fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.type}</div>
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

                {/* Animated user marker (only shown in Delhi view during demo) */}
                {(activeLayer === 'all' || activeLayer === 'hospitals' || activeLayer === 'bridges') && (
                  <>
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
                  </>
                )}
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

            {/* Dataset summary */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {layerCategories.slice(1).map((cat) => {
                const Icon = cat.icon
                const count = projects.filter(p => p.category === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleLayerChange(cat.id)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl text-center transition-all hover:-translate-y-0.5"
                    style={{
                      background: activeLayer === cat.id ? `${cat.color}15` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${activeLayer === cat.id ? cat.color + '60' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                    <span className="text-white font-bold text-sm">{count}</span>
                    <span className="text-white/30 text-[9px]">{cat.label}</span>
                  </button>
                )
              })}
            </div>
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

            {/* Dataset legend */}
            <div className="mt-5 rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Map Datasets</div>

              {layerCategories.slice(1).map((cat) => {
                const Icon = cat.icon
                const catProjects = projects.filter(p => p.category === cat.id)
                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cat.color }} />
                      <span className="text-white/60 text-xs font-semibold">{cat.label}</span>
                      <span className="ml-auto text-white/30 text-[10px]">{catProjects.length} sites</span>
                    </div>
                    <div className="pl-5 space-y-1">
                      {catProjects.map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleProjectClick(p)}
                          className="w-full text-left flex items-center gap-2 py-1 text-[11px] text-white/40 hover:text-white/70 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}

              <div className="pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="text-white/60 text-xs font-semibold">Karnataka Health (WMS)</span>
                  <span className="ml-auto text-white/30 text-[10px]">Live</span>
                </div>
                <p className="pl-5 text-white/30 text-[10px] leading-relaxed">
                  Real-time health facility layer from KSRSAC — 90+ layer types including hospitals, dispensaries, blood banks, medical colleges & Ayush centres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
