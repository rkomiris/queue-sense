export const defaultUsers = [
  {
    username: 'demo@queuesense.com',
    password: 'welcome123',
    role: 'consumer' as const,
  },
  {
    username: 'clinic-admin@queuesense.com',
    password: 'admin123',
    role: 'org-admin' as const,
    orgId: 'clinic-001',
  },
  {
    username: 'dmv-admin@queuesense.com',
    password: 'dmv123',
    role: 'org-admin' as const,
    orgId: 'gov-001',
  },
];

export const defaultOrganizations = [
  {
    orgId: 'clinic-001',
    displayName: 'Green Valley Clinic',
    vertical: 'Healthcare',
    city: 'Austin, TX',
  },
  {
    orgId: 'gov-001',
    displayName: 'State DMV Office',
    vertical: 'Government',
    city: 'Cedar Park, TX',
  },
];

export const defaultNetlifyDomain = 'https://queuesense-demo.netlify.app';
