export type ServiceCard = {
  id: string;
  name: string;
  waitTime: number;
  state: 'improving' | 'stable' | 'rising';
  location: string;
  icon: string;
  detailRoute: string;
  highlight: string;
  tone: string;
  category: 'healthcare' | 'government' | 'campus';
  hours: {
    open: number;
    close: number;
  };
};

export const serviceCards: ServiceCard[] = [
  {
    id: 'urgent-care',
    name: 'Urgent Care',
    waitTime: 28,
    state: 'improving',
    location: 'Green Valley Clinic',
    icon: 'stethoscope',
    detailRoute: '/clinic',
    highlight: 'Triage surge contained, down 11 minutes in 45 minutes',
    tone: 'positive',
    category: 'healthcare',
    hours: { open: 0, close: 24 },
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    waitTime: 12,
    state: 'stable',
    location: 'Lakeview Retail Center',
    icon: 'pill',
    detailRoute: '/clinic',
    highlight: 'Controlled fulfillment, 62 scripts queued',
    tone: 'neutral',
    category: 'healthcare',
    hours: { open: 0, close: 24 },
  },
  {
    id: 'henniker-clinic',
    name: 'Henniker Community Clinic',
    waitTime: 34,
    state: 'rising',
    location: 'Henniker, NH',
    icon: 'stethoscope',
    detailRoute: '/clinic',
    highlight: 'Local high school game drove an unexpected rush',
    tone: 'warning',
    category: 'healthcare',
    hours: { open: 7, close: 19 },
  },
  {
    id: 'capital-urgent',
    name: 'Capital UrgentCare',
    waitTime: 25,
    state: 'improving',
    location: 'Concord, NH',
    icon: 'stethoscope',
    detailRoute: '/clinic',
    highlight: 'Provider float pool shaved 9 minutes',
    tone: 'positive',
    category: 'healthcare',
    hours: { open: 0, close: 24 },
  },
  {
    id: 'north-shore-clinic',
    name: 'North Shore Wellness',
    waitTime: 19,
    state: 'improving',
    location: 'North Shore, MA',
    icon: 'stethoscope',
    detailRoute: '/clinic',
    highlight: 'Mobile intake trimmed 6 minutes as teams staggered breaks.',
    tone: 'positive',
    category: 'healthcare',
    hours: { open: 0, close: 24 },
  },
  {
    id: 'dmv',
    name: 'DMV',
    waitTime: 41,
    state: 'stable',
    location: 'State DMV Office - Riverside Branch',
    icon: 'id-badge',
    detailRoute: '/dmv',
    highlight: 'Walk-in spike after lunch; digital counter balancing',
    tone: 'positive',
    category: 'government',
    hours: { open: 8, close: 17 },
  },
  {
    id: 'concord-dmv',
    name: 'DMV Express',
    waitTime: 33,
    state: 'improving',
    location: 'Concord DMV Express',
    icon: 'id-badge',
    detailRoute: '/dmv',
    highlight: 'Appointments pacing 12% under forecast',
    tone: 'positive',
    category: 'government',
    hours: { open: 8, close: 17 },
  },
  {
    id: 'campus',
    name: 'Campus Office',
    waitTime: 23,
    state: 'rising',
    location: 'Winding Ridge University',
    icon: 'graduation-cap',
    detailRoute: '/campus',
    highlight: 'Peak expected 3-6 PM with orientation rush',
    tone: 'warning',
    category: 'campus',
    hours: { open: 9, close: 18 },
  },
  {
    id: 'airport',
    name: 'Airport TSA PreCheck',
    waitTime: 19,
    state: 'improving',
    location: 'Metro Airport Terminal C',
    icon: 'plane',
    detailRoute: '/dmv',
    highlight: 'Realigned agents after long-haul arrival',
    tone: 'positive',
    category: 'government',
    hours: { open: 0, close: 24 },
  },
  {
    id: 'city-hall',
    name: 'City Hall Permits',
    waitTime: 36,
    state: 'stable',
    location: 'Downtown Civic Center',
    icon: 'building',
    detailRoute: '/dmv',
    highlight: 'Event permits trending up 22% for weekend',
    tone: 'neutral',
    category: 'government',
    hours: { open: 8, close: 18 },
  },
  {
    id: 'city-hub-dmv',
    name: 'Harbor DMV Satellite',
    waitTime: 27,
    state: 'improving',
    location: 'Harbor Plaza',
    icon: 'id-badge',
    detailRoute: '/dmv',
    highlight: 'Kiosk orchestration shaved 5 minutes off renewals.',
    tone: 'positive',
    category: 'government',
    hours: { open: 0, close: 24 },
  },
  {
    id: 'colby-campus',
    name: 'New England College Hub',
    waitTime: 21,
    state: 'stable',
    location: 'Henniker College Welcome Center',
    icon: 'graduation-cap',
    detailRoute: '/campus',
    highlight: 'Housing move-ins stretching ID printing',
    tone: 'neutral',
    category: 'campus',
    hours: { open: 9, close: 18 },
  },
  {
    id: 'ivy-campus',
    name: 'Ivy Tech Hub',
    waitTime: 18,
    state: 'improving',
    location: 'Ivy Tech Commons',
    icon: 'graduation-cap',
    detailRoute: '/campus',
    highlight: 'AI kiosks cleared 70% of arrivals before lunch.',
    tone: 'positive',
    category: 'campus',
    hours: { open: 0, close: 24 },
  },
];

export type TrendPoint = {
  time: string;
  minutes: number;
};

export type HeatmapRow = {
  label: string;
  slots: number[];
};

export type ClinicProfile = {
  id: string;
  subtitle: string;
  currentWait: number;
  narrative: string;
  stats: {
    lobbyLoad: number;
    currentPatients: number;
    staffedRooms: number;
    engagement: number;
  };
  trend: TrendPoint[];
  heatmap: HeatmapRow[];
};

