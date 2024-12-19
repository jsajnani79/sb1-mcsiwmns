import React, { useState } from 'react';
import { format } from 'date-fns';
import { Event, Attendee } from '../../types/event';
import { Search, Calendar, Clock } from 'lucide-react';

interface ParticipantListProps {
  events: Event[];
}

export function ParticipantList({ events }: ParticipantListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const now = new Date();
  const filteredEvents = events.filter(event => {
    switch (filter) {
      case 'upcoming':
        return event.date >= now;
      case 'past':
        return event.date < now;
      default:
        return true;
    }
  });

  const allParticipants = filteredEvents.flatMap(event =>
    event.timeSlots.flatMap(slot =>
      slot.attendees.map(attendee => ({
        ...attendee,
        eventTitle: event.title,
        eventDate: event.date,
        slotTime: {
          start: slot.startTime,
          end: slot.endTime
        }
      }))
    )
  ).filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'upcoming', 'past'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option as 'all' | 'upcoming' | 'past')}
              className={`px-4 py-2 rounded-md ${
                filter === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allParticipants.map((participant, index) => (
              <tr key={`${participant.id}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">
                      {participant.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {participant.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{participant.eventTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {format(participant.eventDate, 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {format(participant.slotTime.start, 'h:mm a')} -{' '}
                      {format(participant.slotTime.end, 'h:mm a')}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {allParticipants.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No participants found
          </div>
        )}
      </div>
    </div>
  );
}