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
  },
  {
    id: 'campus',
    name: 'Campus Office',
    waitTime: 23,
    state: 'rising',
    location: 'Winding Ridge University',
    icon: 'graduation-cap',
    detailRoute: '/clinic',
    highlight: 'Peak expected 3-6 PM with orientation rush',
    tone: 'warning',
    category: 'campus',
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
  },
  {
    id: 'colby-campus',
    name: 'New England College Hub',
    waitTime: 21,
    state: 'stable',
    location: 'Henniker College Welcome Center',
    icon: 'graduation-cap',
    detailRoute: '/clinic',
    highlight: 'Housing move-ins stretching ID printing',
    tone: 'neutral',
    category: 'campus',
  },
];

export type TrendPoint = {
  time: string;
  minutes: number;
};

export const clinicTrend: TrendPoint[] = [
  { time: '7 AM', minutes: 52 },
  { time: '8 AM', minutes: 48 },
  { time: '9 AM', minutes: 44 },
  { time: '10 AM', minutes: 38 },
  { time: '11 AM', minutes: 33 },
  { time: '12 PM', minutes: 29 },
  { time: '1 PM', minutes: 24 },
  { time: '2 PM', minutes: 21 },
];

export type HeatmapRow = {
  label: string;
  slots: number[];
};

export const clinicHeatmap: HeatmapRow[] = [
  { label: 'Mon', slots: [2, 3, 5, 7, 6, 4] },
  { label: 'Tue', slots: [1, 4, 5, 6, 6, 3] },
  { label: 'Wed', slots: [3, 5, 7, 8, 6, 4] },
  { label: 'Thu', slots: [2, 4, 5, 6, 5, 3] },
  { label: 'Fri', slots: [3, 6, 7, 8, 7, 5] },
];

export const clinicStats = {
  lobbyLoad: 78,
  currentPatients: 27,
  staffedRooms: 14,
  engagement: 0.86,
};

export const dmvTraffic = [
  { label: '9 AM', walkIn: 34, appointment: 48 },
  { label: '11 AM', walkIn: 40, appointment: 56 },
  { label: '1 PM', walkIn: 37, appointment: 54 },
  { label: '3 PM', walkIn: 29, appointment: 51 },
  { label: '5 PM', walkIn: 33, appointment: 59 },
];

export const dmvCongestion = {
  walkInWait: 41,
  appointmentWait: 9,
  congestionScore: 0.64,
  arrivalWindow: 'Best arrival window 2:10–2:35 PM',
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

export const systemDiagram = [
  {
    id: 'inputs',
    title: 'Data Inputs',
    bullets: ['Kiosk sign-ins', 'Mobile check-ins', '3rd-party feeds', 'Staff scheduling'],
  },
  {
    id: 'engine',
    title: 'Analytics Engine',
    bullets: ['Contextual queue AI', 'Bottleneck detection', 'Anomaly guardrails'],
  },
  {
    id: 'modeling',
    title: 'Predictive Modeling',
    bullets: ['Arrival curve forecasts', 'Load balancing', 'Proactive staffing'],
  },
  {
    id: 'outputs',
    title: 'Experience Outputs',
    bullets: ['Consumer app', 'Org dashboards', 'Notification fabric'],
  },
];
