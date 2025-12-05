import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { resolveOrganization } from '../utils/env';

export const SettingsScreen = () => {
  const { user, logout } = useAuth();
  const org = resolveOrganization(user?.orgId);

  return (
    <section className="page-grid">
      <PageHeader title="Settings" subtitle="Personalize your space" />
      <div className="settings-card fade-in">
        <h3>Profile</h3>
        <p>{user?.username}</p>
        <p>{user?.role === 'org-admin' ? 'Organization admin' : 'Consumer'}</p>
      </div>
      <div className="settings-card fade-in">
        <h3>Organization</h3>
        <p>{user?.organizationName || 'N/A'}</p>
        {org && (
          <>
            <p>{org.vertical}</p>
            <p>{org.city}</p>
          </>
        )}
      </div>
      <div className="settings-card fade-in">
        <h3>Experience presets</h3>
        <p>Landing view: {user?.role === 'org-admin' ? 'Business dashboard' : 'Consumer home'}</p>
        <p>Alerts mode: Always-on nudges</p>
      </div>
      <div className="settings-card fade-in">
        <h3>Session</h3>
        <p>Need to switch personas? Sign out and use another credential.</p>
        <button onClick={logout}>Log out</button>
      </div>
    </section>
  );
};
