import React from 'react';
import { format } from 'date-fns';
import { Event } from '../../types/event';
import { Clock, Mail, User } from 'lucide-react';

interface EventParticipantsProps {
  event: Event;
}

export function EventParticipants({ event }: EventParticipantsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
        <p className="text-gray-500">{format(event.date, 'MMMM d, yyyy')}</p>
      </div>

      {event.timeSlots.map((slot, index) => (
        <div key={slot.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock size={20} />
              {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
            </h3>
            <span className="text-sm text-gray-500">
              {slot.attendees.length} / {slot.capacity} participants
            </span>
          </div>

          {slot.attendees.length > 0 ? (
            <div className="space-y-3">
              {slot.attendees.map((attendee, attendeeIndex) => (
                <div
                  key={attendee.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-2 text-gray-900">
                        <User size={16} />
                        {attendee.name}
                      </span>
                      <span className="flex items-center gap-2 text-gray-500 text-sm">
                        <Mail size={16} />
                        {attendee.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No participants yet</p>
          )}
        </div>
      ))}
    </div>
  );
}