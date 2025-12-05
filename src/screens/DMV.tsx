import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { PageHeader } from '../components/PageHeader';
import { dmvCongestion, dmvTraffic } from '../data/mockWaitTimes';

export const DmvScreen = () => (
  <section className="page-grid">
    <PageHeader title="Government / DMV" subtitle="Walk-in & appointment intelligence" />
    <div className="stat-row">
      <div className="stat-card">
        <p className="eyebrow">Walk-in wait</p>
        <h2>{dmvCongestion.walkInWait} min</h2>
        <p>Steady improvement the last 25 minutes.</p>
      </div>
      <div className="stat-card">
        <p className="eyebrow">Appointment wait</p>
        <h2>{dmvCongestion.appointmentWait} min</h2>
        <p>Digital queue is pacing appointments precisely.</p>
      </div>
      <div className="stat-card">
        <p className="eyebrow">Congestion meter</p>
        <div className="congestion-meter">
          <div style={{ width: `${dmvCongestion.congestionScore * 100}%` }} />
        </div>
        <p>Suggested arrival window: {dmvCongestion.arrivalWindow}</p>
      </div>
    </div>
    <div className="chart-card">
      <div className="card-header">
        <h3>Appointment vs walk-in mix</h3>
        <span>Animated view</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={dmvTraffic} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="walk" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#3C7CE5" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#3C7CE5" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="appt" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#52C7D1" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#52C7D1" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" stroke="#8EA0B8" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #E2E8F6' }} />
          <Area type="monotone" dataKey="walkIn" stroke="#3C7CE5" fillOpacity={1} fill="url(#walk)" isAnimationActive />
          <Area type="monotone" dataKey="appointment" stroke="#52C7D1" fillOpacity={1} fill="url(#appt)" isAnimationActive animationDuration={1200} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </section>
);
