import { PageHeader } from '../components/PageHeader';
import { systemDiagram } from '../data/mockWaitTimes';

export const SystemDiagramScreen = () => (
  <section className="page-grid">
    <PageHeader title="How QueueSense works" subtitle="System diagram" />
    <div className="system-flow">
      {systemDiagram.map((segment) => (
        <div key={segment.id} className="system-card fade-in">
          <h3>{segment.title}</h3>
          <ul>
            {segment.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
