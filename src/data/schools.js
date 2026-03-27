// 450 Government School construction / upgrade projects across India
const schoolContractors = [
  'Delhi Construction Corp.','Tata Projects Ltd.','L&T Construction','Shapoorji Pallonji',
  'NCC Ltd.','NBCC India','Simplex Infrastructures','HCC Ltd.','PWD Delhi','PWD Maharashtra',
  'Karnataka PWD','Tamil Nadu PWD','Gujarat Infrastructure','Rajasthan PWD','UP Construction',
  'Bihar Development Authority','Kerala PWD','Andhra Construction','Telangana PWD','MP PWD',
]
const sanctionBodies = [
  'Sarva Shiksha Abhiyan','State Education Dept.','District Education Authority',
  'Municipal Corporation — Education Wing','Kendriya Vidyalaya Sangathan',
  'Navodaya Vidyalaya Samiti','State School Construction Board','CPWD — Education Division',
]
const safetyRatings = ['A+','A','A','B+','B+','A','A+','B']

function rnd(min, max) { return +(min + Math.random() * (max - min)).toFixed(4) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function progress() { return Math.floor(Math.random() * 85) + 10 }
function budget() {
  const v = +(Math.random() * 50 + 5).toFixed(1)
  return { total: `₹${v} Cr`, spent: `₹${+(v * (0.3 + Math.random() * 0.6)).toFixed(1)} Cr` }
}
function year(offset = 0) {
  const y = 2026 + offset
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${pick(m)} ${y}`
}

const citySeeds = [
  { city: 'New Delhi', lat: 28.6139, lng: 77.2090, count: 60 },
  { city: 'Mumbai', lat: 19.0760, lng: 72.8777, count: 40 },
  { city: 'Bengaluru', lat: 12.9716, lng: 77.5946, count: 35 },
  { city: 'Chennai', lat: 13.0827, lng: 80.2707, count: 30 },
  { city: 'Hyderabad', lat: 17.3850, lng: 78.4867, count: 30 },
  { city: 'Kolkata', lat: 22.5726, lng: 88.3639, count: 30 },
  { city: 'Pune', lat: 18.5204, lng: 73.8567, count: 25 },
  { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, count: 25 },
  { city: 'Jaipur', lat: 26.9124, lng: 75.7873, count: 20 },
  { city: 'Lucknow', lat: 26.8467, lng: 80.9462, count: 20 },
  { city: 'Surat', lat: 21.1702, lng: 72.8311, count: 15 },
  { city: 'Chandigarh', lat: 30.7333, lng: 76.7794, count: 15 },
  { city: 'Bhopal', lat: 23.2599, lng: 77.4126, count: 15 },
  { city: 'Nagpur', lat: 21.1458, lng: 79.0882, count: 15 },
  { city: 'Patna', lat: 25.5941, lng: 85.1376, count: 15 },
  { city: 'Coimbatore', lat: 11.0168, lng: 76.9558, count: 10 },
  { city: 'Vadodara', lat: 22.3072, lng: 73.1812, count: 10 },
  { city: 'Indore', lat: 22.7196, lng: 75.8577, count: 10 },
  { city: 'Kochi', lat: 9.9312, lng: 76.2673, count: 10 },
  { city: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, count: 10 },
]

const schoolNames = [
  'Government Primary School','Government Senior Secondary School','Kendriya Vidyalaya',
  'Government Model School','Navodaya Vidyalaya','Government Girls School',
  'Government Boys School','Municipal Corporation School','Sarvodaya Vidyalaya',
  'Government High School','Rajkiya Prathmik Vidyalaya','District Education Centre',
]

const descriptions = [
  'Complete reconstruction with 24 new classrooms, computer lab, science lab, library, and smart boards in all classes.',
  'New academic block with physics, chemistry, biology labs, digital library, and sports complex with indoor facilities.',
  'Upgrade of existing infrastructure adding new wings for primary and secondary sections with separate playgrounds.',
  'Construction of modern school building with eco-friendly design, rainwater harvesting, solar panels, and barrier-free access.',
]

let schools = []
let idCounter = 2000

citySeeds.forEach(seed => {
  for (let i = 0; i < seed.count; i++) {
    const b = budget()
    const prog = progress()
    const workerCount = Math.floor(30 + Math.random() * 120)
    const tenderNum = `SSA/${seed.city.slice(0,3).toUpperCase()}/202${3 + (i % 2)}/${1000 + idCounter}`
    const dl = year(i % 3)

    schools.push({
      id: idCounter++,
      name: `${schoolNames[i % schoolNames.length]} — ${seed.city} (${i + 1})`,
      popupLabel: `${schoolNames[i % schoolNames.length]} — ${seed.city}`,
      type: 'Government School',
      category: 'schools',
      lat: +(seed.lat + rnd(-0.08, 0.08)),
      lng: +(seed.lng + rnd(-0.08, 0.08)),
      radius: 250 + Math.floor(Math.random() * 150),
      budget: b.total,
      spent: b.spent,
      progress: prog,
      deadline: dl,
      color: '#34d399',
      contractor: pick(schoolContractors),
      contractorContact: `+91-${Math.floor(1100000000 + Math.random() * 8899999999)}`.slice(0,15),
      contractorEmail: `projects${idCounter}@edu.gov.in`,
      sanctionedBy: pick(sanctionBodies),
      tenderNo: tenderNum,
      startDate: year(-1),
      workers: workerCount,
      safetyRating: pick(safetyRatings),
      lastInspection: `${Math.floor(1 + Math.random() * 28)} Mar 2026`,
      nextInspection: `${Math.floor(1 + Math.random() * 28)} Apr 2026`,
      description: descriptions[i % descriptions.length],
      impact: `${Math.floor(500 + Math.random() * 1500)} students capacity`,
      complaints: Math.floor(Math.random() * 5),
      updates: [
        { date: 'Mar 2026', text: `Construction ${prog - 10}% complete. Classroom wing structure done.` },
        { date: 'Dec 2025', text: 'Foundation completed. RCC work in progress.' },
        { date: 'Aug 2025', text: 'Site cleared. Foundation work started.' },
      ],
      milestones: [
        { label: 'Foundation', done: prog > 20 },
        { label: 'Structure', done: prog > 45 },
        { label: 'Roofing & MEP', done: prog > 65 },
        { label: 'Interior Work', done: prog > 80 },
        { label: 'Finishing & Handover', done: false },
      ],
    })
  }
})

export { schools }
