import { defaultNetlifyDomain, defaultOrganizations, defaultUsers } from '../data/defaultEnv';

type Role = 'consumer' | 'org-admin';

export type EnvUser = {
  username: string;
  password: string;
  role: Role;
  orgId?: string;
  displayName?: string;
};

export type EnvOrganization = {
  orgId: string;
  displayName: string;
  vertical?: string;
  city?: string;
  contactEmail?: string;
};

const parseJSONEnv = <T>(value: string | undefined, fallback: T): T => {
  if (!value) {
    console.warn('Missing env value. Falling back to defaults.');
    return fallback;
  }
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Unable to parse env JSON', error);
    return fallback;
  }
};

const users = parseJSONEnv<EnvUser[]>(process.env.REACT_APP_USERS, defaultUsers);
const organizations = parseJSONEnv<EnvOrganization[]>(
  process.env.REACT_APP_ORGANIZATIONS,
  defaultOrganizations
);
const netlifySiteUrl = process.env.REACT_APP_NETLIFY_SITE_URL || defaultNetlifyDomain;

export const ENV = {
  users,
  organizations,
  netlifySiteUrl,
};

export const resolveOrganization = (orgId?: string): EnvOrganization | undefined =>
  organizations.find((org) => org.orgId === orgId);
