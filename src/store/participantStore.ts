import { create } from 'zustand';
import { AdminParticipant, ParticipantStudyAssignment } from '../types/participant';
import { IncentiveType } from '../types/study';

interface ParticipantStore {
  participants: AdminParticipant[];
  assignments: ParticipantStudyAssignment[];
  addParticipant: (participant: Omit<AdminParticipant, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateParticipant: (id: string, updates: Partial<AdminParticipant>) => void;
  deleteParticipant: (id: string) => void;
  assignToStudy: (assignment: Omit<ParticipantStudyAssignment, 'assignedAt'>) => void;
  removeFromStudy: (participantId: string, studyId: string, slotId: string) => void;
  getParticipantStudies: (participantId: string) => ParticipantStudyAssignment[];
}

export const useParticipantStore = create<ParticipantStore>((set, get) => ({
  participants: [],
  assignments: [],

  addParticipant: (participant) => set((state) => ({
    participants: [...state.participants, {
      ...participant,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  })),

  updateParticipant: (id, updates) => set((state) => ({
    participants: state.participants.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
    )
  })),

  deleteParticipant: (id) => set((state) => ({
    participants: state.participants.filter((p) => p.id !== id),
    // Also remove all study assignments for this participant
    assignments: state.assignments.filter((a) => a.participantId !== id)
  })),

  assignToStudy: (assignment) => set((state) => ({
    assignments: [...state.assignments, { 
      ...assignment,
      assignedAt: new Date()
    }]
  })),

  removeFromStudy: (participantId, studyId, slotId) => set((state) => ({
    assignments: state.assignments.filter(
      (a) => !(a.participantId === participantId && a.studyId === studyId && a.slotId === slotId)
    )
  })),

  getParticipantStudies: (participantId) => {
    return get().assignments.filter(a => a.participantId === participantId);
  }
}));