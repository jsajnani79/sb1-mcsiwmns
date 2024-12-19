import React from 'react';
import { Calendar, Clock, MapPin, X, PencilLine } from 'lucide-react';
import { format } from 'date-fns';
import { Event, TimeSlot, Attendee } from '../../../types/event';
import { useEventStore } from '../../../store/eventStore';

interface BookedEventsSectionProps {
  participantEmail: string;
}

export function BookedEventsSection({ participantEmail }: BookedEventsSectionProps) {
  const { events, updateParticipant } = useEventStore();
  const [showReschedule, setShowReschedule] = React.useState<string | null>(null);

  const bookedEvents = events.reduce<Array<{
    event: Event;
    slot: TimeSlot;
    attendee: Attendee;
  }>>((acc, event) => {
    event.timeSlots.forEach(slot => {
      const attendee = slot.attendees.find(a => a.email === participantEmail);
      if (attendee) {
        acc.push({ event, slot, attendee });
      }
    });
    return acc;
  }, []);

  const handleCancel = (event: Event, slot: TimeSlot, attendee: Attendee) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const updatedAttendees = slot.attendees.filter(a => a.id !== attendee.id);
      const updatedSlot = { ...slot, attendees: updatedAttendees };
      useEventStore.getState().updateTimeSlot(event.id, updatedSlot);
    }
  };

  const handleReschedule = (eventId: string, currentSlotId: string, newSlotId: string, attendee: Attendee) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const currentSlot = event.timeSlots.find(s => s.id === currentSlotId);
    const newSlot = event.timeSlots.find(s => s.id === newSlotId);
    if (!currentSlot || !newSlot) return;

    // Remove from current slot
    const updatedCurrentSlot = {
      ...currentSlot,
      attendees: currentSlot.attendees.filter(a => a.id !== attendee.id)
    };
    useEventStore.getState().updateTimeSlot(eventId, updatedCurrentSlot);

    // Add to new slot
    const updatedNewSlot = {
      ...newSlot,
      attendees: [...newSlot.attendees, attendee]
    };
    useEventStore.getState().updateTimeSlot(eventId, updatedNewSlot);

    setShowReschedule(null);
  };

  if (bookedEvents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">My Bookings</h3>
        </div>
        <p className="text-gray-500 text-center py-4">You haven't booked any events yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">My Bookings</h3>
      </div>

      <div className="space-y-4">
        {bookedEvents.map(({ event, slot, attendee }) => (
          <div key={`${event.id}-${slot.id}`} className="border rounded-lg p-4">
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
                  onClick={() => handleCancel(event, slot, attendee)}
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
                        onClick={() => handleReschedule(event.id, slot.id, newSlot.id, attendee)}
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
    </div>
  );
}