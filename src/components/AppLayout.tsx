import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navByRole: Record<'consumer' | 'org-admin', Array<{ label: string; to: string }>> = {
  consumer: [
    { label: 'Home', to: '/home' },
    { label: 'Notifications', to: '/notifications' },
    { label: 'Clinic', to: '/clinic' },
    { label: 'DMV', to: '/dmv' },
    { label: 'System', to: '/system' },
    { label: 'Settings', to: '/settings' },
  ],
  'org-admin': [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Notifications', to: '/notifications' },
    { label: 'System', to: '/system' },
    { label: 'Settings', to: '/settings' },
  ],
};

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const links = navByRole[user?.role || 'consumer'];
  const firstName = user?.username?.split('@')[0]?.replace('.', ' ') ?? 'friend';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo-dot" />
          <div>
            <p className="brand-title">QueueSense</p>
            <p className="brand-sub">Predictive wait OS</p>
          </div>
        </div>
        {user && (
          <div className="session-card">
            <p className="eyebrow">Welcome back</p>
            <h4>Hello, {firstName}</h4>
            {user.organizationName && (
              <p className="muted-text">
                {user.organizationName} • {user.role === 'org-admin' ? 'Ops exec' : 'Citizen'}
              </p>
            )}
            <ul>
              <li>Role: {user.role === 'org-admin' ? 'Organization admin' : 'Consumer member'}</li>
              {user.orgId && <li>Org ID: {user.orgId}</li>}
              <li>Session: Live</li>
            </ul>
          </div>
        )}
        <nav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
      </aside>
      <main className="content" data-path={location.pathname}>
        <Outlet />
      </main>
    </div>
  );
};
