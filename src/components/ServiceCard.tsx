import { ReactNode } from 'react';
import { ServiceCard } from '../data/mockWaitTimes';

const toneClassMap: Record<ServiceCard['tone'], string> = {
  positive: 'tone-positive',
  neutral: 'tone-neutral',
  warning: 'tone-warning',
};

export const ServiceQuickCard = ({ data, icon }: { data: ServiceCard; icon: ReactNode }) => (
  <article className={`service-card fade-in ${toneClassMap[data.tone]}`}>
    <header>
      <p className="eyebrow">{data.location}</p>
      <h3>{data.name}</h3>
    </header>
    <div className="metric">
      <span>{data.waitTime}</span>
      <small>min</small>
    </div>
    <p className="highlight">{data.highlight}</p>
    <div className="icon-badge">{icon}</div>
  </article>
);
