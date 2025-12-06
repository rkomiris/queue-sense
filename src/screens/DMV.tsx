import { useMemo, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { arrivalCoachProfiles, dmvProfiles, serviceCards } from '../data/mockWaitTimes';
import { ArrivalCoach } from '../components/ArrivalCoach';
import { getWaitDisplay } from '../utils/waitDisplay';

export const DmvScreen = () => {
  const [params] = useSearchParams();
  const siteId = params.get('site');
  const defaultCard = useMemo(() => serviceCards.find((card) => card.category === 'government'), []);
  const activeCard = useMemo(
    () =>
      serviceCards.find((card) => card.id === siteId && card.category === 'government') ??
      (defaultCard ?? serviceCards.find((card) => card.category === 'government')),
    [siteId, defaultCard]
  );
  const profile =
    (activeCard && dmvProfiles[activeCard.id]) ??
    (defaultCard && dmvProfiles[defaultCard.id]) ??
    dmvProfiles.dmv;
  const coachProfile = activeCard ? arrivalCoachProfiles[activeCard.id] : undefined;
  const [intent, setIntent] = useState<'now' | 'soon' | 'plan'>('now');
  const [autoNudge, setAutoNudge] = useState(false);
  const fallbackWait = {
    primary: `${profile.walkInWait}`,
    unit: 'min',
    message: '',
    status: 'open' as const,
    opensAt: '',
  };
  const waitDisplay = activeCard ? getWaitDisplay(activeCard, profile.walkInWait) : fallbackWait;
  const isOpen = waitDisplay.status === 'open';

  return (
    <section className="page-grid">
      <PageHeader title={`${activeCard?.name ?? 'Government'} operations`} subtitle={profile.subtitle} />
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
      <div className="stat-row">
        <div className="stat-card">
          <p className="eyebrow">Walk-in wait</p>
          <h2>
            {waitDisplay.primary}
            {waitDisplay.unit && <small> {waitDisplay.unit}</small>}
          </h2>
          <p>{isOpen ? 'Steady improvement the last 25 minutes.' : waitDisplay.message || `Opens at ${waitDisplay.opensAt}`}</p>
        </div>
        <div className="stat-card">
          <p className="eyebrow">Appointment wait</p>
          <h2>{isOpen ? `${profile.appointmentWait} min` : `Avg ${profile.appointmentWait} min`}</h2>
          <p>{isOpen ? 'Digital queue is pacing appointments precisely.' : `Appointments resume ${waitDisplay.opensAt}`}</p>
        </div>
        <div className="stat-card">
          <p className="eyebrow">Congestion meter</p>
          {isOpen ? (
            <>
              <div className="congestion-meter">
                <div style={{ width: `${profile.congestionScore * 100}%` }} />
              </div>
              <p>Suggested arrival window: {profile.arrivalWindow}</p>
            </>
          ) : (
            <p>Closed — reopen window {waitDisplay.opensAt}</p>
          )}
        </div>
      </div>
      <div className="chart-card">
        <div className="card-header">
          <h3>Appointment vs walk-in mix</h3>
          <span>Animated view</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={profile.traffic} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
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
};
