import React, { useState } from 'react';
import { Edit2, Trash2, Users } from 'lucide-react';
import { Event } from '../../types/event';
import { format } from 'date-fns';
import { EventDetails } from './EventDetails';

interface AdminEventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export function AdminEventList({ events, onEdit, onDelete }: AdminEventListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="space-y-4">
      {selectedEvent ? (
        <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(null)} />
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-500">
                {format(event.date, 'MMMM d, yyyy')} • {event.location}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {event.timeSlots.length} time slots • Total capacity:{' '}
                {event.timeSlots.reduce((sum, slot) => sum + slot.capacity, 0)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedEvent(event)}
                className="p-2 text-blue-600 hover:text-blue-800"
                title="Manage Attendance"
              >
                <Users size={20} />
              </button>
              <button
                onClick={() => onEdit(event)}
                className="p-2 text-blue-600 hover:text-blue-800"
                title="Edit Event"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="p-2 text-red-600 hover:text-red-800"
                title="Delete Event"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}