export const clinicProfiles: Record<string, ClinicProfile> = {
  'urgent-care': {
    id: 'urgent-care',
    subtitle: 'Green Valley Clinic',
    currentWait: 28,
    narrative: 'Express triage smoothing out the midday surge.',
    stats: {
      lobbyLoad: 82,
      currentPatients: 25,
      staffedRooms: 14,
      engagement: 0.9,
    },
    trend: [
      { time: '7 AM', minutes: 42 },
      { time: '8 AM', minutes: 39 },
      { time: '9 AM', minutes: 35 },
      { time: '10 AM', minutes: 32 },
      { time: '11 AM', minutes: 30 },
      { time: '12 PM', minutes: 28 },
      { time: '1 PM', minutes: 27 },
      { time: '2 PM', minutes: 25 },
    ],
    heatmap: [
      { label: 'Mon', slots: [2, 3, 4, 6, 5, 4] },
      { label: 'Tue', slots: [1, 3, 5, 6, 5, 3] },
      { label: 'Wed', slots: [2, 4, 6, 7, 6, 4] },
      { label: 'Thu', slots: [2, 3, 4, 6, 5, 3] },
      { label: 'Fri', slots: [3, 5, 6, 7, 6, 5] },
    ],
  },
  pharmacy: {
    id: 'pharmacy',
    subtitle: 'Lakeview Retail Center',
    currentWait: 12,
    narrative: 'Controlled fulfillment with express pickup steady.',
    stats: {
      lobbyLoad: 34,
      currentPatients: 18,
      staffedRooms: 8,
      engagement: 0.78,
    },
    trend: [
      { time: '7 AM', minutes: 18 },
      { time: '8 AM', minutes: 16 },
      { time: '9 AM', minutes: 15 },
      { time: '10 AM', minutes: 14 },
      { time: '11 AM', minutes: 13 },
      { time: '12 PM', minutes: 12 },
      { time: '1 PM', minutes: 11 },
      { time: '2 PM', minutes: 10 },
    ],
    heatmap: [
      { label: 'Mon', slots: [1, 2, 3, 4, 3, 2] },
      { label: 'Tue', slots: [1, 2, 3, 4, 3, 2] },
      { label: 'Wed', slots: [2, 3, 4, 4, 3, 2] },
      { label: 'Thu', slots: [1, 2, 3, 4, 3, 1] },
      { label: 'Fri', slots: [2, 3, 3, 4, 3, 2] },
    ],
  },
  'henniker-clinic': {
    id: 'henniker-clinic',
    subtitle: 'Henniker Community Clinic',
    currentWait: 34,
    narrative: 'Local game crowd created a spike—teams stabilizing now.',
    stats: {
      lobbyLoad: 96,
      currentPatients: 32,
      staffedRooms: 15,
      engagement: 0.72,
    },
    trend: [
      { time: '7 AM', minutes: 28 },
      { time: '8 AM', minutes: 30 },
      { time: '9 AM', minutes: 33 },
      { time: '10 AM', minutes: 36 },
      { time: '11 AM', minutes: 38 },
      { time: '12 PM', minutes: 35 },
      { time: '1 PM', minutes: 34 },
      { time: '2 PM', minutes: 32 },
    ],
    heatmap: [
      { label: 'Mon', slots: [3, 3, 4, 6, 6, 5] },
      { label: 'Tue', slots: [2, 3, 5, 6, 5, 4] },
      { label: 'Wed', slots: [3, 5, 6, 7, 6, 5] },
      { label: 'Thu', slots: [2, 4, 5, 6, 5, 4] },
      { label: 'Fri', slots: [3, 5, 6, 7, 7, 6] },
    ],
  },
  'capital-urgent': {
    id: 'capital-urgent',
    subtitle: 'Capital UrgentCare',
    currentWait: 25,
    narrative: 'Float pool shaved nine minutes off the backlog.',
    stats: {
      lobbyLoad: 68,
      currentPatients: 23,
      staffedRooms: 12,
      engagement: 0.81,
    },
    trend: [
      { time: '7 AM', minutes: 34 },
      { time: '8 AM', minutes: 31 },
      { time: '9 AM', minutes: 29 },
      { time: '10 AM', minutes: 27 },
      { time: '11 AM', minutes: 26 },
      { time: '12 PM', minutes: 24 },
      { time: '1 PM', minutes: 23 },
      { time: '2 PM', minutes: 22 },
    ],
    heatmap: [
      { label: 'Mon', slots: [2, 3, 4, 5, 4, 3] },
      { label: 'Tue', slots: [2, 3, 4, 5, 4, 3] },
      { label: 'Wed', slots: [3, 4, 5, 6, 5, 4] },
      { label: 'Thu', slots: [2, 3, 4, 5, 4, 3] },
      { label: 'Fri', slots: [3, 4, 5, 6, 5, 4] },
    ],
  },
  'north-shore-clinic': {
    id: 'north-shore-clinic',
    subtitle: 'North Shore Wellness',
    currentWait: 19,
    narrative: 'Mobile intake cleared 70% of visits before arrival.',
    stats: {
      lobbyLoad: 54,
      currentPatients: 19,
      staffedRooms: 10,
      engagement: 0.88,
    },
    trend: [
      { time: '7 AM', minutes: 24 },
      { time: '8 AM', minutes: 22 },
      { time: '9 AM', minutes: 21 },
      { time: '10 AM', minutes: 20 },
      { time: '11 AM', minutes: 19 },
      { time: '12 PM', minutes: 18 },
      { time: '1 PM', minutes: 17 },
      { time: '2 PM', minutes: 17 },
    ],
    heatmap: [
      { label: 'Mon', slots: [2, 3, 3, 4, 3, 2] },
      { label: 'Tue', slots: [2, 3, 4, 4, 3, 2] },
      { label: 'Wed', slots: [2, 4, 4, 5, 4, 3] },
      { label: 'Thu', slots: [2, 3, 4, 4, 3, 3] },
      { label: 'Fri', slots: [3, 4, 5, 5, 4, 3] },
    ],
  },
};

export type CampusProfile = {
  id: string;
  subtitle: string;
  currentWait: number;
  digitalRate: number;
  kiosksOnline: number;
  staffOnDuty: number;
  upcomingAppointments: number;
  nextLull: string;
  trend: TrendPoint[];
  serviceLines: {
    id: string;
    label: string;
    wait: number;
    throughput: number;
    detail: string;
  }[];
};

