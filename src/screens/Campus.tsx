import { useMemo, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { arrivalCoachProfiles, campusProfiles, serviceCards } from '../data/mockWaitTimes';
import { ArrivalCoach } from '../components/ArrivalCoach';
import { getWaitDisplay } from '../utils/waitDisplay';

export const CampusScreen = () => {
  const [nudgesEnabled, setNudgesEnabled] = useState(true);
  const [params] = useSearchParams();
  const siteId = params.get('site');
  const defaultCard = useMemo(() => serviceCards.find((card) => card.category === 'campus'), []);
  const activeCard = useMemo(
    () =>
      serviceCards.find((card) => card.id === siteId && card.category === 'campus') ??
      (defaultCard ?? serviceCards.find((card) => card.category === 'campus')),
    [siteId, defaultCard]
  );
  const profile =
    (activeCard && campusProfiles[activeCard.id]) ??
    (defaultCard && campusProfiles[defaultCard.id]) ??
    campusProfiles.campus;
  const coachProfile = activeCard ? arrivalCoachProfiles[activeCard.id] : undefined;
  const fallbackWait = {
    primary: `${profile.currentWait}`,
    unit: 'min',
    message: '',
    status: 'open' as const,
    opensAt: '',
  };
  const waitDisplay = activeCard ? getWaitDisplay(activeCard, profile.currentWait) : fallbackWait;
  const isOpen = waitDisplay.status === 'open';
  const [intent, setIntent] = useState<'now' | 'soon' | 'plan'>('now');
  const [autoNudge, setAutoNudge] = useState(false);

  return (
    <section className="page-grid">
      <PageHeader title={`${activeCard?.name ?? 'Campus'} queue orchestration`} subtitle={profile.subtitle} />
      <div className="stat-row">
        <div className="stat-card">
          <p className="eyebrow">Current wait</p>
          <h2>
            {waitDisplay.primary}
            {waitDisplay.unit && <small> {waitDisplay.unit}</small>}
          </h2>
          <p>{isOpen ? `Orientation support humming. Next lull at ${profile.nextLull}.` : waitDisplay.message}</p>
        </div>
        <div className="stat-card">
          <p className="eyebrow">Digital adoption</p>
          <h2>{Math.round(profile.digitalRate * 100)}%</h2>
          <p>
            {profile.kiosksOnline} kiosks online • {profile.staffOnDuty} staff on duty
          </p>
          <p>{profile.upcomingAppointments} appointments synced for the afternoon.</p>
        </div>
        <div className="stat-card toggle">
          <p className="eyebrow">Auto nudges</p>
          <h3>Remind when &lt; 10 min</h3>
          <label className="switch">
            <input type="checkbox" checked={nudgesEnabled} onChange={() => setNudgesEnabled((prev) => !prev)} />
            <span />
          </label>
          <p>{nudgesEnabled ? 'Students get push + SMS updates.' : 'Nudges paused for the next hour.'}</p>
        </div>
      </div>
      <div className="chart-card">
        <div className="card-header">
          <h3>Orientation flow (today)</h3>
          <span>Predictive smoothing applied</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={profile.trend} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#8EA0B8" tickLine={false} axisLine={false} />
            <YAxis stroke="#8EA0B8" tickLine={false} axisLine={false} />
            <Tooltip cursor={{ stroke: '#C6D4F2', strokeWidth: 1 }} contentStyle={{ borderRadius: 16, border: '1px solid #E2E8F6' }} />
            <Line type="monotone" dataKey="minutes" stroke="#4062FF" strokeWidth={3} dot={false} isAnimationActive />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="card">
        <div className="card-header">
          <h3>Service line spotlight</h3>
          <span>Wait vs throughput</span>
        </div>
        <div className="campus-line-list">
          {profile.serviceLines.map((line) => (
            <article key={line.id} className="campus-line-card">
              <div>
                <p className="eyebrow">{line.label}</p>
                <strong>{line.wait} min wait</strong>
                <p>{line.detail}</p>
              </div>
              <div className="campus-line-chip">
                <span>{line.throughput}/hr flow</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      {coachProfile && (
        <ArrivalCoach
          card={activeCard}
          profile={coachProfile}
          intent={intent}
          onIntentChange={setIntent}
          autoNudgeEnabled={autoNudge}
          onToggleAutoNudge={() => setAutoNudge((prev) => !prev)}
          waitStatus={waitDisplay}
        />
      )}
    </section>
  );
};
