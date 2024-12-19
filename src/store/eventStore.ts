import { create } from 'zustand';
import { Event, Attendee, TimeSlot, IncentiveStatus, IncentiveType } from '../types/event';
import { mockEvents } from '../data/mockEvents';

interface EventStore {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
  addParticipant: (eventId: string, slotId: string, participant: Attendee) => void;
  updateParticipant: (eventId: string, slotId: string, participant: Attendee) => void;
  updateTimeSlot: (eventId: string, updatedSlot: TimeSlot) => void;
  getBookedEvents: (participantEmail: string) => Array<{event: Event; slot: TimeSlot}>;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: mockEvents,
  
  addEvent: (event) =>
    set((state) => ({ events: [...state.events, event] })),
  
  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  
  deleteEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== eventId),
    })),
  
  addParticipant: (eventId, slotId, participant) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              timeSlots: event.timeSlots.map((slot) =>
                slot.id === slotId
                  ? { ...slot, attendees: [...slot.attendees, participant] }
                  : slot
              ),
            }
          : event
      ),
    })),
  
  updateParticipant: (eventId, slotId, updatedParticipant) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              timeSlots: event.timeSlots.map((slot) =>
                slot.id === slotId
                  ? {
                      ...slot,
                      attendees: slot.attendees.map((a) =>
                        a.id === updatedParticipant.id ? updatedParticipant : a
                      ),
                    }
                  : slot
              ),
            }
          : event
      ),
    })),
  
  updateTimeSlot: (eventId, updatedSlot) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              timeSlots: event.timeSlots.map((slot) =>
                slot.id === updatedSlot.id ? updatedSlot : slot
              ),
            }
          : event
      ),
    })),
  
  getBookedEvents: (participantEmail) => {
    const state = get();
    const bookedEvents: Array<{event: Event; slot: TimeSlot}> = [];
    
    state.events.forEach(event => {
      event.timeSlots.forEach(slot => {
        if (slot.attendees.some(a => a.email === participantEmail)) {
          bookedEvents.push({ event, slot });
        }
      });
    });
    
    return bookedEvents;
  },
}));