export const campusProfiles: Record<string, CampusProfile> = {
  campus: {
    id: 'campus',
    subtitle: 'Winding Ridge University',
    currentWait: 23,
    digitalRate: 0.74,
    kiosksOnline: 5,
    staffOnDuty: 12,
    upcomingAppointments: 186,
    nextLull: '3:15 PM',
    trend: [
      { time: '8 AM', minutes: 17 },
      { time: '9 AM', minutes: 19 },
      { time: '10 AM', minutes: 21 },
      { time: '11 AM', minutes: 24 },
      { time: '12 PM', minutes: 25 },
      { time: '1 PM', minutes: 23 },
      { time: '2 PM', minutes: 21 },
      { time: '3 PM', minutes: 20 },
      { time: '4 PM', minutes: 18 },
    ],
    serviceLines: [
      { id: 'registrar', label: 'Registrar', wait: 18, throughput: 44, detail: 'Housing docs and ID pickups spiking after lunch.' },
      { id: 'financial-aid', label: 'Financial aid', wait: 23, throughput: 33, detail: 'Direct-deposit changes triggered an unexpected queue.' },
      { id: 'student-services', label: 'Student services', wait: 15, throughput: 58, detail: 'Mobile self check-in cleared 62% of routine questions.' },
      { id: 'international', label: 'International office', wait: 26, throughput: 22, detail: 'Visa paperwork backlog expected until 3:30 PM.' },
    ],
  },
  'colby-campus': {
    id: 'colby-campus',
    subtitle: 'Henniker College Welcome Center',
    currentWait: 21,
    digitalRate: 0.69,
    kiosksOnline: 4,
    staffOnDuty: 10,
    upcomingAppointments: 162,
    nextLull: '2:45 PM',
    trend: [
      { time: '8 AM', minutes: 16 },
      { time: '9 AM', minutes: 17 },
      { time: '10 AM', minutes: 19 },
      { time: '11 AM', minutes: 21 },
      { time: '12 PM', minutes: 22 },
      { time: '1 PM', minutes: 21 },
      { time: '2 PM', minutes: 19 },
      { time: '3 PM', minutes: 18 },
      { time: '4 PM', minutes: 16 },
    ],
    serviceLines: [
      { id: 'registrar-colby', label: 'Registrar', wait: 17, throughput: 46, detail: 'Transfer paperwork and dorm swaps keeping staff busy.' },
      { id: 'aid-colby', label: 'Financial aid', wait: 20, throughput: 31, detail: 'Scholarship confirmations trending up 18% week over week.' },
      { id: 'services-colby', label: 'Student services', wait: 13, throughput: 52, detail: 'Self-help desk cleared most tech support tasks.' },
      { id: 'intl-colby', label: 'International office', wait: 24, throughput: 20, detail: 'Orientation visa packets releasing at 4 PM.' },
    ],
  },
  'ivy-campus': {
    id: 'ivy-campus',
    subtitle: 'Ivy Tech Student Hub',
    currentWait: 18,
    digitalRate: 0.77,
    kiosksOnline: 6,
    staffOnDuty: 11,
    upcomingAppointments: 210,
    nextLull: '4:10 PM',
    trend: [
      { time: '8 AM', minutes: 14 },
      { time: '9 AM', minutes: 16 },
      { time: '10 AM', minutes: 18 },
      { time: '11 AM', minutes: 20 },
      { time: '12 PM', minutes: 21 },
      { time: '1 PM', minutes: 20 },
      { time: '2 PM', minutes: 18 },
      { time: '3 PM', minutes: 17 },
      { time: '4 PM', minutes: 15 },
    ],
    serviceLines: [
      { id: 'registrar-ivy', label: 'Registrar', wait: 16, throughput: 50, detail: 'Laptop pickup blending with course changes.' },
      { id: 'aid-ivy', label: 'Financial aid', wait: 19, throughput: 34, detail: 'Aid verifications closing ahead of weekend.' },
      { id: 'services-ivy', label: 'Student services', wait: 12, throughput: 60, detail: 'AI concierge solved most tech help requests.' },
      { id: 'intl-ivy', label: 'Global office', wait: 22, throughput: 26, detail: 'SEVIS check-ins spiking after 5 PM.' },
    ],
  },
};

export type DmvProfile = {
  id: string;
  subtitle: string;
  walkInWait: number;
  appointmentWait: number;
  congestionScore: number;
  arrivalWindow: string;
  traffic: Array<{ label: string; walkIn: number; appointment: number }>;
};

export const dmvProfiles: Record<string, DmvProfile> = {
  dmv: {
    id: 'dmv',
    subtitle: 'State DMV Office - Riverside Branch',
    walkInWait: 41,
    appointmentWait: 9,
    congestionScore: 0.64,
    arrivalWindow: '2:10–2:35 PM',
    traffic: [
      { label: '9 AM', walkIn: 34, appointment: 48 },
      { label: '11 AM', walkIn: 40, appointment: 56 },
      { label: '1 PM', walkIn: 37, appointment: 54 },
      { label: '3 PM', walkIn: 29, appointment: 51 },
      { label: '5 PM', walkIn: 33, appointment: 59 },
    ],
  },
  'concord-dmv': {
    id: 'concord-dmv',
    subtitle: 'Concord DMV Express',
    walkInWait: 33,
    appointmentWait: 7,
    congestionScore: 0.52,
    arrivalWindow: '1:45–2:05 PM',
    traffic: [
      { label: '9 AM', walkIn: 28, appointment: 44 },
      { label: '11 AM', walkIn: 31, appointment: 48 },
      { label: '1 PM', walkIn: 30, appointment: 46 },
      { label: '3 PM', walkIn: 24, appointment: 43 },
      { label: '5 PM', walkIn: 26, appointment: 45 },
    ],
  },
  airport: {
    id: 'airport',
    subtitle: 'Metro Airport Terminal C',
    walkInWait: 19,
    appointmentWait: 6,
    congestionScore: 0.41,
    arrivalWindow: '11:10–11:30 AM',
    traffic: [
      { label: '9 AM', walkIn: 22, appointment: 40 },
      { label: '11 AM', walkIn: 20, appointment: 44 },
      { label: '1 PM', walkIn: 18, appointment: 42 },
      { label: '3 PM', walkIn: 16, appointment: 38 },
      { label: '5 PM', walkIn: 17, appointment: 39 },
    ],
  },
  'city-hall': {
    id: 'city-hall',
    subtitle: 'Downtown Civic Center',
    walkInWait: 36,
    appointmentWait: 11,
    congestionScore: 0.58,
    arrivalWindow: '10:50–11:20 AM',
    traffic: [
      { label: '9 AM', walkIn: 30, appointment: 41 },
      { label: '11 AM', walkIn: 34, appointment: 45 },
      { label: '1 PM', walkIn: 35, appointment: 47 },
      { label: '3 PM', walkIn: 31, appointment: 44 },
      { label: '5 PM', walkIn: 28, appointment: 43 },
    ],
  },
  'city-hub-dmv': {
    id: 'city-hub-dmv',
    subtitle: 'Harbor DMV Satellite',
    walkInWait: 27,
    appointmentWait: 8,
    congestionScore: 0.49,
    arrivalWindow: '11:50 AM – 12:20 PM',
    traffic: [
      { label: '9 AM', walkIn: 24, appointment: 41 },
      { label: '11 AM', walkIn: 26, appointment: 45 },
      { label: '1 PM', walkIn: 28, appointment: 44 },
      { label: '3 PM', walkIn: 25, appointment: 42 },
      { label: '5 PM', walkIn: 22, appointment: 40 },
    ],
  },
};

