import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MetricTile } from '../components/MetricTile';
import { PageHeader } from '../components/PageHeader';
import { useLocationContext } from '../context/LocationContext';
import {
  ServiceCard,
  adminInsights,
  adminOverview,
  adminTrend,
  initiativeAttribution,
  locationBenchmarks,
  optimizationLevers,
  profitTimeline,
} from '../data/mockWaitTimes';

type RoiPlan = {
  id: string;
  leverId: string;
  target: 'healthcare' | 'government' | 'campus' | 'any';
  label: string;
  description: string;
  effortHours: number;
  investmentCost: number;
  projectedSavings: number;
  roi: number;
  paybackWeeks: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const buildRoiPlans = (focus?: ServiceCard): RoiPlan[] => {
  const pressure = focus ? focus.waitTime / 30 : 1;
  const stateMultiplier =
    focus?.state === 'rising' ? 1.25 : focus?.state === 'improving' ? 0.9 : 1;
  const target = focus?.category ?? 'any';

  return optimizationLevers
    .filter((lever) => lever.target === 'any' || lever.target === target)
    .slice(0, 3)
    .map((lever) => {
      const projectedSavings = Math.round(lever.projectedSavings * pressure * stateMultiplier);
      const investmentCost = Math.round(lever.investmentCost * (focus ? 1 : 0.95));
      const roi = projectedSavings / investmentCost;
      const paybackWeeks = Math.max(2, Math.round(investmentCost / (projectedSavings / 4)));
      return {
        id: lever.id,
        leverId: lever.id,
        target: lever.target,
        label: lever.label,
        description: lever.description,
        effortHours: lever.investmentHours,
        investmentCost,
        projectedSavings,
        roi,
        paybackWeeks,
      };
    });
};

const defaultDashboard = {
  title: 'Business efficiency',
  subtitle: 'Admin hero dashboard',
  overview: adminOverview,
  trend: adminTrend,
  insights: adminInsights,
  roi: buildRoiPlans(),
};

const buildLocationDashboard = (location: ServiceCard) => {
  const pressureMultiplier = location.waitTime / 40;
  const trendSlope = location.state === 'rising' ? 3 : location.state === 'improving' ? -2 : -1;
  const derivedTrend = adminTrend.map((point, index) => ({
    ...point,
    wait: Math.max(6, Math.round(location.waitTime + (index - 3) * trendSlope)),
  }));
  const statusTag = location.state === 'rising' ? 'Attention required' : location.state === 'improving' ? 'Stabilizing' : 'Balanced';
  const arrivals = Math.max(60, Math.round(location.waitTime * 3.2));
  const utilization = Number((0.64 + pressureMultiplier * 0.12).toFixed(2));
  const abandonment = Number((0.035 + pressureMultiplier * 0.02).toFixed(3));

  return {
    title: `${location.name} operations`,
    subtitle: `${location.location} · ${statusTag}`,
    overview: [
      { label: 'Current wait', value: location.waitTime, unit: 'min', trend: location.highlight },
      { label: 'Predicted arrivals', value: arrivals, unit: 'next 4h', trend: location.state === 'rising' ? '+12% incoming' : '-6% under forecast' },
      { label: 'Staff utilization', value: utilization, unit: 'ratio', trend: location.state === 'rising' ? 'Stretching crew' : 'Balanced' },
      { label: 'Abandonment rate', value: abandonment, trend: location.state === 'rising' ? '↑ 1.2 pts' : 'Holding steady' },
    ],
    trend: derivedTrend,
    insights: [
      {
        id: `${location.id}-ops`,
        title: 'Ops focus',
        detail: location.highlight,
      },
      {
        id: `${location.id}-playbook`,
        title: 'Recommended playbook',
        detail:
          location.state === 'improving'
            ? 'Keep the express triage lane warm; automation already shaved 9 minutes.'
            : 'Spin up the overflow routing playbook and borrow 1 floater for the next wave.',
      },
      {
        id: `${location.id}-engagement`,
        title: 'Engagement pulse',
        detail: `Auto-notifications kept ${Math.round(arrivals * 0.42)} visitors informed before arrival.`,
      },
    ],
    roi: buildRoiPlans(location),
  };
};

export const AdminDashboard = () => {
  const { selectedLocation, setSelectedLocationId, availableLocations } = useLocationContext();
  const dashboard = useMemo(
    () => (selectedLocation ? buildLocationDashboard(selectedLocation) : defaultDashboard),
    [selectedLocation]
  );
  const [activePlanIds, setActivePlanIds] = useState<string[]>(() => dashboard.roi.map((plan) => plan.id));

  useEffect(() => {
    setActivePlanIds(dashboard.roi.map((plan) => plan.id));
  }, [dashboard]);

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLocationId(value || null);
  };
  const togglePlan = (id: string) => {
    setActivePlanIds((prev) => (prev.includes(id) ? prev.filter((planId) => planId !== id) : [...prev, id]));
  };
  const activePlans = dashboard.roi.filter((plan) => activePlanIds.includes(plan.id));
  const focusWeight = selectedLocation ? Math.max(0.8, selectedLocation.waitTime / 32) : 1;
  const cumulativeSavings = activePlans.reduce((sum, plan) => sum + plan.projectedSavings, 0) * focusWeight;
  const cumulativeInvestment = activePlans.reduce((sum, plan) => sum + plan.investmentCost, 0);
  const scenarioROI = cumulativeInvestment ? cumulativeSavings / cumulativeInvestment : 0;
  const scenarioPayback = cumulativeInvestment && cumulativeSavings ? Math.max(2, Math.round(cumulativeInvestment / (cumulativeSavings / 4))) : 0;
  const timelineSeries = useMemo(
    () =>
      profitTimeline.map((point) => ({
        month: point.month,
        baseline: point.baselineCost,
        optimized: point.optimizedCost,
        scenario: Math.max(point.optimizedCost - cumulativeSavings, point.optimizedCost * 0.55),
        investment: point.investments + cumulativeInvestment * 0.15,
      })),
    [cumulativeSavings, cumulativeInvestment]
  );
  const attribution = useMemo(() => {
    const target = selectedLocation?.category;
    return initiativeAttribution.filter((item) => {
      const lever = optimizationLevers.find((lever) => lever.id === item.leverId);
      if (!lever) {
        return false;
      }
      if (!target || lever.target === 'any') {
        return true;
      }
      return lever.target === target;
    });
  }, [selectedLocation]);
  const benchmarks = useMemo(() => {
    const target = selectedLocation?.category;
    return locationBenchmarks.filter((row) => !target || row.category === target);
  }, [selectedLocation]);

  return (
    <section className="page-grid">
      <PageHeader title={dashboard.title} subtitle={dashboard.subtitle} />
      <div className="dashboard-filters">
        <div className="filter-control">
          <label htmlFor="location-filter">Focus location</label>
          <select
            id="location-filter"
            className="filter-select"
            value={selectedLocation?.id ?? ''}
            onChange={handleFilterChange}
          >
            <option value="">All locations</option>
            {availableLocations.map((card) => (
              <option key={card.id} value={card.id}>
                {card.location} • {card.category === 'healthcare' ? 'Healthcare' : card.category === 'government' ? 'Government' : 'Campus'}
              </option>
            ))}
          </select>
        </div>
        {selectedLocation && (
          <button className="clear-filter-btn" onClick={() => setSelectedLocationId(null)}>
            Clear focus
          </button>
        )}
      </div>
      <section className="finops-lab" id="profit-lab">
        <div className="chart-card finops-card">
          <div className="card-header">
            <h3>Profit runway modeling</h3>
            <span>Baseline vs. optimized vs. your scenario</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={timelineSeries}>
              <defs>
                <linearGradient id="baselineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cbd3ff" stopOpacity={0.65} />
                  <stop offset="100%" stopColor="#cbd3ff" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="optimizedFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9ec3ff" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#9ec3ff" stopOpacity={0.08} />
                </linearGradient>
                <linearGradient id="scenarioStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8a63ff" />
                  <stop offset="100%" stopColor="#1f4bff" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca7c3" axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca7c3" axisLine={false} tickLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value as number)}
                labelStyle={{ color: '#0f1728', fontWeight: 600 }}
                contentStyle={{ borderRadius: 16, border: '1px solid #E2E8F6' }}
              />
              <Area type="monotone" dataKey="baseline" stroke="#cbd3ff" fill="url(#baselineFill)" strokeWidth={2} name="Baseline cost" />
              <Area type="monotone" dataKey="optimized" stroke="#9ec3ff" fill="url(#optimizedFill)" strokeWidth={2} name="Optimized plan" />
              <Line
                type="monotone"
                dataKey="scenario"
                stroke="url(#scenarioStroke)"
                strokeWidth={4}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#1f4bff' }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                name="Modeled scenario"
              />
              <Bar
                dataKey="investment"
                fill="rgba(15,23,40,0.35)"
                stroke="rgba(15,23,40,0.55)"
                strokeWidth={1}
                radius={[6, 6, 0, 0]}
                maxBarSize={28}
                name="Investments"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="lever-panel">
          <p className="eyebrow">Scenario levers</p>
          <p className="muted-text">Toggle experiments to watch the runway respond.</p>
          <div className="lever-toggles">
            {dashboard.roi.map((plan) => (
              <button
                type="button"
                key={plan.id}
                className={`lever-toggle ${activePlanIds.includes(plan.id) ? 'active' : ''}`}
                onClick={() => togglePlan(plan.id)}
              >
                <span>{plan.label}</span>
                <small>{plan.roi.toFixed(1)}× ROI</small>
              </button>
            ))}
          </div>
          <div className="finops-summary">
            <div>
              <p className="eyebrow">Modeled savings</p>
              <strong>{formatCurrency(Math.round(cumulativeSavings))}</strong>
            </div>
            <div>
              <p className="eyebrow">New investment</p>
              <strong>{formatCurrency(Math.round(cumulativeInvestment))}</strong>
            </div>
            <div>
              <p className="eyebrow">Scenario ROI</p>
              <strong>{scenarioROI ? `${scenarioROI.toFixed(1)}×` : '—'}</strong>
            </div>
            <div>
              <p className="eyebrow">Payback</p>
              <strong>{scenarioPayback ? `${scenarioPayback} wks` : '—'}</strong>
            </div>
          </div>
        </div>
      </section>
      <div className="grid metric-grid" id="metrics">
        {dashboard.overview.map((metric) => (
          <MetricTile key={metric.label} {...metric} />
        ))}
      </div>
      <div className="chart-card" id="signals">
        <div className="card-header">
          <h3>{selectedLocation ? 'Live wait-time curve' : '12-hour wait-time history'}</h3>
          <span>{selectedLocation ? 'Control tower sync' : 'Predictive smoothing applied'}</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={dashboard.trend}>
            <defs>
              <linearGradient id="waitLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#111826" />
                <stop offset="100%" stopColor="#1f4bff" />
              </linearGradient>
              <linearGradient id="waitFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(31,75,255,0.35)" />
                <stop offset="100%" stopColor="rgba(31,75,255,0.05)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" stroke="#8EA0B8" tickLine={false} axisLine={false} />
            <YAxis stroke="#8EA0B8" axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => `${value} min`}
              labelStyle={{ color: '#0f1728', fontWeight: 600 }}
              contentStyle={{ borderRadius: 16, border: '1px solid #E2E8F6' }}
            />
            <Area type="monotone" dataKey="wait" stroke={undefined} fill="url(#waitFill)" isAnimationActive={false} />
            <Line
              type="monotone"
              dataKey="wait"
              stroke="url(#waitLine)"
              strokeWidth={4}
              dot={{ r: 4, fill: '#fff', stroke: '#1f4bff', strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid insight-grid" id="insights">
        {dashboard.insights.map((insight) => (
          <article key={insight.id} className="insight-card fade-in">
            <p className="eyebrow">Insight</p>
            <h3>{insight.title}</h3>
            <p>{insight.detail}</p>
          </article>
        ))}
      </div>
      <section className="roi-section" id="roi">
        <div className="card-header">
          <h3>Optimization ROI</h3>
          <span>Modeled impact for {selectedLocation ? selectedLocation.location : 'network-wide rollout'}</span>
        </div>
        <div className="roi-grid">
          {dashboard.roi.map((plan) => (
            <article key={plan.id} className="roi-card fade-in">
              <div className="roi-card-header">
                <h4>{plan.label}</h4>
                <span>{plan.roi.toFixed(1)}× ROI</span>
              </div>
              <p>{plan.description}</p>
              <div className="roi-metrics">
                <div>
                  <p className="eyebrow">Effort</p>
                  <strong>{plan.effortHours} hrs</strong>
                </div>
                <div>
                  <p className="eyebrow">Investment</p>
                  <strong>{formatCurrency(plan.investmentCost)}</strong>
                </div>
                <div>
                  <p className="eyebrow">Monthly lift</p>
                  <strong>{formatCurrency(plan.projectedSavings)}</strong>
                </div>
                <div>
                  <p className="eyebrow">Payback</p>
                  <strong>{plan.paybackWeeks} wks</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="attribution-section" id="attribution">
        <div className="card-header">
          <h3>Initiative attribution</h3>
          <span>Where the savings come from</span>
        </div>
        <div className="attribution-grid">
          {attribution.map((item) => (
            <article key={item.leverId} className="attribution-card fade-in">
              <p className="eyebrow">{item.label}</p>
              <h4>{formatCurrency(item.savings)}</h4>
              <p className="muted-text">
                Invested {formatCurrency(item.investment)} • Owners: {item.owners.join(', ')}
              </p>
              <div className="attribution-bar">
                <div style={{ width: `${Math.min(100, (item.savings / (item.investment || 1)) * 6)}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="benchmark-section" id="benchmarks">
        <div className="card-header">
          <h3>Location benchmarks</h3>
          <span>Cost per visit vs throughput & automation</span>
        </div>
        <div className="benchmark-table">
          <div className="benchmark-row header">
            <span>Location</span>
            <span>Cost/visit</span>
            <span>Throughput</span>
            <span>Automation</span>
          </div>
          {benchmarks.map((row) => (
            <div key={row.id} className="benchmark-row">
              <span>{row.label}</span>
              <span>{formatCurrency(row.costPerVisit)}</span>
              <span>{row.throughput}/hr</span>
              <div className="automation-chip">
                <div style={{ width: `${row.automationRate * 100}%` }} />
                <strong>{Math.round(row.automationRate * 100)}%</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
