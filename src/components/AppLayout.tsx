import { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { serviceCards, ServiceCard } from '../data/mockWaitTimes';

const categories: Array<ServiceCard['category']> = ['healthcare', 'government', 'campus'];

const coreNav = [
  { label: 'Home', to: '/home' },
  { label: 'Notifications', to: '/notifications' },
  { label: 'System', to: '/system' },
  { label: 'Settings', to: '/settings' },
];

const adminNav = [{ label: 'Dashboard', to: '/dashboard' }, ...coreNav.filter((item) => item.label !== 'Home')];

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const firstName = user?.username?.split('@')[0]?.replace('.', ' ') ?? 'friend';
  const links = user?.role === 'org-admin' ? adminNav : coreNav;
  const [locationQueries, setLocationQueries] = useState<Record<string, string>>(
    categories.reduce((acc, category) => ({ ...acc, [category]: '' }), {})
  );
  const groupedLocations = useMemo(
    () =>
      categories.map((category) => ({
        category,
        items: serviceCards
          .filter(
            (card) =>
              card.category === category &&
              card.location.toLowerCase().includes(locationQueries[category].toLowerCase())
          )
          .map((card) => ({
            label: card.location,
            wait: card.waitTime,
            to: card.detailRoute,
          })),
          })),
    [locationQueries]
  );

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
          <div className="nav-section">
            <p className="eyebrow">Locations</p>
            {groupedLocations.map((group) => (
              <div key={group.category} className="location-group">
                <div className="location-group-header">
                  <span>{group.category === 'healthcare' ? 'Healthcare' : group.category === 'government' ? 'Government' : 'Campus'}</span>
                  <input
                    className="location-search"
                    type="search"
                    placeholder={`Search ${group.category}`}
                    value={locationQueries[group.category]}
                    onChange={(event) =>
                      setLocationQueries((prev) => ({
                        ...prev,
                        [group.category]: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="location-list">
                  {group.items.map((location) => (
                    <NavLink key={location.label} to={location.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      <div>
                        <span>{location.label}</span>
                        <p>{location.wait} min</p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