export type TimelineSlot = {
  slot: string;
  status: 'smooth' | 'watch' | 'surge';
  message: string;
};

export type ArrivalCoachProfile = {
  id: string;
  headline: string;
  summary: string;
  recommendedWindow: string;
  holdSuggestion?: string;
  intentCopy: {
    now: string;
    soon: string;
    plan: string;
  };
  timeline: TimelineSlot[];
};

export const arrivalCoachProfiles: Record<string, ArrivalCoachProfile> = {
  campus: {
    id: 'campus',
    headline: 'Walk-in now, out by 2:15 PM',
    summary: 'Orientation surge is fading—express kiosks keep you moving.',
    recommendedWindow: 'Next 20 minutes',
    holdSuggestion: 'Holding off 30 minutes trims waits to 18 min.',
    intentCopy: {
      now: 'Check in on arrival—we saved you a kiosk slot.',
      soon: 'Leave in 15 min to sync with the lull.',
      plan: 'Book the 3:30 PM slot to glide through.',
    },
    timeline: [
      { slot: '1:30 PM', status: 'watch', message: 'Orientation group finishing paperwork.' },
      { slot: '2:00 PM', status: 'smooth', message: 'Digital pre-check clears most visitors.' },
      { slot: '2:30 PM', status: 'smooth', message: 'Mobile nudge keeps lobby open.' },
      { slot: '3:00 PM', status: 'surge', message: 'Campus tour returns, expect +7 min.' },
      { slot: '3:30 PM', status: 'smooth', message: 'Express lane frees up.' },
    ],
  },
  'colby-campus': {
    id: 'colby-campus',
    headline: 'Hold 15 min for a faster visit',
    summary: 'Move-in docs are spiking right now—give it a beat.',
    recommendedWindow: '2:45 – 3:15 PM',
    holdSuggestion: 'Waiting 15 min sheds 5 min of lobby time.',
    intentCopy: {
      now: 'Heads up: expect 5 min extra today.',
      soon: 'Leave at 2:30 PM to hit the sweet spot.',
      plan: 'Reserve 4:00 PM when orientation quiets.',
    },
    timeline: [
      { slot: '1:45 PM', status: 'surge', message: 'Housing contracts in review.' },
      { slot: '2:15 PM', status: 'watch', message: 'Express desk catching up.' },
      { slot: '2:45 PM', status: 'smooth', message: 'Most ID pickups done.' },
      { slot: '3:15 PM', status: 'smooth', message: 'International office quiet.' },
      { slot: '4:00 PM', status: 'smooth', message: 'Drop-in hours reset.' },
    ],
  },
  dmv: {
    id: 'dmv',
    headline: 'Walk-ins flowing—jump in now',
    summary: 'License renewals are pacing 12% under forecast.',
    recommendedWindow: '2:10 – 2:35 PM',
    intentCopy: {
      now: 'Grab kiosk B for fastest service.',
      soon: 'Arrive at 2:10 PM to beat the commuter pulse.',
      plan: 'Schedule a 4 PM slot to skip entirely.',
    },
    timeline: [
      { slot: '1:00 PM', status: 'watch', message: 'Walk-ins from lunch arriving.' },
      { slot: '1:30 PM', status: 'smooth', message: 'Express lanes opened.' },
      { slot: '2:00 PM', status: 'smooth', message: 'Appointments pacing under forecast.' },
      { slot: '2:30 PM', status: 'smooth', message: 'Minimal lobby dwell.' },
      { slot: '3:00 PM', status: 'surge', message: 'Road tests return.' },
    ],
  },
  'concord-dmv': {
    id: 'concord-dmv',
    headline: 'Arrive in 20 min for VIP treatment',
    summary: 'Express desk is flowing; skip the 3 PM rush.',
    recommendedWindow: '1:45 – 2:10 PM',
    intentCopy: {
      now: 'Walk right up—renewals moving fast.',
      soon: 'Leave soon; kiosk 4C clears waits.',
      plan: 'Reserve 4:10 PM to bypass entirely.',
    },
    timeline: [
      { slot: '1:00 PM', status: 'smooth', message: 'Check-ins steady.' },
      { slot: '1:30 PM', status: 'smooth', message: 'Mobile pre-check smoothing flow.' },
      { slot: '2:00 PM', status: 'smooth', message: 'Concierge assisting appointments.' },
      { slot: '2:30 PM', status: 'watch', message: 'Real ID walk-ins expected.' },
      { slot: '3:00 PM', status: 'surge', message: 'Lunch crowd returns.' },
    ],
  },
  airport: {
    id: 'airport',
    headline: 'Perfect window right now',
    summary: 'PreCheck line is sub-20 minutes.',
    recommendedWindow: 'Now through 1:30 PM',
    intentCopy: {
      now: 'Glide through. Agents rebalanced after arrivals.',
      soon: 'Leave in 10 min to sync with crew change.',
      plan: 'Book 5 PM slot when long-hauls land.',
    },
    timeline: [
      { slot: '11:30 AM', status: 'smooth', message: 'International arrivals staggered.' },
      { slot: '12:00 PM', status: 'smooth', message: 'Staff redeployed to PreCheck.' },
      { slot: '12:30 PM', status: 'smooth', message: 'Queue under 15 min.' },
      { slot: '1:00 PM', status: 'watch', message: 'Regional flights depart.' },
      { slot: '1:30 PM', status: 'surge', message: 'Long-haul arrivals inbound.' },
    ],
  },
  'city-hall': {
    id: 'city-hall',
    headline: 'Pulse hitting—wait 25 min',
    summary: 'Permits spike at noon. Chill and return at 12:45 PM.',
    recommendedWindow: '12:45 – 1:30 PM',
    intentCopy: {
      now: 'Expect 6 extra minutes right now.',
      soon: 'Delay 20 min to save 8 min.',
      plan: 'Evening slots are wide open after 4 PM.',
    },
    timeline: [
      { slot: '11:30 AM', status: 'surge', message: 'Event permits flooding in.' },
      { slot: '12:00 PM', status: 'surge', message: 'Contractors in queue.' },
      { slot: '12:30 PM', status: 'watch', message: 'Clerks clearing backlog.' },
      { slot: '1:00 PM', status: 'smooth', message: 'Lobby resets.' },
      { slot: '1:30 PM', status: 'smooth', message: 'Drop-ins minimal.' },
    ],
  },
  'urgent-care': {
    id: 'urgent-care',
    headline: 'Fast lane just reopened',
    summary: 'Triage floaters got ahead of the rush.',
    recommendedWindow: 'Next 30 minutes',
    intentCopy: {
      now: 'Check in now while express chairs are free.',
      soon: 'Arrive in 20 min when labs hand off results.',
      plan: 'Reserve an evening slot for 18 min waits.',
    },
    timeline: [
      { slot: '12:00 PM', status: 'watch', message: 'Lunch walk-ins finishing.' },
      { slot: '12:30 PM', status: 'smooth', message: 'Fast-track reopened.' },
      { slot: '1:00 PM', status: 'smooth', message: 'Provider float pool online.' },
      { slot: '1:30 PM', status: 'watch', message: 'Post-school traffic inbound.' },
      { slot: '2:00 PM', status: 'smooth', message: 'All rooms staffed.' },
    ],
  },
  pharmacy: {
    id: 'pharmacy',
    headline: 'Express pickup window open',
    summary: 'Fulfillment is steady—swing by soon.',
    recommendedWindow: 'Next 45 minutes',
    intentCopy: {
      now: 'Grab scripts now before the lunch crowd.',
      soon: 'Leave in 20 min to match courier drop.',
      plan: 'Reserve 6 PM for a zero-wait pickup.',
    },
    timeline: [
      { slot: '11:30 AM', status: 'smooth', message: 'Drive-thru empty.' },
      { slot: '12:00 PM', status: 'watch', message: 'Lunch-late pickups arrive.' },
      { slot: '12:30 PM', status: 'smooth', message: 'Courier drop completes.' },
      { slot: '1:00 PM', status: 'smooth', message: 'Tele-pharm support online.' },
      { slot: '1:30 PM', status: 'surge', message: 'Clinic scripts inbound.' },
    ],
  },
  'henniker-clinic': {
    id: 'henniker-clinic',
    headline: 'Hold 10 min for calmer lobby',
    summary: 'Game day rush is clearing.',
    recommendedWindow: '2:30 – 3:00 PM',
    intentCopy: {
      now: 'Expect a brief hold as teams reset.',
      soon: 'Leave at 2:15 PM for best flow.',
      plan: 'Evening slots run 15 min faster.',
    },
    timeline: [
      { slot: '1:30 PM', status: 'surge', message: 'Student athletes wrapping up.' },
      { slot: '2:00 PM', status: 'watch', message: 'Imaging backlog clearing.' },
      { slot: '2:30 PM', status: 'smooth', message: 'Lobby chairs open.' },
      { slot: '3:00 PM', status: 'smooth', message: 'Mobile pre-check open.' },
      { slot: '3:30 PM', status: 'watch', message: 'Commuter rush inbound.' },
    ],
  },
  'capital-urgent': {
    id: 'capital-urgent',
    headline: 'Float team on deck',
    summary: 'We shaved nine minutes off waits already.',
    recommendedWindow: 'Next hour',
    intentCopy: {
      now: 'Walk in now for priority fast-track.',
      soon: 'Arrive in 30 min after labs unload.',
      plan: 'Book the 8 PM slot for calm lobby.',
    },
    timeline: [
      { slot: '12:00 PM', status: 'smooth', message: 'Float nurses prepped.' },
      { slot: '12:30 PM', status: 'smooth', message: 'Doc consults caught up.' },
      { slot: '1:00 PM', status: 'watch', message: 'Ortho referrals inbound.' },
      { slot: '1:30 PM', status: 'smooth', message: 'All rooms staffed.' },
      { slot: '2:00 PM', status: 'smooth', message: 'Backlog cleared.' },
    ],
  },
  'north-shore-clinic': {
    id: 'north-shore-clinic',
    headline: 'Mobile intake is humming',
    summary: 'Most visits will be seated in 10 minutes.',
    recommendedWindow: 'Now through 1 PM',
    intentCopy: {
      now: 'Stop in now while kiosks are idle.',
      soon: 'Plan your drive for a 1 PM arrival.',
      plan: 'Reserve a 4 PM slot for sunset calm.',
    },
    timeline: [
      { slot: '11:30 AM', status: 'smooth', message: 'Minimal lobby dwell.' },
      { slot: '12:00 PM', status: 'smooth', message: 'Triage finishing early.' },
      { slot: '12:30 PM', status: 'smooth', message: 'Digital check-ins flowing.' },
      { slot: '1:00 PM', status: 'watch', message: 'After-school flu shots incoming.' },
      { slot: '1:30 PM', status: 'smooth', message: 'Evening staff arrives.' },
    ],
  },
  'city-hub-dmv': {
    id: 'city-hub-dmv',
    headline: 'Harbor plaza is clear for takeoff',
    summary: 'Satellite counters absorbed the lunch crowd.',
    recommendedWindow: '11:45 AM – 12:30 PM',
    intentCopy: {
      now: 'Come now—kiosk 2B is free.',
      soon: 'Leave soon to catch the lull before contractors arrive.',
      plan: 'Schedule 4 PM to breeze through.',
    },
    timeline: [
      { slot: '11:00 AM', status: 'watch', message: 'Contractor permits finishing.' },
      { slot: '11:30 AM', status: 'smooth', message: 'Queue under 20 min.' },
      { slot: '12:00 PM', status: 'smooth', message: 'Express counters staffed.' },
      { slot: '12:30 PM', status: 'watch', message: 'Lunch traffic returns.' },
      { slot: '1:00 PM', status: 'surge', message: 'Boat registrations due.' },
    ],
  },
  'ivy-campus': {
    id: 'ivy-campus',
    headline: 'Digital concierge on duty',
    summary: 'AI kiosks are keeping visits short.',
    recommendedWindow: '3:45 – 4:30 PM',
    intentCopy: {
      now: 'Expect short waits if you arrive now.',
      soon: 'Leave in 30 min to match the lull.',
      plan: 'Book tonight for instant service.',
    },
    timeline: [
      { slot: '2:30 PM', status: 'watch', message: 'Campus tour returning.' },
      { slot: '3:00 PM', status: 'smooth', message: 'Most drop-ins finish.' },
      { slot: '3:30 PM', status: 'smooth', message: 'New kiosk shift online.' },
      { slot: '4:00 PM', status: 'smooth', message: 'Only appointments in lobby.' },
      { slot: '4:30 PM', status: 'watch', message: 'Evening classes start.' },
    ],
  },
};

