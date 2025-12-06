import { TimelineSlot } from '../data/mockWaitTimes';

export const TimelineRibbon = ({ timeline }: { timeline: TimelineSlot[] }) => (
  <div className="timeline-ribbon">
    {timeline.map((slot) => (
      <div key={slot.slot} className={`timeline-slot ${slot.status}`}>
        <p>{slot.slot}</p>
        <span>{slot.message}</span>
      </div>
    ))}
  </div>
);
