import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { MetricTile } from '../components/MetricTile';
import { PageHeader } from '../components/PageHeader';
import { adminInsights, adminOverview, adminTrend } from '../data/mockWaitTimes';

export const AdminDashboard = () => (
  <section className="page-grid">
    <PageHeader title="Business efficiency" subtitle="Admin hero dashboard" />
    <div className="grid metric-grid">
      {adminOverview.map((metric) => (
        <MetricTile key={metric.label} {...metric} />
      ))}
    </div>
    <div className="chart-card">
      <div className="card-header">
        <h3>12-hour wait-time history</h3>
        <span>Predictive smoothing applied</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={adminTrend}>
          <XAxis dataKey="time" stroke="#8EA0B8" tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #E2E8F6' }} />
          <Line type="monotone" dataKey="wait" stroke="#111826" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="grid insight-grid">
      {adminInsights.map((insight) => (
        <article key={insight.id} className="insight-card fade-in">
          <p className="eyebrow">Insight</p>
          <h3>{insight.title}</h3>
          <p>{insight.detail}</p>
        </article>
      ))}
    </div>
  </section>
);
