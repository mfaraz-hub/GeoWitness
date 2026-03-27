// 75 Government Hospital construction / upgrade projects across India
const hospitalContractors = [
  'Delhi Infrastructure Ltd.','L&T Construction','Tata Projects Ltd.','Shapoorji Pallonji & Co.',
  'NCC Ltd.','NBCC India Ltd.','RITES Ltd.','HCC Ltd.','Simplex Infrastructures','Larsen & Toubro',
  'GMR Infrastructure','Gammon India','IRB Infrastructure','Afcons Infrastructure','PWD Rajasthan',
  'KRIDL Karnataka','CPWD — Special Projects','Punjab PWD','Tamil Nadu PWD','Andhra Pradesh PWD',
  'Maharashtra PWD','Gujarat Infrastructure','Odisha Construction Corp.','BSPHCL','UPEIDA',
]
const sanctionBodies = [
  'MoHFW — National Health Mission','State Health & Family Welfare Dept.','AIIMS Expansion Cell',
  'ESIC — Capital Works Wing','Railway Hospital Board','CGHS Construction Division',
  'District Health Authority','Municipal Corporation Health Dept.','Smart City SPV',
  'State Medical Education & Research Dept.','Central Public Works Department',
]
const safetyRatings = ['A+','A','A','B+','B+','A','A+','B']
const colors = { hospitals: '#3b82f6' }

function rnd(min, max) { return +(min + Math.random() * (max - min)).toFixed(4) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function progress() { return Math.floor(Math.random() * 85) + 10 }
function budget() {
  const v = +(Math.random() * 200 + 15).toFixed(1)
  return { total: `₹${v} Cr`, spent: `₹${+(v * (0.3 + Math.random() * 0.6)).toFixed(1)} Cr` }
}
function year(offset = 0) {
  const y = 2026 + offset
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${pick(m)} ${y}`
}

const citySeeds = [
  { city: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { city: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { city: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { city: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { city: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { city: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { city: 'Pune', lat: 18.5204, lng: 73.8567 },
  { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { city: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { city: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { city: 'Surat', lat: 21.1702, lng: 72.8311 },
  { city: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { city: 'Bhopal', lat: 23.2599, lng: 77.4126 },
  { city: 'Nagpur', lat: 21.1458, lng: 79.0882 },
  { city: 'Patna', lat: 25.5941, lng: 85.1376 },
  { city: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  { city: 'Vadodara', lat: 22.3072, lng: 73.1812 },
  { city: 'Indore', lat: 22.7196, lng: 75.8577 },
  { city: 'Kochi', lat: 9.9312, lng: 76.2673 },
  { city: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
  { city: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
  { city: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
  { city: 'Ranchi', lat: 23.3441, lng: 85.3096 },
  { city: 'Raipur', lat: 21.2514, lng: 81.6296 },
  { city: 'Amritsar', lat: 31.6340, lng: 74.8723 },
]

const hospitalNames = [
  'Government District Hospital','ESIC Super Speciality Hospital','Railway Hospital Expansion',
  'Govt. Medical College Hospital Upgrade','AIIMS Satellite Centre','Government Maternity Hospital',
  'Government Cancer Institute','Govt. Trauma & Emergency Centre','District Civil Hospital',
  'Government Eye Hospital','Government Chest Hospital','Government TB Sanatorium Upgrade',
  'Govt. Orthopaedic Hospital','Government Rehabilitation Centre','Taluk General Hospital',
  'Govt. Paediatric Hospital','Sub-District Hospital Upgrade','Government Ayurveda Hospital',
  'Govt. Psychiatric Hospital','Primary Health Centre Cluster Upgrade',
]

const descriptions = [
  'Complete reconstruction and upgrade of existing facility to a 500-bed tertiary care hospital with modern diagnostic labs, OT complex, and ICU wing.',
  'New super-speciality block with cardiac care unit, neurosciences centre, and renal transplant facility to serve the district and surrounding region.',
  'Greenfield trauma centre with helipad, 24×7 emergency services, and a modern blood bank integrated with the district health network.',
  'Upgrade of legacy colonial-era hospital to a modern 300-bed facility with digital health records, telemedicine kiosks, and renewable energy systems.',
  'Expansion of existing hospital adding two new operation theatres, a 50-bed ICU, neonatal intensive care unit, and a pharmacy store.',
  'Construction of new maternal and child health wing with 120 labour rooms, SNCU, NICU, and a dedicated adolescent health clinic.',
]

export const hospitals = Array.from({ length: 75 }, (_, i) => {
  const seed = citySeeds[i % citySeeds.length]
  const b = budget()
  const prog = progress()
  const workerCount = Math.floor(80 + Math.random() * 400)
  const tenderNum = `NHM/${seed.city.slice(0,3).toUpperCase()}/202${3 + (i % 2)}/${1000 + i}`
  const dl = year(i % 3)
  return {
    id: 1000 + i,
    name: `${hospitalNames[i % hospitalNames.length]} — ${seed.city} (${i + 1})`,
    popupLabel: `${hospitalNames[i % hospitalNames.length]} — ${seed.city}`,
    type: 'Government Hospital',
    category: 'hospitals',
    lat: +(seed.lat + rnd(-0.05, 0.05)),
    lng: +(seed.lng + rnd(-0.05, 0.05)),
    radius: 400 + Math.floor(Math.random() * 200),
    budget: b.total,
    spent: b.spent,
    progress: prog,
    deadline: dl,
    color: '#3b82f6',
    contractor: pick(hospitalContractors),
    contractorContact: `+91-${Math.floor(1100000000 + Math.random() * 8899999999)}`.slice(0,15),
    contractorEmail: `projects${i}@infra.gov.in`,
    sanctionedBy: pick(sanctionBodies),
    tenderNo: tenderNum,
    startDate: year(-1),
    workers: workerCount,
    safetyRating: pick(safetyRatings),
    lastInspection: `${Math.floor(1 + Math.random() * 28)} Mar 2026`,
    nextInspection: `${Math.floor(1 + Math.random() * 28)} Apr 2026`,
    description: descriptions[i % descriptions.length],
    impact: `${Math.floor(200 + Math.random() * 800)} beds, ${Math.floor(500 + Math.random() * 3000)} daily patients`,
    complaints: Math.floor(Math.random() * 8),
    updates: [
      { date: 'Mar 2026', text: `Structural work ${prog - 10}% complete. MEP drawings approved.` },
      { date: 'Dec 2025', text: 'Foundation & plinth completed. RCC column casting underway.' },
      { date: 'Aug 2025', text: 'Site handed over. Soil testing and piling commenced.' },
    ],
    milestones: [
      { label: 'Foundation & Piling', done: prog > 20 },
      { label: 'Structural Frame', done: prog > 45 },
      { label: 'MEP & Services', done: prog > 65 },
      { label: 'Interior Fit-out', done: prog > 80 },
      { label: 'Equipment & Commissioning', done: false },
    ],
  }
})
