import { useState } from 'react';
import { Event, TimeSlot, IncentiveType, IncentiveStatus } from '../types/event';
import { useEventStore } from '../store/eventStore';
import { useProfileStore } from '../store/profileStore';

export function useEventManagement() {
  const profile = useProfileStore(state => state.profile);
  const { events, addParticipant } = useEventStore();
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const bookedEvents = profile ? 
    useEventStore(state => state.getBookedEvents(profile.email)) : 
    [];

  const availableEvents = events.filter(event => {
    return !bookedEvents.some(booking => booking.event.id === event.id);
  });

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setShowBookingForm(false);
    setShowConfirmation(false);
  };

  const handleBookSlot = (eventId: string, slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
    setShowConfirmation(false);
  };

  const handleBookingSubmit = () => {
    if (!profile || !selectedEvent || !selectedSlot) return;
    
    const participant = {
      id: crypto.randomUUID(),
      name: profile.name,
      email: profile.email,
      incentiveType: selectedEvent.defaultIncentiveType,
      incentiveStatus: IncentiveStatus.PENDING,
      attended: false
    };
    
    addParticipant(selectedEvent.id, selectedSlot.id, participant);
    setShowBookingForm(false);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };

  return {
    profile,
    selectedEvent,
    selectedSlot,
    showBookingForm,
    showConfirmation,
    bookedEvents,
    availableEvents,
    handleEventSelect,
    handleBookSlot,
    handleBookingSubmit,
    handleConfirmationClose,
    setSelectedEvent,
    setShowBookingForm
  };
}