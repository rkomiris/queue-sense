import { PageHeader } from '../components/PageHeader';
import { NotificationCard } from '../components/NotificationCard';
import { smartNotifications } from '../data/mockWaitTimes';

export const NotificationsScreen = () => (
  <section className="page-grid">
    <PageHeader title="Smart notifications" subtitle="Always-on signal" />
    <div className="notifications-stack">
      {smartNotifications.map((notification, index) => (
        <div key={notification.id} style={{ animationDelay: `${index * 0.05}s` }}>
          <NotificationCard notification={notification} />
        </div>
      ))}
    </div>
  </section>
);
