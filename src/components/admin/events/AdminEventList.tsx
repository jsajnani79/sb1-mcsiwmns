import React, { useState } from 'react';
import { Edit2, Trash2, Users } from 'lucide-react';
import { Event } from '../../../types/event';
import { format } from 'date-fns';
import { EventDetails } from './EventDetails';
import { EventForm } from './EventForm';

interface AdminEventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export function AdminEventList({ events, onEdit, onDelete }: AdminEventListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowEditForm(true);
  };

  const handleEditSubmit = (updatedEvent: Event) => {
    onEdit(updatedEvent);
    setShowEditForm(false);
    setEditingEvent(null);
  };

  if (showEditForm && editingEvent) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <button
            onClick={() => setShowEditForm(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
        <EventForm
          initialEvent={editingEvent}
          onSubmit={handleEditSubmit}
        />
      </div>
    );
  }

  if (selectedEvent) {
    return (
      <EventDetails
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
              <div className="mt-1 text-sm text-gray-500">
                <p>{format(event.date, 'MMMM d, yyyy')}</p>
                <p>{event.location}</p>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span>{event.timeSlots.length} time slots</span>
                <span>•</span>
                <span>
                  {event.timeSlots.reduce((sum, slot) => sum + slot.capacity, 0)} total capacity
                </span>
                <span>•</span>
                <span>
                  Default incentive: {event.defaultIncentiveType.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <button
                onClick={() => setSelectedEvent(event)}
                className="p-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-50"
                title="View Details"
              >
                <Users size={20} />
              </button>
              <button
                onClick={() => handleEdit(event)}
                className="p-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-50"
                title="Edit Event"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this event?')) {
                    onDelete(event.id);
                  }
                }}
                className="p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50"
                title="Delete Event"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}