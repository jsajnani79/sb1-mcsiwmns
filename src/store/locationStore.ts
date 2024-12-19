import { create } from 'zustand';
import { Location } from '../types/location';

interface LocationStore {
  locations: Location[];
  addLocation: (location: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLocation: (id: string, updates: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [{
    id: 'online',
    name: 'Online',
    createdAt: new Date(),
    updatedAt: new Date(),
  }],
  
  addLocation: (location) => set((state) => ({
    locations: [...state.locations, {
      ...location,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
  })),
  
  updateLocation: (id, updates) => set((state) => ({
    locations: state.locations.map((location) =>
      location.id === id
        ? { ...location, ...updates, updatedAt: new Date() }
        : location
    )
  })),
  
  deleteLocation: (id) => set((state) => ({
    locations: state.locations.filter((location) => location.id !== id)
  })),
}));