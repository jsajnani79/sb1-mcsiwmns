import React from 'react';
import { format } from 'date-fns';
import { Event } from '../../../types/event';
import { EventAttendanceManager } from './EventAttendanceManager';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

export function EventDetails({ event, onBack }: EventDetailsProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back to Events
      </button>

      <div>
        <h2 className="text-2xl font-bold">{event.title}</h2>
        <p className="text-gray-600 mt-1">{format(event.date, 'MMMM d, yyyy')}</p>
        <p className="text-gray-500 mt-1">Default Incentive: {event.defaultIncentiveType.replace('_', ' ')}</p>
      </div>

      <div className="space-y-6">
        {event.timeSlots.map((slot) => (
          <div key={slot.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <EventAttendanceManager event={event} slot={slot} />
          </div>
        ))}
      </div>
    </div>
  );
}