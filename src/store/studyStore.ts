import { create } from 'zustand';
import { Study, TimeSlot, Participant } from '../types/study';
import { mockStudies } from '../data/mockStudies';

interface StudyState {
  studies: Study[];
}

interface StudyActions {
  addStudy: (study: Study) => void;
  updateStudy: (study: Study) => void;
  deleteStudy: (studyId: string) => void;
  addParticipant: (studyId: string, slotId: string, participant: Participant) => void;
  updateParticipant: (studyId: string, slotId: string, participant: Participant) => void;
  updateTimeSlot: (studyId: string, slot: TimeSlot) => void;
  getBookedStudies: (participantEmail: string) => Array<{study: Study; slot: TimeSlot}>;
}

export const useStudyStore = create<StudyState & StudyActions>((set, get) => ({
  studies: mockStudies,

  addStudy: (study) => {
    set((state) => ({
      studies: [...state.studies, study]
    }));
  },

  updateStudy: (study) => {
    set((state) => ({
      studies: state.studies.map((s) => 
        s.id === study.id ? study : s
      )
    }));
  },

  deleteStudy: (studyId) => {
    set((state) => ({
      studies: state.studies.filter((s) => s.id !== studyId)
    }));
  },

  addParticipant: (studyId, slotId, participant) => {
    set((state) => ({
      studies: state.studies.map((study) =>
        study.id === studyId ? {
          ...study,
          timeSlots: study.timeSlots.map((slot) =>
            slot.id === slotId ? {
              ...slot,
              attendees: [...slot.attendees, participant]
            } : slot
          )
        } : study
      )
    }));
  },

  updateParticipant: (studyId, slotId, participant) => {
    set((state) => ({
      studies: state.studies.map((study) =>
        study.id === studyId ? {
          ...study,
          timeSlots: study.timeSlots.map((slot) =>
            slot.id === slotId ? {
              ...slot,
              attendees: slot.attendees.map((a) =>
                a.id === participant.id ? participant : a
              )
            } : slot
          )
        } : study
      )
    }));
  },

  updateTimeSlot: (studyId, slot) => {
    set((state) => ({
      studies: state.studies.map((study) =>
        study.id === studyId ? {
          ...study,
          timeSlots: study.timeSlots.map((s) =>
            s.id === slot.id ? slot : s
          )
        } : study
      )
    }));
  },

  getBookedStudies: (participantEmail) => {
    const state = get();
    return state.studies.reduce<Array<{study: Study; slot: TimeSlot}>>((acc, study) => {
      study.timeSlots.forEach(slot => {
        if (slot.attendees.some(a => a.email === participantEmail)) {
          acc.push({ study, slot });
        }
      });
      return acc;
    }, []);
  }
}));