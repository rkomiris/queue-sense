import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const featurePillars = [
  {
    title: 'Predict wait-times',
    detail: 'Blend kiosk, mobile, and staff signals to forecast congestion in under 60 seconds.',
  },
  {
    title: 'Automate orchestration',
    detail: 'AI playbooks redeploy team members before lobbies spike, keeping abandonment low.',
  },
  {
    title: 'Inspire confidence',
    detail: 'Beautiful consumer surfaces nudge walk-ins and VIP appointments at exactly the right time.',
  },
];

const pricingPlans = [
  {
    tier: 'Launch',
    price: '$2.5K/mo',
    perks: ['Single site', 'Predictive waitboard', 'Smart notifications'],
  },
  {
    tier: 'Scale',
    price: '$7.9K/mo',
    perks: ['Up to 5 locations', 'Staffing automation', 'White-glove insights crew'],
  },
  {
    tier: 'Galaxy',
    price: 'Custom',
    perks: ['Nationwide ops', 'API lattice', 'Executive command center'],
  },
];

const signalCards = [
  {
    label: 'Clinic signal',
    wait: '18 min',
    detail: 'Express triage smoothing out midday demand.',
  },
  {
    label: 'DMV signal',
    wait: '32 min',
    detail: 'Walk-ins and appointments balanced via AI pacing.',
  },
  {
    label: 'Campus signal',
    wait: '12 min',
    detail: 'Mobile nudges keep student services flowing.',
  },
];

const growthData = [
  { month: 'Apr', users: 220 },
  { month: 'May', users: 340 },
  { month: 'Jun', users: 520 },
  { month: 'Jul', users: 780 },
  { month: 'Aug', users: 1020 },
  { month: 'Sep', users: 1350 },
];

