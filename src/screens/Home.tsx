import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IconBaseProps } from 'react-icons';
import { FiActivity, FiAward, FiMapPin, FiWatch } from 'react-icons/fi';
import { PageHeader } from '../components/PageHeader';
import { ServiceQuickCard } from '../components/ServiceCard';
import { serviceCards, smartNotifications } from '../data/mockWaitTimes';
import { useState } from 'react';

type IconComponent = (props: IconBaseProps) => ReactElement;

const icons: Record<string, IconComponent> = {
  'urgent-care': FiActivity as IconComponent,
  pharmacy: FiWatch as IconComponent,
  'henniker-clinic': FiActivity as IconComponent,
  'capital-urgent': FiActivity as IconComponent,
  'north-shore-clinic': FiActivity as IconComponent,
  dmv: FiMapPin as IconComponent,
  'concord-dmv': FiMapPin as IconComponent,
  airport: FiMapPin as IconComponent,
  'city-hall': FiMapPin as IconComponent,
  'city-hub-dmv': FiMapPin as IconComponent,
  campus: FiAward as IconComponent,
  'colby-campus': FiAward as IconComponent,
  'ivy-campus': FiAward as IconComponent,
  default: FiActivity as IconComponent,
};

export const HomeDashboard = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const segments = ['all', 'healthcare', 'government', 'campus'];
  const filteredCards = serviceCards.filter((card) => {
    if (filter === 'all') {
      return true;
    }
    return card.category === filter;
  }).filter((card) => card.location.toLowerCase().includes(searchTerm.toLowerCase()) || card.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section className="page-grid">
      <PageHeader title="Real-time wait intelligence" subtitle="Consumer hero view" />
      <div className="filter-row">
        {segments.map((segment) => (
          <button key={segment} className={segment === filter ? 'filter-pill active' : 'filter-pill'} onClick={() => setFilter(segment)}>
            {segment === 'all' ? 'All' : segment.charAt(0).toUpperCase() + segment.slice(1)}
          </button>
        ))}
        <input
          className="filter-search"
          type="search"
          placeholder={`Search ${filter === 'all' ? 'any location' : filter}`}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="grid service-grid">
        {filteredCards.map((card) => {
          const Icon = icons[card.id] || icons.default;
          return (
            <button
              key={card.id}
              type="button"
              className="card-button"
              onClick={() => navigate(`${card.detailRoute}?site=${card.id}`)}
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
