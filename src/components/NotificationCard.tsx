import { NotificationItem } from '../data/mockWaitTimes';

export const NotificationCard = ({ notification }: { notification: NotificationItem }) => (
  <div className={`notification-card fade-in emphasis-${notification.emphasis}`}>
    <div>
      <p className="timestamp">{notification.timestamp}</p>
      <h3>{notification.title}</h3>
      <p>{notification.detail}</p>
    </div>
    <span className="chip">Live</span>
  </div>
);