export type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  emphasis: 'positive' | 'warning' | 'neutral';
};

export const smartNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Urgent care decompressing',
    detail: 'Fast-track reopened and 3 visiting clinicians jumped in, easing waits from 39 → 28 min.',
    timestamp: '5m ago',
    emphasis: 'positive',
  },
  {
    id: 'n2',
    title: 'DMV floor needs relief',
    detail: 'License renewals pacing 19% above forecast; recommended to open kiosk 4B.',
    timestamp: '14m ago',
    emphasis: 'positive',
  },
  {
    id: 'n3',
    title: 'Campus orientation surge',
    detail: '182 mobile check-ins already queued for 3–6 PM. Send SMS nudges for remote pickup.',
    timestamp: '27m ago',
    emphasis: 'warning',
  },
];

export const adminOverview = [
  { label: 'Lobby load', value: 74, unit: 'people', trend: '+11 vs avg' },
  { label: 'Predicted arrivals', value: 138, unit: 'next 4h', trend: '+17%' },
  { label: 'Staff utilization', value: 0.79, unit: 'ratio', trend: 'Balanced' },
  { label: 'Abandonment rate', value: 0.06, unit: '', trend: '↑ 1 pt after lunch' },
];

export const adminTrend = [
  { time: '6 AM', wait: 28 },
  { time: '8 AM', wait: 39 },
  { time: '10 AM', wait: 42 },
  { time: '12 PM', wait: 34 },
  { time: '2 PM', wait: 27 },
  { time: '4 PM', wait: 30 },
  { time: '6 PM', wait: 37 },
];

