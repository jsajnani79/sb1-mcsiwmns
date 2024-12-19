import { create } from 'zustand';
import { Lab, LabInfo } from '../types/lab';

interface LabStore {
  labs: Lab[];
  labInfo: LabInfo;
  addLab: (lab: Omit<Lab, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLab: (id: string, updates: Partial<Lab>) => void;
  deleteLab: (id: string) => void;
  updateLabInfo: (info: Partial<LabInfo>) => void;
}

const DEFAULT_LAB_INFO: LabInfo = {
  name: 'Research Lab',
  email: 'research@university.edu',
  phone: '(555) 123-4567',
  address: '123 University Ave, Research City, ST 12345',
  website: 'https://research.university.edu',
  description: 'Advancing knowledge through innovative research',
  hours: [
    'Monday - Friday: 9:00 AM - 5:00 PM',
    'Saturday - Sunday: Closed'
  ]
};

export const useLabStore = create<LabStore>((set) => ({
  labs: [],
  labInfo: DEFAULT_LAB_INFO,
  
  addLab: (lab) => set((state) => ({
    labs: [...state.labs, {
      ...lab,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  })),
  
  updateLab: (id, updates) => set((state) => ({
    labs: state.labs.map((lab) =>
      lab.id === id
        ? { ...lab, ...updates, updatedAt: new Date() }
        : lab
    )
  })),
  
  deleteLab: (id) => set((state) => ({
    labs: state.labs.filter((lab) => lab.id !== id)
  })),
  
  updateLabInfo: (info) => set((state) => ({
    labInfo: { ...state.labInfo, ...info }
  })),
}));