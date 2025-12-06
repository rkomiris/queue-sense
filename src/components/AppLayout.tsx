import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { serviceCards, ServiceCard } from '../data/mockWaitTimes';
import { LocationProvider } from '../context/LocationContext';
import { resolveOrganization } from '../utils/env';
import heroIcon from '../assets/icon.jpg';

const categoryLabels: Record<ServiceCard['category'], string> = {
  healthcare: 'Healthcare',
  government: 'Government',
  campus: 'Campus',
};

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
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState('');
  const accessibleCards = useMemo(() => {
    if (user?.role !== 'org-admin') {
      return serviceCards;
    }
    const orgCategory = resolveOrganization(user.orgId)?.vertical?.toLowerCase() as ServiceCard['category'] | undefined;
    if (!orgCategory) {
      return serviceCards;
    }
    return serviceCards.filter((card) => card.category === orgCategory);
  }, [user]);
  const selectedLocation = useMemo(
    () => accessibleCards.find((card) => card.id === selectedLocationId) ?? null,
    [accessibleCards, selectedLocationId]
  );
  useEffect(() => {
    if (selectedLocationId && !selectedLocation) {
      setSelectedLocationId(null);
    }
  }, [selectedLocation, selectedLocationId]);
  const filteredLocations = useMemo(
    () =>
      accessibleCards
        .filter((card) => card.location.toLowerCase().includes(locationQuery.toLowerCase()))
        .map((card) => ({
          id: card.id,
          label: card.location,
          wait: card.waitTime,
          to: card.detailRoute,
          categoryLabel: categoryLabels[card.category],
          detailPath: `${card.detailRoute}?site=${card.id}`,
        })),
    [accessibleCards, locationQuery]
  );
  const showLocationList = user?.role !== 'org-admin';

  return (
    <LocationProvider value={{ selectedLocation, setSelectedLocationId, availableLocations: accessibleCards }}>
      <div className="app-shell">
        <aside className="sidebar">
        <div className="brand">
          <img src={heroIcon} alt="QueueSense logo" className="brand-logo" />
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
          {showLocationList && (
            <div className="nav-section">
              <p className="eyebrow">Locations</p>
              <div className="location-group">
                <div className="location-group-header">
                  <span>All locations</span>
                  <input
                    className="location-search"
                    type="search"
                    placeholder="Search locations"
                    value={locationQuery}
                    onChange={(event) => setLocationQuery(event.target.value)}
                  />
                </div>
                <div className="location-list">
                  {filteredLocations.map((location) => (
                    <NavLink key={location.id} to={location.detailPath} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                      <div>
                        <span>{location.label}</span>
                        <p>
                          {location.wait} min · {location.categoryLabel}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
          <button className="logout-btn" onClick={logout}>
            Log out
          </button>
        </aside>
        <main className="content" data-path={location.pathname}>
          <Outlet />
        </main>
      </div>
    </LocationProvider>
  );
};