export const adminInsights = [
  {
    id: 'insight-1',
    title: 'Wait-time down 11% WoW',
    detail: 'AI pacing told nurses to pre-board imaging and it freed 3 rooms before the rush.',
  },
  {
    id: 'insight-2',
    title: 'Today’s peak at 11:15 AM',
    detail: 'Redeployed concierge staff absorbed 168 unexpected walk-ins with zero overflow.',
  },
  {
    id: 'insight-3',
    title: 'Engagement is sticky',
    detail: '75% of visitors opted into live notifications before arriving on site.',
  },
];

export type OptimizationLever = {
  id: string;
  target: ServiceCard['category'] | 'any';
  label: string;
  description: string;
  investmentHours: number;
  investmentCost: number;
  projectedSavings: number;
  roiMultiple: number;
  theme: 'Staffing' | 'Automation' | 'Engagement' | 'Intelligence';
  owner: string;
  effort: string;
};

export const optimizationLevers: OptimizationLever[] = [
  {
    id: 'express-lane',
    target: 'healthcare',
    label: 'Express triage lane',
    description: 'Stand up a high-throughput fast-track with a float RN and mobile intake prompts.',
    investmentHours: 16,
    investmentCost: 5400,
    projectedSavings: 22000,
    roiMultiple: 4.1,
    theme: 'Staffing',
    owner: 'Clinical ops',
    effort: '2-day spin-up',
  },
  {
    id: 'precheck-sms',
    target: 'government',
    label: 'Mobile pre-check push',
    description: 'Shift renewals to self-serve kiosks via SMS nudges and queue ETA transparency.',
    investmentHours: 12,
    investmentCost: 3200,
    projectedSavings: 16800,
    roiMultiple: 5.2,
    theme: 'Engagement',
    owner: 'Digital team',
    effort: '1 sprint',
  },
  {
    id: 'campus-orchestration',
    target: 'campus',
    label: 'Orchestration war room',
    description: 'Spin up a shared ops channel routing student services to lighter-touch offices.',
    investmentHours: 20,
    investmentCost: 6100,
    projectedSavings: 19500,
    roiMultiple: 3.2,
    theme: 'Automation',
    owner: 'Student services',
    effort: '3-week pilot',
  },
  {
    id: 'any-staffing',
    target: 'any',
    label: 'Adaptive staffing ritual',
    description: 'Weekly 30-min review to rebalance schedules using QueueSense arrival curves.',
    investmentHours: 8,
    investmentCost: 1800,
    projectedSavings: 8400,
    roiMultiple: 3.6,
    theme: 'Staffing',
    owner: 'Ops excellence',
    effort: 'Weekly sync',
  },
  {
    id: 'analytics-upskill',
    target: 'any',
    label: 'Analyst upskill sprint',
    description: 'Train ops leads on anomaly guardrails for proactive queue interventions.',
    investmentHours: 10,
    investmentCost: 2500,
    projectedSavings: 12600,
    roiMultiple: 4.0,
    theme: 'Intelligence',
    owner: 'Data team',
    effort: '2-week sprint',
  },
  {
    id: 'virtual-lobby',
    target: 'healthcare',
    label: 'Virtual lobby prep',
    description: 'Move pre-visit paperwork to mobile and gate arrivals until rooms are ready.',
    investmentHours: 14,
    investmentCost: 4200,
    projectedSavings: 18200,
    roiMultiple: 4.3,
    theme: 'Engagement',
    owner: 'Patient comms',
    effort: '10-day rollout',
  },
  {
    id: 'gov-fastpass',
    target: 'government',
    label: 'Fast-pass appointment lane',
    description: 'Allocate 2 DMVs windows for prepaid renewals and message citizens with VIP slots.',
    investmentHours: 18,
    investmentCost: 5100,
    projectedSavings: 24400,
    roiMultiple: 4.8,
    theme: 'Engagement',
    owner: 'Field ops',
    effort: '3-week prep',
  },
  {
    id: 'campus-coach',
    target: 'campus',
    label: 'Peer coach desk',
    description: 'Train student workers to triage paperwork spikes before registrar bottlenecks.',
    investmentHours: 22,
    investmentCost: 4800,
    projectedSavings: 20100,
    roiMultiple: 4.2,
    theme: 'Staffing',
    owner: 'Student success',
    effort: 'Semester rotation',
  },
  {
    id: 'ai-concierge',
    target: 'any',
    label: 'AI concierge autopilot',
    description: 'Route common visitor questions to AI chat so humans focus on escalations.',
    investmentHours: 15,
    investmentCost: 3900,
    projectedSavings: 16200,
    roiMultiple: 4.1,
    theme: 'Automation',
    owner: 'Experience design',
    effort: 'Launch kit',
  },
  {
    id: 'ops-sim-lab',
    target: 'any',
    label: 'Ops simulator lab',
    description: 'Run monthly tabletop exercises using QueueSense forecasts to rehearse spikes.',
    investmentHours: 12,
    investmentCost: 2800,
    projectedSavings: 13200,
    roiMultiple: 4.7,
    theme: 'Intelligence',
    owner: 'Command center',
    effort: 'Monthly ritual',
  },
  {
    id: 'partner-routing',
    target: 'any',
    label: 'Partner appointment routing',
    description: 'Sync partner calendars with QueueSense to direct low-acuity visits offsite.',
    investmentHours: 24,
    investmentCost: 6400,
    projectedSavings: 31200,
    roiMultiple: 4.9,
    theme: 'Automation',
    owner: 'Partnerships',
    effort: 'API sprint',
  },
];

