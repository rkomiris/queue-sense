import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { systemContent } from '../data/mockWaitTimes';

export const SystemDiagramScreen = () => {
  const { user } = useAuth();
  const variant = user?.role === 'org-admin' ? 'admin' : 'consumer';
  const content = systemContent[variant];

  return (
    <section className="page-grid system-page">
      <PageHeader title="How QueueSense works" subtitle="Live experience architecture" />

      <section className="system-overview">
        <article className="system-intro-card">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h2>{content.hero.title}</h2>
          <p>{content.hero.body}</p>
          <ul>
            {content.hero.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="system-intro-actions">
            <button className="primary" onClick={() => document.getElementById('system-stack')?.scrollIntoView({ behavior: 'smooth' })}>
              {content.hero.primaryLabel}
            </button>
            <button className="ghost" onClick={() => window.open('/predict-wait-times.pptx', '_blank')}>
              {content.hero.secondaryLabel}
            </button>
          </div>
        </article>
        <div className="system-telemetry">
          {content.telemetry.map((tile) => (
            <article key={tile.id} className="telemetry-card">
              <span className="telemetry-label">{tile.label}</span>
              <strong>{tile.value}</strong>
              <p>{tile.detail}</p>
              <span className="telemetry-trend">{tile.trend}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="system-stack" id="system-stack">
        <header className="system-stack-header">
          <div>
            <p className="eyebrow">Experience stack</p>
            <h3>Blueprint from signal capture to visitor delight</h3>
            <p>Each lane is orchestrated and observable, so teams can trust what the AI is doing under the hood.</p>
          </div>
          <span className="stack-meta">
            {variant === 'admin' ? 'Designed for healthcare, government, and campus networks.' : 'Built for visitors across clinics, DMVs, and campuses.'}
          </span>
        </header>
        <div className="system-grid">
          {content.blueprint.map((layer, index) => (
            <article key={layer.id} className="system-card blueprint-card fade-in">
              <div className="layer-heading">
                <span>Layer {index + 1}</span>
                <div className="metric-chip">
                  <small>{layer.metric.label}</small>
                  <strong>{layer.metric.value}</strong>
                </div>
              </div>
              <h3>{layer.title}</h3>
              <p>{layer.description}</p>
              <ul>
                {layer.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="system-streams">
        <header className="system-stack-header">
          <div>
            <p className="eyebrow">Live orchestration</p>
            <h3>{variant === 'admin' ? 'Every stream is monitored so ops teams stay confident' : 'Streams keep you updated without extra taps'}</h3>
            <p>
              {variant === 'admin'
                ? 'Ops leads see health, momentum, and upcoming actions without scanning another dashboard.'
                : 'Fresh updates land where you are, while staff use the same telemetry to keep promises.'}
            </p>
          </div>
        </header>
        <div className="system-stream-grid">
          {content.streams.map((stream) => (
            <article key={stream.id} className="stream-card">
              <div className="stream-meta">
                <span>{stream.status}</span>
                <strong>{stream.title}</strong>
              </div>
              <p>{stream.detail}</p>
              <span className="stream-metric">{stream.metric}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};
