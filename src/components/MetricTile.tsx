export const MetricTile = ({ label, value, unit, trend }: { label: string; value: number; unit?: string; trend: string }) => (
  <div className="metric-tile fade-in">
    <p className="eyebrow">{label}</p>
    <div className="metric-value">
      <strong>{typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(0)}%` : value}</strong>
      {unit && <span className="unit">{unit}</span>}
    </div>
    <p className="metric-trend">{trend}</p>
  </div>
);