export type ProfitTimelinePoint = {
  month: string;
  baselineCost: number;
  optimizedCost: number;
  investments: number;
};

export const profitTimeline: ProfitTimelinePoint[] = [
  { month: 'Jan', baselineCost: 86000, optimizedCost: 85200, investments: 2400 },
  { month: 'Feb', baselineCost: 88500, optimizedCost: 87000, investments: 2600 },
  { month: 'Mar', baselineCost: 92000, optimizedCost: 91000, investments: 3000 },
  { month: 'Apr', baselineCost: 96500, optimizedCost: 92800, investments: 3200 },
  { month: 'May', baselineCost: 101200, optimizedCost: 94600, investments: 3500 },
  { month: 'Jun', baselineCost: 106400, optimizedCost: 95200, investments: 4100 },
  { month: 'Jul', baselineCost: 110000, optimizedCost: 94900, investments: 4300 },
  { month: 'Aug', baselineCost: 112500, optimizedCost: 93200, investments: 3800 },
  { month: 'Sep', baselineCost: 111800, optimizedCost: 91800, investments: 3600 },
  { month: 'Oct', baselineCost: 109900, optimizedCost: 90400, investments: 3400 },
  { month: 'Nov', baselineCost: 108400, optimizedCost: 89000, investments: 3200 },
  { month: 'Dec', baselineCost: 109200, optimizedCost: 88200, investments: 3100 },
];

export type InitiativeAttribution = {
  leverId: string;
  label: string;
  savings: number;
  investment: number;
  owners: string[];
};

export const initiativeAttribution: InitiativeAttribution[] = [
  {
    leverId: 'express-lane',
    label: 'Fast-track staffing remix',
    savings: 42000,
    investment: 8800,
    owners: ['Clinical ops', 'Float team'],
  },
  {
    leverId: 'precheck-sms',
    label: 'DMV mobile pre-check',
    savings: 36000,
    investment: 7200,
    owners: ['Digital team', 'Field ops'],
  },
  {
    leverId: 'campus-orchestration',
    label: 'Campus orchestration',
    savings: 28000,
    investment: 6100,
    owners: ['Student services'],
  },
  {
    leverId: 'any-staffing',
    label: 'Adaptive staffing ritual',
    savings: 26000,
    investment: 3600,
    owners: ['Ops excellence'],
  },
  {
    leverId: 'analytics-upskill',
    label: 'Analytics enablement',
    savings: 24000,
    investment: 2500,
    owners: ['Data team'],
  },
  {
    leverId: 'express-lane',
    label: 'Mobile intake refresh',
    savings: 21000,
    investment: 1800,
    owners: ['Product', 'Clinic experience'],
  },
  {
    leverId: 'precheck-sms',
    label: 'Auto kiosk orchestration',
    savings: 19000,
    investment: 2100,
    owners: ['Gov ops', 'Field support'],
  },
];

export type LocationBenchmark = {
  id: string;
  label: string;
  costPerVisit: number;
  throughput: number;
  satisfaction: number;
  automationRate: number;
  category: ServiceCard['category'];
};

export const locationBenchmarks: LocationBenchmark[] = [
  {
    id: 'bench-gv',
    label: 'Green Valley Clinic',
    costPerVisit: 118,
    throughput: 72,
    satisfaction: 86,
    automationRate: 0.64,
    category: 'healthcare',
  },
  {
    id: 'bench-dmv1',
    label: 'State DMV Central',
    costPerVisit: 96,
    throughput: 140,
    satisfaction: 73,
    automationRate: 0.42,
    category: 'government',
  },
  {
    id: 'bench-dmv2',
    label: 'Concord DMV Express',
    costPerVisit: 82,
    throughput: 118,
    satisfaction: 78,
    automationRate: 0.58,
    category: 'government',
  },
  {
    id: 'bench-campus',
    label: 'Winding Ridge University',
    costPerVisit: 74,
    throughput: 210,
    satisfaction: 91,
    automationRate: 0.71,
    category: 'campus',
  },
  {
    id: 'bench-colby',
    label: 'New England College Hub',
    costPerVisit: 69,
    throughput: 188,
    satisfaction: 88,
    automationRate: 0.76,
    category: 'campus',
  },
  {
    id: 'bench-urgent',
    label: 'Capital UrgentCare',
    costPerVisit: 124,
    throughput: 64,
    satisfaction: 82,
    automationRate: 0.48,
    category: 'healthcare',
  },
  {
    id: 'bench-airport',
    label: 'Metro Airport PreCheck',
    costPerVisit: 88,
    throughput: 156,
    satisfaction: 79,
    automationRate: 0.67,
    category: 'government',
  },
  {
    id: 'bench-north-shore',
    label: 'North Shore Wellness',
    costPerVisit: 102,
    throughput: 70,
    satisfaction: 90,
    automationRate: 0.72,
    category: 'healthcare',
  },
  {
    id: 'bench-harbor-dmv',
    label: 'Harbor DMV Satellite',
    costPerVisit: 84,
    throughput: 134,
    satisfaction: 81,
    automationRate: 0.61,
    category: 'government',
  },
  {
    id: 'bench-ivy',
    label: 'Ivy Tech Hub',
    costPerVisit: 72,
    throughput: 215,
    satisfaction: 93,
    automationRate: 0.79,
    category: 'campus',
  },
];

