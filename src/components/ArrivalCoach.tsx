import { ReactNode } from 'react';
import { ServiceCard, ArrivalCoachProfile } from '../data/mockWaitTimes';
import { TimelineRibbon } from './TimelineRibbon';

type Intent = 'now' | 'soon' | 'plan';

type ArrivalCoachProps = {
  card?: ServiceCard;
  profile?: ArrivalCoachProfile;
  intent: Intent;
  onIntentChange: (intent: Intent) => void;
  autoNudgeEnabled: boolean;
  onToggleAutoNudge: () => void;
  waitStatus?: { status: 'open' | 'closed'; opensAt?: string; primary: string; unit: string; message: string };
};

export const ArrivalCoach = ({
  card,
  profile,
  intent,
  onIntentChange,
  autoNudgeEnabled,
  onToggleAutoNudge,
  waitStatus,
}: ArrivalCoachProps) => {
  if (!profile) {
    return null;
  }
  const intentDescriptions: Record<Intent, ReactNode> = profile.intentCopy;
  const isOpen = waitStatus?.status !== 'closed';
  const headline = isOpen ? profile.headline : `Closed until ${waitStatus?.opensAt ?? 'next window'}`;
  const summary = isOpen ? profile.summary : profile.holdSuggestion ?? 'We will alert you right when doors open.';

  return (
    <section className="arrival-coach card">
      <div className="coach-header">
        <div>
          <p className="eyebrow">Arrival coach</p>
          <h2>{headline}</h2>
          <p className="muted-text">{summary}</p>
        </div>
        <div className="coach-meta">
          <span className="window-chip">{profile.recommendedWindow}</span>
          <label className="switch auto-nudge">
            <input type="checkbox" checked={autoNudgeEnabled} onChange={onToggleAutoNudge} />
            <span />
          </label>
          <p className="muted-text">
            {autoNudgeEnabled ? 'Auto-nudges armed' : isOpen ? 'Tap to auto-alert when wait drops' : 'Tap to alert when we reopen'}
          </p>
        </div>
      </div>
      <div className="coach-intents">
        {(['now', 'soon', 'plan'] as Intent[]).map((value) => (
          <button key={value} type="button" className={value === intent ? 'intent-pill active' : 'intent-pill'} onClick={() => onIntentChange(value)}>
            {value === 'now' ? 'Walk in now' : value === 'soon' ? 'Leave soon' : 'Plan ahead'}
          </button>
        ))}
      </div>
      <div className="intent-description">
        <p>{intentDescriptions[intent]}</p>
        {card && <span className="muted-text">{card.location}</span>}
      </div>
      <TimelineRibbon timeline={profile.timeline} />
    </section>
  );
};
