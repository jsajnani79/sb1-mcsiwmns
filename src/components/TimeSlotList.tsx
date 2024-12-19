import React from 'react';
import { format } from 'date-fns';
import { Event, TimeSlot } from '../types/event';
import { MapPin, Link } from 'lucide-react';
import { useLocationStore } from '../store/locationStore';

interface TimeSlotListProps {
  event: Event;
  onBookSlot: (eventId: string, slot: TimeSlot) => void;
}

export function TimeSlotList({ event, onBookSlot }: TimeSlotListProps) {
  const locations = useLocationStore(state => state.locations);
  const locationDetails = locations.find(loc => loc.name === event.location);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">{event.location}</h3>
            {locationDetails?.googleMapsUrl && (
              <a
                href={locationDetails.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 mt-1"
              >
                <Link size={14} />
                <span className="text-sm">Open in Google Maps</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
      {event.timeSlots.map((slot) => (
        <TimeSlotItem
          key={slot.id}
          slot={slot}
          onBook={() => onBookSlot(event.id, slot)}
        />
      ))}
    </div>
  );
}

interface TimeSlotItemProps {
  slot: TimeSlot;
  onBook: () => void;
}

function TimeSlotItem({ slot, onBook }: TimeSlotItemProps) {
  const spotsLeft = slot.capacity - slot.attendees.length;
  
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <p className="font-medium">
          {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
        </p>
        <p className="text-sm text-gray-500">
          {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} remaining
        </p>
      </div>
      <button
        onClick={onBook}
        disabled={spotsLeft === 0}
        className={`px-4 py-2 rounded-md ${
          spotsLeft === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {spotsLeft === 0 ? 'Full' : 'Book Slot'}
      </button>
    </div>
  );
}