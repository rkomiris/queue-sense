import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { resolveOrganization } from '../utils/env';

type Channel = 'email' | 'sms' | 'push';

type FocusOption = {
  id: string;
  label: string;
  description: string;
};

export const SettingsScreen = () => {
  const { user, logout } = useAuth();
  const org = resolveOrganization(user?.orgId);
  const roleLabel = user?.role === 'org-admin' ? 'Organization admin' : 'Consumer preview';
  const localTime = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(new Date()),
    []
  );

  const channelDefaults = useMemo(
    () => ({
      email: true,
      sms: user?.role !== 'org-admin',
      push: true,
    }),
    [user?.role]
  );
  const [commPrefs, setCommPrefs] = useState<Record<Channel, boolean>>(channelDefaults);
  useEffect(() => setCommPrefs(channelDefaults), [channelDefaults]);

  const focusOptions = useMemo<FocusOption[]>(
    () =>
      user?.role === 'org-admin'
        ? [
            {
              id: 'portfolio',
              label: 'Portfolio pulse',
              description: 'Roll up every lobby with anomalies pinned to the top.',
            },
            {
              id: 'location',
              label: 'Last focused site',
              description: 'Resume with whichever location you filtered last session.',
            },
            {
              id: 'alerts',
              label: 'Alert triage',
              description: 'Jump straight into escalations that still need review.',
            },
          ]
        : [
            {
              id: 'nearby',
              label: 'Nearest lobby',
              description: 'Sort cards by proximity and digital adoption.',
            },
            {
              id: 'favorites',
              label: 'Pinned favorites',
              description: 'Start with the places you follow most closely.',
            },
            {
              id: 'coach',
              label: 'Arrival coach',
              description: 'Open with travel guidance ready the moment you log in.',
            },
          ],
    [user?.role]
  );
  const defaultFocus = focusOptions[0]?.id ?? 'portfolio';
  const [focus, setFocus] = useState(defaultFocus);
  useEffect(() => setFocus(defaultFocus), [defaultFocus]);

  const [alertWindow, setAlertWindow] = useState('30');
  const [autoStaffing, setAutoStaffing] = useState(true);
  const [broadcast, setBroadcast] = useState(true);
  const [intelSharing, setIntelSharing] = useState(false);

  const [visitCoach, setVisitCoach] = useState(true);
  const [lineSkipAlerts, setLineSkipAlerts] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);
  const [quietHours, setQuietHours] = useState('none');

  const [exportCadence, setExportCadence] = useState('weekly');

  const toggleChannel = (channel: Channel) =>
    setCommPrefs((prev) => ({
      ...prev,
      [channel]: !prev[channel],
    }));

  const channelSettings: { id: Channel; label: string; copy: string }[] = [
    {
      id: 'email',
      label: 'Email briefings',
      copy: '7 AM digest summarizing overnight queue shifts.',
    },
    {
      id: 'sms',
      label: 'SMS nudges',
      copy: 'Instant text when waits drop below your threshold.',
    },
    {
      id: 'push',
      label: 'Push & desktop',
      copy: 'Real-time toast notifications inside the console.',
    },
  ];

  return (
    <section className="page-grid settings-layout">
      <PageHeader title="Settings" subtitle="Personalize your ops cockpit" />
      <div className="settings-columns">
        <div className="settings-stack">
          <div className="settings-card fade-in">
            <div className="card-head">
              <span className="eyebrow">Profile</span>
              <span className="status-pill">{roleLabel}</span>
            </div>
            <h3>{user?.displayName || user?.username}</h3>
            <p>{org ? `${org.displayName} · ${org.vertical}` : 'QueueSense preview session'}</p>
            <ul className="settings-meta">
              <li>Signed in as {user?.username}</li>
              <li>Local time {localTime}</li>
              {org?.city && <li>Primary region · {org.city}</li>}
            </ul>
            <div className="profile-highlights">
              <div>
                <span>Org ID</span>
                <strong>{org?.orgId ?? 'N/A'}</strong>
              </div>
              <div>
                <span>Contact</span>
                <strong>{org?.contactEmail || 'ops@queuesense.com'}</strong>
              </div>
            </div>
          </div>

          <div className="settings-card fade-in">
            <h3>Notifications & nudges</h3>
            <p>Choose how often QueueSense should whisper about wait signals.</p>
            <div className="toggle-list">
              {channelSettings.map((channel) => (
                <label key={channel.id} className="preference-toggle">
                  <div>
                    <strong>{channel.label}</strong>
                    <p>{channel.copy}</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${commPrefs[channel.id] ? 'on' : ''}`}
                    onClick={() => toggleChannel(channel.id)}
                    aria-pressed={commPrefs[channel.id]}
                  >
                    <span className="sr-only">Toggle {channel.label}</span>
                  </button>
                </label>
              ))}
            </div>
          </div>

          <div className="settings-card fade-in">
            <h3>Default focus</h3>
            <p>Set the view that loads the moment you enter QueueSense.</p>
            <div className="focus-grid">
              {focusOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`focus-chip ${focus === option.id ? 'active' : ''}`}
                  onClick={() => setFocus(option.id)}
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-stack">
          {user?.role === 'org-admin' ? (
            <div className="settings-card fade-in">
              <h3>Automation guardrails</h3>
              <p>Tell QueueSense how far it can go on your behalf before paging you.</p>
              <div className="toggle-list">
                <label className="preference-toggle">
                  <div>
                    <strong>Auto flex staffing</strong>
                    <p>Shift schedules when occupancy tops 80%.</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${autoStaffing ? 'on' : ''}`}
                    onClick={() => setAutoStaffing((prev) => !prev)}
                    aria-pressed={autoStaffing}
                  >
                    <span className="sr-only">Toggle auto flex staffing</span>
                  </button>
                </label>
                <label className="preference-toggle">
                  <div>
                    <strong>Visitor broadcasts</strong>
                    <p>Push lobby status to SMS/email lists when spikes occur.</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${broadcast ? 'on' : ''}`}
                    onClick={() => setBroadcast((prev) => !prev)}
                    aria-pressed={broadcast}
                  >
                    <span className="sr-only">Toggle visitor broadcasts</span>
                  </button>
                </label>
                <label className="preference-toggle">
                  <div>
                    <strong>Share intel with HQ</strong>
                    <p>Mirror these insights to the city/state command center.</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${intelSharing ? 'on' : ''}`}
                    onClick={() => setIntelSharing((prev) => !prev)}
                    aria-pressed={intelSharing}
                  >
                    <span className="sr-only">Toggle HQ sharing</span>
                  </button>
                </label>
              </div>
              <div className="settings-controls">
                <label>
                  Alert window
                  <select
                    className="settings-select"
                    value={alertWindow}
                    onChange={(event) => setAlertWindow(event.target.value)}
                  >
                    <option value="15">15 min head start</option>
                    <option value="30">30 min head start</option>
                    <option value="45">45 min head start</option>
                  </select>
                </label>
                <label>
                  Max lobby load
                  <select className="settings-select" defaultValue="120">
                    <option value="90">90 people / hr</option>
                    <option value="120">120 people / hr</option>
                    <option value="150">150 people / hr</option>
                  </select>
                </label>
              </div>
            </div>
          ) : (
            <div className="settings-card fade-in">
              <h3>Visit planning coach</h3>
              <p>Keep nudges human so you know exactly when to head out.</p>
              <div className="toggle-list">
                <label className="preference-toggle">
                  <div>
                    <strong>Arrival coach</strong>
                    <p>Show travel guidance whenever I open details.</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${visitCoach ? 'on' : ''}`}
                    onClick={() => setVisitCoach((prev) => !prev)}
                    aria-pressed={visitCoach}
                  >
                    <span className="sr-only">Toggle arrival coach</span>
                  </button>
                </label>
                <label className="preference-toggle">
                  <div>
                    <strong>Line-drop alerts</strong>
                    <p>Ping me when waits fall under 15 minutes.</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${lineSkipAlerts ? 'on' : ''}`}
                    onClick={() => setLineSkipAlerts((prev) => !prev)}
                    aria-pressed={lineSkipAlerts}
                  >
                    <span className="sr-only">Toggle line-drop alerts</span>
                  </button>
                </label>
                <label className="preference-toggle">
                  <div>
                    <strong>Calendar sync</strong>
                    <p>Add holds on my calendar so I remember to leave.</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${calendarSync ? 'on' : ''}`}
                    onClick={() => setCalendarSync((prev) => !prev)}
                    aria-pressed={calendarSync}
                  >
                    <span className="sr-only">Toggle calendar sync</span>
                  </button>
                </label>
              </div>
              <div className="settings-controls">
                <label>
                  Quiet hours
                  <select
                    className="settings-select"
                    value={quietHours}
                    onChange={(event) => setQuietHours(event.target.value)}
                  >
                    <option value="none">Off</option>
                    <option value="night">9 PM – 7 AM</option>
                    <option value="custom">Custom window</option>
                  </select>
                </label>
                <label>
                  Lead time
                  <select className="settings-select" defaultValue="20">
                    <option value="10">10 min heads-up</option>
                    <option value="20">20 min heads-up</option>
                    <option value="30">30 min heads-up</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          <div className="settings-card fade-in">
            <h3>Data & exports</h3>
            <p>Share queue intelligence with your teammates or other systems.</p>
            <div className="data-glance">
              <article>
                <span>Live connectors</span>
                <strong>Slack · SMS · Email</strong>
                <p>Ops huddles receive status within 90 seconds.</p>
              </article>
              <article>
                <span>Retention</span>
                <strong>90 days of traces</strong>
                <p>Enough to brief finance on ROI and trend deltas.</p>
              </article>
            </div>
            <label className="settings-select-label">
              Auto export cadence
              <select
                className="settings-select"
                value={exportCadence}
                onChange={(event) => setExportCadence(event.target.value)}
              >
                <option value="daily">Daily snapshot</option>
                <option value="weekly">Weekly rollup</option>
                <option value="monthly">Monthly briefing</option>
              </select>
            </label>
            <div className="settings-actions">
              <button type="button" className="primary">
                Download latest CSV
              </button>
              <button type="button" className="ghost">
                Share live link
              </button>
            </div>
          </div>

          <div className="settings-card fade-in session-panel">
            <h3>Session & support</h3>
            <p>Need to switch personas or invite another teammate?</p>
            <p className="support-note">
              Reach the QueueSense crew anytime at <strong>ops@queuesense.com</strong>.
            </p>
            <div className="settings-actions">
              <button type="button" className="ghost" onClick={logout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
