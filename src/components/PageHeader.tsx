import { ReactNode } from 'react';

export const PageHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) => (
  <div className="page-header fade-in">
    <div>
      <p className="eyebrow">LIVE EXPERIENCE</p>
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
    {actions && <div className="actions">{actions}</div>}
  </div>
);
