import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react';
import { ServiceCard } from '../data/mockWaitTimes';

export type LocationContextValue = {
  selectedLocation: ServiceCard | null;
  availableLocations: ServiceCard[];
  setSelectedLocationId: Dispatch<SetStateAction<string | null>>;
};

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export const LocationProvider = ({ value, children }: { value: LocationContextValue; children: ReactNode }) => (
  <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
);

export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return ctx;
};
