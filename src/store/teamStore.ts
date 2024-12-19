import { create } from 'zustand';
import { TeamMember } from '../types/team';

interface TeamStore {
  members: TeamMember[];
  addMember: (member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;
  getMemberById: (id: string) => TeamMember | undefined;
}

export const useTeamStore = create<TeamStore>((set, get) => ({
  members: [],
  
  addMember: (member) => set((state) => ({
    members: [...state.members, {
      ...member,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
  })),
  
  updateMember: (id, updates) => set((state) => ({
    members: state.members.map((member) =>
      member.id === id
        ? { ...member, ...updates, updatedAt: new Date() }
        : member
    )
  })),
  
  deleteMember: (id) => set((state) => ({
    members: state.members.filter((member) => member.id !== id)
  })),
  
  getMemberById: (id) => get().members.find((member) => member.id === id),
}));