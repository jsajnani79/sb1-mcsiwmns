import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ParticipantProfile } from '../types/participant';

interface ProfileStore {
  profile: ParticipantProfile | null;
  updateProfile: (profile: ParticipantProfile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      updateProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'participant-profile',
    }
  )
);