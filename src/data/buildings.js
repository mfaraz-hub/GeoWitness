// 1200+ Government Buildings, offices, and infrastructure projects across India
const buildingContractors = [
  'NBCC India Ltd.','CPWD','Tata Projects','L&T Construction','Shapoorji Pallonji',
  'NCC Ltd.','Delhi Development Authority','State PWD','Municipal Corp. Works Dept.',
  'RITES Ltd.','HCC Ltd.','Simplex Infrastructures','PWD UP','PWD Maharashtra',
  'Karnataka PWD','Tamil Nadu PWD','Gujarat Infrastructure','Rajasthan PWD',
]

function rnd(min, max) { return +(min + Math.random() * (max - min)).toFixed(4) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function progress() { return Math.floor(Math.random() * 85) + 10 }
function budget() {
  const v = +(Math.random() * 150 + 10).toFixed(1)
  return { total: `₹${v} Cr`, spent: `₹${+(v * (0.3 + Math.random() * 0.6)).toFixed(1)} Cr` }
}
function year(offset = 0) {
  const y = 2026 + offset
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${pick(m)} ${y}`
}

const citySeeds = [
  { city: 'New Delhi', lat: 28.6139, lng: 77.2090, count: 200 },
  { city: 'Mumbai', lat: 19.0760, lng: 72.8777, count: 120 },
  { city: 'Bengaluru', lat: 12.9716, lng: 77.5946, count: 100 },
  { city: 'Chennai', lat: 13.0827, lng: 80.2707, count: 80 },
  { city: 'Hyderabad', lat: 17.3850, lng: 78.4867, count: 80 },
  { city: 'Kolkata', lat: 22.5726, lng: 88.3639, count: 80 },
  { city: 'Pune', lat: 18.5204, lng: 73.8567, count: 60 },
  { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, count: 60 },
  { city: 'Jaipur', lat: 26.9124, lng: 75.7873, count: 50 },
  { city: 'Lucknow', lat: 26.8467, lng: 80.9462, count: 50 },
  { city: 'Surat', lat: 21.1702, lng: 72.8311, count: 40 },
  { city: 'Chandigarh', lat: 30.7333, lng: 76.7794, count: 40 },
  { city: 'Bhopal', lat: 23.2599, lng: 77.4126, count: 40 },
  { city: 'Nagpur', lat: 21.1458, lng: 79.0882, count: 35 },
  { city: 'Patna', lat: 25.5941, lng: 85.1376, count: 35 },
  { city: 'Coimbatore', lat: 11.0168, lng: 76.9558, count: 30 },
  { city: 'Vadodara', lat: 22.3072, lng: 73.1812, count: 25 },
  { city: 'Indore', lat: 22.7196, lng: 75.8577, count: 25 },
  { city: 'Kochi', lat: 9.9312, lng: 76.2673, count: 25 },
  { city: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, count: 25 },
]

const buildingTypes = [
  'District Collectorate Office','Police Station','Fire Station','Municipal Office',
  'Government Office Complex','Post Office','Sub-Registrar Office','Tehsil Office',
  'Block Development Office','Panchayat Bhawan','Community Centre','Public Library',
  'Ration Distribution Centre','Passport Office','Transport Office','District Court Complex',
  'Revenue Office','Social Welfare Office','Employment Exchange Office','Electric Sub-Station',
]

const descriptions = [
  'New government office building with modern facilities, digital services counter, and citizen waiting lounge.',
  'Multi-storey administrative complex with parking, conference hall, and e-governance centre.',
  'Renovation and expansion of existing building with barrier-free access and energy-efficient systems.',
  'Green building with solar panels, rainwater harvesting, and smart building management system.',
]

let buildings = []
let idCounter = 7000

citySeeds.forEach(seed => {
  for (let i = 0; i < seed.count; i++) {
    const b = budget()
    const prog = progress()
    const workerCount = Math.floor(40 + Math.random() * 200)
    const buildingType = buildingTypes[i % buildingTypes.length]

    buildings.push({
      id: idCounter++,
      name: `${buildingType} — ${seed.city} (${i + 1})`,
      popupLabel: `${buildingType} — ${seed.city}`,
      type: 'Government Building',
      category: 'buildings',
      lat: +(seed.lat + rnd(-0.1, 0.1)),
      lng: +(seed.lng + rnd(-0.1, 0.1)),
      radius: 200 + Math.floor(Math.random() * 150),
      budget: b.total,
      spent: b.spent,
      progress: prog,
      deadline: year(i % 2),
      color: '#ec4899',
      contractor: pick(buildingContractors),
      contractorContact: `+91-${Math.floor(1100000000 + Math.random() * 8899999999)}`.slice(0,15),
      contractorEmail: `building${idCounter}@gov.in`,
      sanctionedBy: pick(['CPWD','State PWD','Municipal Corporation','District Administration']),
      tenderNo: `BLDG/${seed.city.slice(0,3).toUpperCase()}/202${3 + (i % 2)}/${idCounter}`,
      startDate: year(-1),
      workers: workerCount,
      safetyRating: pick(['A+','A','A','B+','B+']),
      lastInspection: `${Math.floor(1 + Math.random() * 28)} Mar 2026`,
      nextInspection: `${Math.floor(1 + Math.random() * 28)} Apr 2026`,
      description: descriptions[i % descriptions.length],
      impact: `${Math.floor(50 + Math.random() * 300)} staff capacity, serves ${Math.floor(500 + Math.random() * 5000)} citizens/day`,
      complaints: Math.floor(Math.random() * 4),
      updates: [
        { date: 'Mar 2026', text: `Construction ${prog - 8}% complete. Interior work in progress.` },
        { date: 'Dec 2025', text: 'Structural work completed. MEP installation ongoing.' },
        { date: 'Aug 2025', text: 'Foundation and ground floor completed.' },
      ],
      milestones: [
        { label: 'Foundation', done: prog > 20 },
        { label: 'Structural Frame', done: prog > 45 },
        { label: 'MEP & Services', done: prog > 65 },
        { label: 'Interior Finishing', done: prog > 80 },
        { label: 'Handover', done: false },
      ],
    })
  }
})

export { buildings }
