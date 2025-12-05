import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IconBaseProps } from 'react-icons';
import { FiActivity, FiAward, FiMapPin, FiWatch } from 'react-icons/fi';
import { PageHeader } from '../components/PageHeader';
import { ServiceQuickCard } from '../components/ServiceCard';
import { serviceCards, smartNotifications } from '../data/mockWaitTimes';

type IconComponent = (props: IconBaseProps) => ReactElement;

const icons: Record<string, IconComponent> = {
  'urgent-care': FiActivity as IconComponent,
  pharmacy: FiWatch as IconComponent,
  dmv: FiMapPin as IconComponent,
  campus: FiAward as IconComponent,
  default: FiActivity as IconComponent,
};

export const HomeDashboard = () => {
  const navigate = useNavigate();

  return (
    <section className="page-grid">
      <PageHeader title="Real-time wait intelligence" subtitle="Consumer hero view" />
      <div className="grid service-grid">
        {serviceCards.map((card) => {
          const Icon = icons[card.id] || icons.default;
          return (
            <button
              key={card.id}
              type="button"
              className="card-button"
              onClick={() => navigate(card.detailRoute)}
            >
              <ServiceQuickCard data={card} icon={<Icon />} />
              <span className="cta">View details →</span>
            </button>
          );
        })}
      </div>
      <div className="notification-panel">
        <h3>Smart notifications</h3>
        <div className="notification-list">
          {smartNotifications.map((notification) => (
            <div key={notification.id} className="notification-inline" onClick={() => navigate('/notifications')}>
              <p className="eyebrow">{notification.timestamp}</p>
              <strong>{notification.title}</strong>
              <span>{notification.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
