import { ServiceCard } from '../data/mockWaitTimes';

const formatHour = (hour: number) => {
  const normalized = ((hour % 24) + 24) % 24;
  const suffix = normalized >= 12 ? 'PM' : 'AM';
  const displayHour = normalized % 12 === 0 ? 12 : normalized % 12;
  return `${displayHour} ${suffix}`;
};

export const isOpenNow = (card: ServiceCard) => {
  const { open, close } = card.hours;
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  if (open <= close) {
    return hour >= open && hour < close;
  }
  return hour >= open || hour < close;
};

export const getWaitDisplay = (card: ServiceCard, liveWait?: number) => {
  const open = isOpenNow(card);
  const opensAt = formatHour(card.hours.open);
  if (open) {
    return {
      primary: `${liveWait ?? card.waitTime}`,
      unit: 'min',
      message: card.highlight,
      status: 'open' as const,
      opensAt,
    };
  }
  return {
    primary: 'Closed',
    unit: '',
    message: `Avg ${card.waitTime} min · Opens at ${formatHour(card.hours.open)}`,
    status: 'closed' as const,
    opensAt,
  };
};