const waitCurve = [
  { slot: '8a', minutes: 46 },
  { slot: '10a', minutes: 34 },
  { slot: '12p', minutes: 22 },
  { slot: '2p', minutes: 18 },
  { slot: '4p', minutes: 29 },
  { slot: '6p', minutes: 41 },
];

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@queuesense.com');
  const [password, setPassword] = useState('welcome123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planForm, setPlanForm] = useState({ name: '', email: '' });
  const [planSubmitted, setPlanSubmitted] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', org: '', email: '' });
  const [registerDone, setRegisterDone] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const profile = await login(email, password);
      setTimeout(() => {
        setLoading(false);
        navigate(profile.role === 'org-admin' ? '/dashboard' : '/home');
      }, 500);
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    }
  };

  return (
    <div className="landing-shell">
      <header className="landing-header">
        <div className="logo-mark">
          <div className="logo-dot" />
          <span>QueueSense</span>
        </div>
        <nav>
          <a href="#story">Story</a>
          <a href="#momentum">Momentum</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="header-cta">
          <button className="ghost" onClick={() => setShowModal(true)}>
            Log in
          </button>
          <button className="primary" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            Book prototype review
          </button>
        </div>
      </header>
      <main className="landing-content">
        <section className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="hero-eyebrow">Futuristic wait OS</p>
            <h1>QueueSense predicts congestion before the line forms.</h1>
            <p className="subtitle">
              A neural decision surface tuned for clinics, DMV hubs, and campus command centers that crave fewer lines.
            </p>
            <div className="hero-cta">
              <button className="primary" onClick={() => setShowModal(true)}>
                Enter live demo
              </button>
              <button className="ghost" onClick={() => window.open('/predict-wait-times.pptx', '_blank')}>
                Download deck
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <strong>97%</strong>
                <span>visitors trust ETA</span>
              </div>
              <div>
                <strong>35%</strong>
                <span>wait drop in pilots</span>
              </div>
              <div>
                <strong>8</strong>
                <span>vertical playbooks</span>
              </div>
            </div>
          </div>
        </section>

        <section className="signal-row">
          {signalCards.map((signal) => (
            <article key={`${signal.label}-row`}>
              <p className="eyebrow">{signal.label}</p>
              <div className="signal-meta">
                <strong>{signal.wait}</strong>
                <span>live</span>
              </div>
              <p>{signal.detail}</p>
            </article>
          ))}
        </section>

        <section className="story-section" id="story">
          <div className="story-text">
            <p className="eyebrow">Product story</p>
            <h3>Predict wait-times across civic life.</h3>
            <p>
              Straight from the pitch deck: QueueSense fuses data inputs, analytics engines, and predictive modeling into a single operating layer so
              cities orchestrate calmer queues.
            </p>
          </div>
          <div className="pillars">
            {featurePillars.map((pillar) => (
              <article key={pillar.title}>
                <h4>{pillar.title}</h4>
                <p>{pillar.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="insight-grid" id="momentum">
          <article className="story-card chart-card">
            <p className="eyebrow">Momentum</p>
            <h3>Mobile adoption compounding</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growthData} margin={{ top: 10, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="growth" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#7b5bff" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#7b5bff" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9ca7c3" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca7c3" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #dbe2ff' }} />
                <Area type="monotone" dataKey="users" stroke="#7b5bff" fill="url(#growth)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="muted-text">Pilots across clinics, DMV branches, and university hubs drive sticky app usage.</p>
          </article>
          <article className="story-card chart-card">
            <p className="eyebrow">Predictive promise</p>
            <h3>Wait curve crushed vs baseline</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={waitCurve}>
                <XAxis dataKey="slot" stroke="#9ca7c3" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca7c3" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #dbe2ff' }} />
                <Line type="monotone" dataKey="minutes" stroke="#00c8b1" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="muted-text">AI cues flatten peaks ~40% versus standing in unmanaged queues.</p>
          </article>
          <article className="story-card founder-card">
            <p className="eyebrow">Founders’ note</p>
            <h3>We choreograph civic calm with QueueSense.</h3>
            <p>
              The crew obsesses over turning chaotic lines into serene, data-driven flows. Every motion in this demo is a love letter to civic
              patience, inspired directly by the deck’s vision.
            </p>
            <button className="ghost" onClick={() => setShowTeam(true)}>
              Meet the team →
            </button>
          </article>
        </section>

        <section className="story-card pricing-card" id="pricing">
          <p className="eyebrow">Pricing signals</p>
          <h3>Designed for multi-site rollouts</h3>
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <article key={plan.tier}>
                <h4>{plan.tier}</h4>
                <strong>{plan.price}</strong>
                <ul>
                  {plan.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <button className="ghost" onClick={() => setSelectedPlan(plan.tier)}>
                  Choose
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="login-modal" onClick={(event) => event.stopPropagation()}>
            <div className="logo-dot" />
            <h2>Sign in</h2>
            <p className="subtitle">Use your QueueSense preview credentials to step inside the orchestration suite.</p>
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="demo@queuesense.com" required />
              </label>
              <label>
                Password
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" required />
              </label>
              <button type="submit" disabled={loading}>
                {loading ? 'Authenticating…' : 'Log in'}
              </button>
              <button type="button" className="ghost full-width" onClick={() => setShowRegister(true)}>
                Register for access
              </button>
            </form>
          </div>
        </div>
      )}
      {showTeam && (
        <div className="modal-overlay" onClick={() => setShowTeam(false)}>
          <div className="team-modal" onClick={(event) => event.stopPropagation()}>
            <div className="logo-dot" />
            <h2>Meet the QueueSense crew</h2>
            <p className="subtitle">Visionary builders turning the Predict Wait-Times deck into a living product.</p>
            <ul className="team-list">
              <li>
                <strong>Shitong Gu</strong> — Chief Synthesis Officer. Turns messy civic telemetry into poetic control rooms, handcrafting every
                predictive gesture.
              </li>
              <li>
                <strong>Marie Anastasia Taleck</strong> — Head of Experience. Designs serenity-first interfaces, choreographing the calm aesthetic you
                feel on this page.
              </li>
              <li>
                <strong>Sai Sahithi Krishna Nalluri</strong> — Intelligence Lead. Tunes the neural wait models so they whisper to clinics and DMVs
                before lines spike.
              </li>
              <li>
                <strong>Rohan Komirishetty</strong> — Systems Architect. Brings the deck’s architectural promise to life, wiring every mock signal into
                this immersive demo.
              </li>
            </ul>
            <button className="ghost full-width" onClick={() => setShowTeam(false)}>
              Back to site
            </button>
          </div>
        </div>
      )}
      {selectedPlan && (
        <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div
            className="plan-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="logo-dot" />
            <h2>{selectedPlan} plan</h2>
            {planSubmitted ? (
              <>
                <p className="subtitle">
                  Perfect. A QueueSense specialist will reach out to {planForm.email} and we cannot wait to optimize your queues.
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    setPlanSubmitted(false);
                    setPlanForm({ name: '', email: '' });
                    setSelectedPlan(null);
                  }}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="subtitle">
                  We will host a bespoke prototype review focused on the {selectedPlan} tier and align next steps for your pilots.
                </p>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setPlanSubmitted(true);
                  }}
                  className="plan-form"
                >
                  <label>
                    Name
                    <input value={planForm.name} onChange={(event) => setPlanForm((prev) => ({ ...prev, name: event.target.value }))} required />
                  </label>
                  <label>
                    Email
                    <input type="email" value={planForm.email} onChange={(event) => setPlanForm((prev) => ({ ...prev, email: event.target.value }))} required />
                  </label>
                  <button className="primary" type="submit">
                    Request this plan
                  </button>
                </form>
              </>
            )}
            <button className="ghost full-width" onClick={() => setSelectedPlan(null)}>
              Maybe later
            </button>
          </div>
        </div>
      )}
      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="plan-modal" onClick={(event) => event.stopPropagation()}>
            <div className="logo-dot" />
            <h2>Request QueueSense access</h2>
            {registerDone ? (
              <>
                <p className="subtitle">
                  Registration successful. The team will reach out to {registerForm.email} to prepare your personalized sandbox. We can’t wait to
                  optimize your queues.
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    setRegisterDone(false);
                    setRegisterForm({ name: '', org: '', email: '' });
                    setShowRegister(false);
                  }}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <p className="subtitle">Tell us who you are and how QueueSense can help your pilots.</p>
                <form
                  className="plan-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setRegisterDone(true);
                  }}
                >
                  <label>
                    Name
                    <input value={registerForm.name} onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))} required />
                  </label>
                  <label>
                    Organization
                    <input value={registerForm.org} onChange={(event) => setRegisterForm((prev) => ({ ...prev, org: event.target.value }))} required />
                  </label>
                  <label>
                    Email
                    <input type="email" value={registerForm.email} onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))} required />
                  </label>
                  <button className="primary" type="submit">
                    Submit registration
                  </button>
                </form>
              </>
            )}
            <button className="ghost full-width" onClick={() => setShowRegister(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <Toast message={error} visible={Boolean(error)} />
    </div>
  );
};
