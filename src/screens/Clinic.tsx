import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '../components/PageHeader';
import { HeatmapGrid } from '../components/HeatmapGrid';
import { clinicHeatmap, clinicStats, clinicTrend } from '../data/mockWaitTimes';

export const ClinicScreen = () => {
  const [alertEnabled, setAlertEnabled] = useState(true);

  return (
    <section className="page-grid">
      <PageHeader title="Clinic wait-time intelligence" subtitle="Green Valley Clinic" />
      <div className="stat-row">
        <div className="stat-card">
          <p className="eyebrow">Current wait</p>
          <h2>18 min</h2>
          <p>Express triage is smoothing out the midday rush.</p>
        </div>
        <div className="stat-card">
          <p className="eyebrow">Lobby load</p>
          <h2>{clinicStats.lobbyLoad} people</h2>
          <p>{clinicStats.currentPatients} active visits • {clinicStats.staffedRooms} rooms staffed</p>
          <p>{Math.round(clinicStats.engagement * 100)}% opted into alerts</p>
        </div>
        <div className="stat-card toggle">
          <p className="eyebrow">Notify me when</p>
          <h3>Under 15 minutes</h3>
          <label className="switch">
            <input type="checkbox" checked={alertEnabled} onChange={() => setAlertEnabled((prev) => !prev)} />
            <span />
          </label>
          <p>{alertEnabled ? 'We will ping you immediately.' : 'Alerts paused for now.'}</p>
        </div>
      </div>
      <div className="chart-card">
        <div className="card-header">
          <h3>Trend (last 6 hours)</h3>
          <span>Live smoothing on</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={clinicTrend} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#8EA0B8" tickLine={false} axisLine={false} />
            <YAxis stroke="#8EA0B8" tickLine={false} axisLine={false} />
            <Tooltip cursor={{ stroke: '#C6D4F2', strokeWidth: 1 }} contentStyle={{ borderRadius: 16, border: '1px solid #E2E8F6' }} />
            <Line type="monotone" dataKey="minutes" stroke="#4062FF" strokeWidth={3} dot={false} isAnimationActive />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="card">
        <div className="card-header">
          <h3>Peak hour heatmap</h3>
          <span>Dark = busiest</span>
        </div>
        <HeatmapGrid rows={clinicHeatmap} />
      </div>
    </section>
  );
};
