import { ReactNode } from 'react';
import { ServiceCard } from '../data/mockWaitTimes';
import { getWaitDisplay } from '../utils/waitDisplay';

const toneClassMap: Record<ServiceCard['tone'], string> = {
  positive: 'tone-positive',
  neutral: 'tone-neutral',
  warning: 'tone-warning',
};

export const ServiceQuickCard = ({ data, icon }: { data: ServiceCard; icon: ReactNode }) => {
  const wait = getWaitDisplay(data);
  return (
    <article className={`service-card fade-in ${toneClassMap[data.tone]} ${wait.status === 'closed' ? 'service-closed' : ''}`}>
      <header>
        <p className="eyebrow">{data.location}</p>
        <h3>{data.name}</h3>
      </header>
      <div className="metric">
        <span>{wait.primary}</span>
        {wait.unit && <small>{wait.unit}</small>}
      </div>
      <p className="highlight">{wait.message}</p>
      <div className="icon-badge">{icon}</div>
    </article>
  );
};
