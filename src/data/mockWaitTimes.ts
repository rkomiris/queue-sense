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
};

export const serviceCards: ServiceCard[] = [
  {
    id: 'urgent-care',
    name: 'Urgent Care',
    waitTime: 12,
    state: 'improving',
    location: 'Green Valley Clinic',
    icon: 'stethoscope',
    detailRoute: '/clinic',
    highlight: 'Down 35% in the last hour',
    tone: 'positive',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    waitTime: 7,
    state: 'stable',
    location: 'Lakeview Retail Center',
    icon: 'pill',
    detailRoute: '/clinic',
    highlight: 'Average fulfillment 6 min',
    tone: 'neutral',
  },
  {
    id: 'dmv',
    name: 'DMV',
    waitTime: 32,
    state: 'improving',
    location: 'State DMV Office',
    icon: 'id-badge',
    detailRoute: '/dmv',
    highlight: 'Walk-ins flowing smoothly',
    tone: 'positive',
  },
  {
    id: 'campus',
    name: 'Campus Office',
    waitTime: 18,
    state: 'rising',
    location: 'Winding Ridge University',
    icon: 'graduation-cap',
    detailRoute: '/clinic',
    highlight: 'Peak expected 3-6 PM',
    tone: 'warning',
  },
];

export type TrendPoint = {
  time: string;
  minutes: number;
};

export const clinicTrend: TrendPoint[] = [
  { time: '8 AM', minutes: 46 },
  { time: '9 AM', minutes: 41 },
  { time: '10 AM', minutes: 38 },
  { time: '11 AM', minutes: 34 },
  { time: '12 PM', minutes: 28 },
  { time: '1 PM', minutes: 22 },
  { time: '2 PM', minutes: 18 },
];

export type HeatmapRow = {
  label: string;
  slots: number[];
};

export const clinicHeatmap: HeatmapRow[] = [
  { label: 'Mon', slots: [3, 4, 6, 7, 5, 3] },
  { label: 'Tue', slots: [2, 4, 5, 6, 5, 3] },
  { label: 'Wed', slots: [4, 5, 7, 8, 6, 4] },
  { label: 'Thu', slots: [3, 4, 5, 6, 4, 3] },
  { label: 'Fri', slots: [4, 6, 7, 7, 5, 4] },
];

export const clinicStats = {
  lobbyLoad: 64,
  currentPatients: 21,
  staffedRooms: 12,
  engagement: 0.82,
};

export const dmvTraffic = [
  { label: '8 AM', walkIn: 28, appointment: 52 },
  { label: '10 AM', walkIn: 32, appointment: 61 },
  { label: '12 PM', walkIn: 29, appointment: 58 },
  { label: '2 PM', walkIn: 24, appointment: 54 },
  { label: '4 PM', walkIn: 31, appointment: 67 },
];

export const dmvCongestion = {
  walkInWait: 35,
  appointmentWait: 9,
  congestionScore: 0.58,
  arrivalWindow: 'Arrive between 1:20–1:45 PM',
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
    title: 'Urgent Care free-fall',
    detail: 'Dropped from 47 → 12 minutes with express triage open.',
    timestamp: '2m ago',
    emphasis: 'positive',
  },
  {
    id: 'n2',
    title: 'DMV at lowest wait',
    detail: 'Walk-in throughput peaked, floor leads shifted staff proactively.',
    timestamp: '12m ago',
    emphasis: 'positive',
  },
  {
    id: 'n3',
    title: 'Campus Office surge',
    detail: 'Peak expected 3–6 PM with 140 mobile check-ins queued.',
    timestamp: '22m ago',
    emphasis: 'warning',
  },
];

export const adminOverview = [
  { label: 'Lobby load', value: 68, unit: 'people', trend: '+8 vs avg' },
  { label: 'Predicted arrivals', value: 124, unit: 'next 4h', trend: '+14%' },
  { label: 'Staff utilization', value: 0.82, unit: 'ratio', trend: 'Optimal' },
  { label: 'Abandonment rate', value: 0.04, unit: '', trend: '↓ 2 pts' },
];

export const adminTrend = [
  { time: '6 AM', wait: 32 },
  { time: '8 AM', wait: 41 },
  { time: '10 AM', wait: 38 },
  { time: '12 PM', wait: 31 },
  { time: '2 PM', wait: 22 },
  { time: '4 PM', wait: 24 },
  { time: '6 PM', wait: 33 },
];

export const adminInsights = [
  {
    id: 'insight-1',
    title: 'Wait-time down 13% WoW',
    detail: 'AI pacing recommended clearing exam rooms 6 minutes earlier.',
  },
  {
    id: 'insight-2',
    title: 'Today’s peak at 10–11 AM',
    detail: 'Staff redeployments absorbed 140 additional walk-ins without overflow.',
  },
  {
    id: 'insight-3',
    title: 'Engagement is sticky',
    detail: '72% of visitors opted into smart notifications this morning.',
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
