import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, X, PencilLine } from 'lucide-react';
import { Event, TimeSlot } from '../../types/event';
import { useEventStore } from '../../store/eventStore';
import { useProfileStore } from '../../store/profileStore';
import { CancellationDialog } from '../dialogs/CancellationDialog';

interface BookedEventsListProps {
  bookings: Array<{
    event: Event;
    slot: TimeSlot;
  }>;
}

export function BookedEventsList({ bookings }: BookedEventsListProps) {
  const { profile } = useProfileStore();
  const [showReschedule, setShowReschedule] = useState<string | null>(null);
  const [cancellationEvent, setCancellationEvent] = useState<{ event: Event; slot: TimeSlot } | null>(null);

  const handleCancelConfirm = () => {
    if (!profile || !cancellationEvent) return;
    
    const { event, slot } = cancellationEvent;
    const updatedAttendees = slot.attendees.filter(a => a.email !== profile.email);
    const updatedSlot = { ...slot, attendees: updatedAttendees };
    useEventStore.getState().updateTimeSlot(event.id, updatedSlot);
    setCancellationEvent(null);
  };

  const handleReschedule = (event: Event, currentSlot: TimeSlot, newSlotId: string) => {
    if (!profile) return;

    const newSlot = event.timeSlots.find(s => s.id === newSlotId);
    if (!newSlot) return;

    const attendee = currentSlot.attendees.find(a => a.email === profile.email);
    if (!attendee) return;

    // Remove from current slot
    const updatedCurrentSlot = {
      ...currentSlot,
      attendees: currentSlot.attendees.filter(a => a.email !== profile.email)
    };
    useEventStore.getState().updateTimeSlot(event.id, updatedCurrentSlot);

    // Add to new slot
    const updatedNewSlot = {
      ...newSlot,
      attendees: [...newSlot.attendees, attendee]
    };
    useEventStore.getState().updateTimeSlot(event.id, updatedNewSlot);

    setShowReschedule(null);
  };

  return (
    <>
      <div className="space-y-4">
        {bookings.map(({ event, slot }) => (
          <div key={`${event.id}-${slot.id}`} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{event.title}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(event.date, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{slot.location || event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReschedule(slot.id)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                  title="Reschedule"
                >
                  <PencilLine size={20} />
                </button>
                <button
                  onClick={() => setCancellationEvent({ event, slot })}
                  className="text-red-600 hover:text-red-800 p-2"
                  title="Cancel"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {showReschedule === slot.id && (
              <div className="mt-4 border-t pt-4">
                <h5 className="text-sm font-medium mb-2">Select New Time Slot</h5>
                <div className="space-y-2">
                  {event.timeSlots
                    .filter(s => s.id !== slot.id && s.attendees.length < s.capacity)
                    .map(newSlot => (
                      <button
                        key={newSlot.id}
                        onClick={() => handleReschedule(event, slot, newSlot.id)}
                        className="w-full text-left p-2 rounded hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span>
                          {format(newSlot.startTime, 'h:mm a')} - {format(newSlot.endTime, 'h:mm a')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {newSlot.capacity - newSlot.attendees.length} spots left
                        </span>
                      </button>
                    ))}
                </div>
                <button
                  onClick={() => setShowReschedule(null)}
                  className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {cancellationEvent && (
        <CancellationDialog
          event={cancellationEvent.event}
          slot={cancellationEvent.slot}
          onConfirm={handleCancelConfirm}
          onCancel={() => setCancellationEvent(null)}
        />
      )}
    </>
  );
}