import React from 'react';
import { EventCard } from '../EventCard';
import { TimeSlotList } from '../TimeSlotList';
import { BookingForm } from '../BookingForm';
import { BookingConfirmation } from '../BookingConfirmation';
import { BookedEventsList } from './BookedEventsList';
import { useEventManagement } from '../../hooks/useEventManagement';

export function EventsView() {
  const {
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
  } = useEventManagement();

  if (!selectedEvent) {
    return (
      <div className="space-y-8">
        {bookedEvents.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Booked Events</h2>
            <BookedEventsList bookings={bookedEvents} />
          </div>
        )}
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={handleEventSelect}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => handleEventSelect(null)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back to Events
      </button>
      
      <EventCard event={selectedEvent} onSelect={() => {}} />
      
      <div className="mt-8">
        {!showBookingForm && !showConfirmation ? (
          <TimeSlotList
            event={selectedEvent}
            onBookSlot={(_, slot) => handleBookSlot(selectedEvent.id, slot)}
          />
        ) : showBookingForm ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <BookingForm
              onSubmit={handleBookingSubmit}
              onCancel={() => handleEventSelect(null)}
              profile={profile}
            />
          </div>
        ) : showConfirmation && selectedSlot && profile ? (
          <BookingConfirmation
            event={selectedEvent}
            timeSlot={selectedSlot}
            participant={profile}
            onClose={handleConfirmationClose}
          />
        ) : null}
      </div>
    </div>
  );
}