export const systemContent = {
  consumer: {
    hero: {
      eyebrow: 'Visitor clarity',
      title: 'The calm lobby is powered behind the scenes.',
      body: 'Every check-in, text reply, and staff move feeds the QueueSense brain so your visit feels predictable and personal.',
      bullets: [
        'Signals stay in sync so ETAs adjust before you notice a change.',
        'AI keeps the right teammates in the right spot to shrink waits.',
        'Notifications explain next steps across SMS, web, and kiosks.',
      ],
      primaryLabel: 'See how it stays calm',
      secondaryLabel: 'Watch the story deck',
    },
    blueprint: [
      {
        id: 'capture',
        title: 'Signal capture',
        description: 'Kiosks, SMS, and mobile check-ins update your place in line instantly.',
        bullets: ['Tap-in kiosks & QR scans', 'Two-way SMS concierge', 'Appointment & calendar sync'],
        metric: { label: 'Updates/min', value: '8.4K' },
      },
      {
        id: 'predict',
        title: 'Predictive calm',
        description: 'Wait curves refresh every few minutes so you always see an honest ETA.',
        bullets: ['Location DNA models', 'Live load-balancing', 'Promise window monitoring'],
        metric: { label: 'ETA confidence', value: '95%' },
      },
      {
        id: 'nudge',
        title: 'Smart nudges',
        description: 'The system texts you when to head in, pause, or reroute to a shorter line.',
        bullets: ['SMS + push notifications', 'Personalized prep steps', 'Delay + fast-lane offers'],
        metric: { label: 'Delivery rate', value: '98%' },
      },
      {
        id: 'guidance',
        title: 'On-site guidance',
        description: 'Hosts and signage stay in sync with the same data you see.',
        bullets: ['Lobby screens refresh live', 'Staff tablets show priorities', 'Concierge chat keeps context'],
        metric: { label: 'Happy visits', value: '4.8 / 5' },
      },
    ],
    telemetry: [
      { id: 'confidence', label: 'ETA confidence', value: '95%', detail: 'last 30 mins', trend: 'Holding steady' },
      { id: 'signals', label: 'Signals flowing', value: '12 streams', detail: 'kiosk + SMS + partner', trend: 'All green' },
      { id: 'assist', label: 'Concierge response', value: '35 sec', detail: 'avg human assist', trend: '-12% vs. yesterday' },
      { id: 'calm', label: 'Calm score', value: '92', detail: 'ambient lobby feel', trend: '+7 vs. baseline' },
    ],
    streams: [
      { id: 'arrival', title: 'Arrival insights', status: 'Live ETA feed', detail: 'Your spot adjusts every 4 min.', metric: 'Next ping in 2m' },
      { id: 'notifications', title: 'Notification fabric', status: 'Delivering', detail: 'SMS + push updates to 18 visitor cohorts.', metric: '97% success' },
      { id: 'concierge', title: 'Concierge chat', status: 'Online', detail: 'Live staff available for any question.', metric: 'Avg reply 35 sec' },
      { id: 'guides', title: 'Playbook guidance', status: 'Ready', detail: 'Hosts see the same steps and promises as you.', metric: '5 assist cards active' },
    ],
  },
  admin: {
    hero: {
      eyebrow: 'Live fabric',
      title: 'Instrumented signals move from kiosk tap to predictive action.',
      body: 'QueueSense keeps every channel synchronized: visitor intent, staffing promises, and anomaly guardrails. The outcome is a calm lobby and proactive crews before lines form.',
      bullets: [
        'Sub-2s ingestion across kiosks, SMS, apps, and partner APIs.',
        'Forecasts remix every 4 minutes with contextual staffing knobs.',
        'Notification fabric pushes living ETAs and exec-ready insights.',
      ],
      primaryLabel: 'Explore the stack',
      secondaryLabel: 'View architecture deck',
    },
    blueprint: [
      {
        id: 'signals',
        title: 'Signal fabric',
        description: 'Every touchpoint pushes structured events within 2 seconds.',
        bullets: ['Kiosk, SMS, concierge tablets', '3rd-party calendars & CRM feeds', 'Staff roster + IoT density signals'],
        metric: { label: 'Signals/min', value: '14.2K' },
      },
      {
        id: 'context',
        title: 'Contextual intelligence',
        description: 'Models blend arrivals, staffing, and promise windows to flag bottlenecks.',
        bullets: ['Queue DNA model per location', 'Stress + abandonment predictors', 'Anomaly guardrails'],
        metric: { label: 'Decisions/hr', value: '320' },
      },
      {
        id: 'forecast',
        title: 'Predictive runway',
        description: 'Curves re-simulated every 4 minutes with live send-times.',
        bullets: ['Arrival bands ± 3 min', 'Load balancing & playbooks', 'Auto-staff nudges'],
        metric: { label: 'Forecast accuracy', value: '94%' },
      },
      {
        id: 'experience',
        title: 'Experience fabric',
        description: 'Insights fan out to consumer touchpoints and exec surfaces instantly.',
        bullets: ['Consumer app + SMS concierge', 'Ops dashboards & APIs', 'Notification fabric'],
        metric: { label: 'Moments delivered', value: '2.1M /mo' },
      },
    ],
    telemetry: [
      { id: 'uptime', label: 'Signal uptime', value: '99.98%', detail: 'last 7 days', trend: '+0.02%' },
      { id: 'forecast', label: 'Forecast refresh', value: '4m cadence', detail: 'average across sites', trend: 'Live' },
      { id: 'guardrails', label: 'Guardrails active', value: '31 monitors', detail: 'staff + anomaly', trend: '3 new this week' },
      { id: 'satisfaction', label: 'Visitor CSAT', value: '4.8 / 5', detail: 'post-visit pulse', trend: '+12 pts vs. baseline' },
    ],
    streams: [
      { id: 'ingestion', title: 'Ingestion health', status: 'Optimal', detail: 'No dropped packets across kiosks + SMS', metric: '11.4K events / min' },
      { id: 'automation', title: 'Automation studio', status: 'Routing playbooks ready', detail: '7 automations active · 2 in review', metric: '45 saved staff hours / wk' },
      { id: 'notifications', title: 'Notification fabric', status: 'Green', detail: 'Real-time ETA updates flowing to 18 cohorts', metric: '97% delivery success' },
      { id: 'insights', title: 'Command insights', status: 'Exec brief ready', detail: 'ROI, backlog, and staffing deltas refreshed now', metric: 'Next digest 14:00 ET' },
    ],
  },
} as const;
