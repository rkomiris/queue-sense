import { HeatmapRow } from '../data/mockWaitTimes';

const shades = ['#E8EEF5', '#D7E2F7', '#B9CEF4', '#8BB2F0', '#5F95E8', '#3C7CE5'];

export const HeatmapGrid = ({ rows }: { rows: HeatmapRow[] }) => (
  <div className="heatmap">
    {rows.map((row) => (
      <div key={row.label} className="heatmap-row">
        <span>{row.label}</span>
        <div>
          {row.slots.map((value, idx) => (
            <span
              key={`${row.label}-${idx}`}
              style={{
                background: shades[Math.min(shades.length - 1, Math.max(0, value))],
              }}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);
