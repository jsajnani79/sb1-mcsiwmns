import React from 'react';
import { Event } from '../../../types/event';

interface EventSlotSelectorProps {
  events: Event[];
  selectedEventId: string;
  selectedSlotId: string;
  onEventChange: (eventId: string) => void;
  onSlotChange: (slotId: string) => void;
}

export function EventSlotSelector({
  events,
  selectedEventId,
  selectedSlotId,
  onEventChange,
  onSlotChange,
}: EventSlotSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Event and Time Slot
      </label>
      <div className="grid grid-cols-2 gap-4">
        <select
          value={selectedEventId}
          onChange={(e) => onEventChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>
        <select
          value={selectedSlotId}
          onChange={(e) => onSlotChange(e.target.value)}
          disabled={!selectedEventId}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Time Slot</option>
          {selectedEventId &&
            events
              .find((e) => e.id === selectedEventId)
              ?.timeSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {new Date(slot.startTime).toLocaleTimeString()} -{' '}
                  {new Date(slot.endTime).toLocaleTimeString()}
                </option>
              ))}
        </select>
      </div>
    </div>
  );
}