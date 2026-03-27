// 100 Mall / Commercial Complex construction projects across India
const mallDevelopers = [
  'DLF Ltd.','Phoenix Mills','Prestige Group','Brigade Group','K Raheja Corp',
  'Inorbit Malls','Nexus Malls','Lulu Group','Blackstone India','Brookfield Properties',
  'Embassy Group','Mantri Developers','Godrej Properties','Oberoi Realty','Piramal Realty',
]

function rnd(min, max) { return +(min + Math.random() * (max - min)).toFixed(4) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function progress() { return Math.floor(Math.random() * 85) + 15 }
function budget() {
  const v = +(Math.random() * 800 + 200).toFixed(1)
  return { total: `₹${v} Cr`, spent: `₹${+(v * (0.3 + Math.random() * 0.6)).toFixed(1)} Cr` }
}
function year(offset = 0) {
  const y = 2026 + offset
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${pick(m)} ${y}`
}

const citySeeds = [
  { city: 'New Delhi', lat: 28.6139, lng: 77.2090, count: 15 },
  { city: 'Mumbai', lat: 19.0760, lng: 72.8777, count: 12 },
  { city: 'Bengaluru', lat: 12.9716, lng: 77.5946, count: 10 },
  { city: 'Chennai', lat: 13.0827, lng: 80.2707, count: 8 },
  { city: 'Hyderabad', lat: 17.3850, lng: 78.4867, count: 8 },
  { city: 'Kolkata', lat: 22.5726, lng: 88.3639, count: 8 },
  { city: 'Pune', lat: 18.5204, lng: 73.8567, count: 7 },
  { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, count: 7 },
  { city: 'Jaipur', lat: 26.9124, lng: 75.7873, count: 5 },
  { city: 'Lucknow', lat: 26.8467, lng: 80.9462, count: 5 },
  { city: 'Chandigarh', lat: 30.7333, lng: 76.7794, count: 4 },
  { city: 'Kochi', lat: 9.9312, lng: 76.2673, count: 4 },
  { city: 'Indore', lat: 22.7196, lng: 75.8577, count: 3 },
  { city: 'Surat', lat: 21.1702, lng: 72.8311, count: 2 },
  { city: 'Coimbatore', lat: 11.0168, lng: 76.9558, count: 2 },
]

const mallNames = [
  'City Centre Mall','Metropolitan Plaza','Downtown Galleria','Urban Square Mall',
  'Grand Arcade','Central Plaza','Premium Shopping Complex','Elite Mall',
  'The Boulevard','Skyline Mall','Citywalk Complex','Heritage Plaza',
]

const descriptions = [
  'Luxury mall with 5 floors, 200+ retail outlets, multiplex cinema, food court, gaming zone, and 2000+ parking spaces.',
  'Mixed-use development with retail, F&B, entertainment zones, office spaces, and integrated metro connectivity.',
  'Premium shopping destination featuring international brands, lifestyle stores, hypermarket, and rooftop restaurants.',
  'Modern commercial complex with retail spaces, corporate offices, luxury hotel, and convention centre.',
]

let malls = []
let idCounter = 5000

citySeeds.forEach(seed => {
  for (let i = 0; i < seed.count; i++) {
    const b = budget()
    const prog = progress()
    const workerCount = Math.floor(200 + Math.random() * 800)

    malls.push({
      id: idCounter++,
      name: `${mallNames[i % mallNames.length]} — ${seed.city}`,
      popupLabel: `${mallNames[i % mallNames.length]} — ${seed.city}`,
      type: 'Shopping Mall',
      category: 'malls',
      lat: +(seed.lat + rnd(-0.06, 0.06)),
      lng: +(seed.lng + rnd(-0.06, 0.06)),
      radius: 500 + Math.floor(Math.random() * 300),
      budget: b.total,
      spent: b.spent,
      progress: prog,
      deadline: year(i % 2),
      color: '#f59e0b',
      contractor: pick(mallDevelopers),
      contractorContact: `+91-${Math.floor(1100000000 + Math.random() * 8899999999)}`.slice(0,15),
      contractorEmail: `projects${idCounter}@realty.com`,
      sanctionedBy: 'Municipal Development Authority',
      tenderNo: `MALL/${seed.city.slice(0,3).toUpperCase()}/202${4 + (i % 2)}/${idCounter}`,
      startDate: year(-2),
      workers: workerCount,
      safetyRating: pick(['A+','A','B+']),
      lastInspection: `${Math.floor(1 + Math.random() * 28)} Mar 2026`,
      nextInspection: `${Math.floor(1 + Math.random() * 28)} Apr 2026`,
      description: descriptions[i % descriptions.length],
      impact: `${Math.floor(150 + Math.random() * 250)} retail units, ${Math.floor(50000 + Math.random() * 150000)} sqft`,
      complaints: Math.floor(Math.random() * 6),
      updates: [
        { date: 'Mar 2026', text: `Structural work ${prog - 8}% complete. Facade work in progress.` },
        { date: 'Jan 2026', text: 'Mall interior fit-out commenced. Anchor stores finalized.' },
        { date: 'Oct 2025', text: 'RCC structure completed. MEP work underway.' },
      ],
      milestones: [
        { label: 'Foundation & Basement', done: prog > 25 },
        { label: 'Structural Frame', done: prog > 50 },
        { label: 'MEP & Facade', done: prog > 70 },
        { label: 'Interior Fit-out', done: prog > 85 },
        { label: 'Retail Handover', done: false },
      ],
    })
  }
})

export { malls }
