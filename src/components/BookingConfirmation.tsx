import React from 'react';
import { Check, Calendar, Clock, MapPin } from 'lucide-react';
import { Event, TimeSlot } from '../types/event';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  event: Event;
  timeSlot: TimeSlot;
  participant: {
    name: string;
    email: string;
  };
  onClose: () => void;
}

export function BookingConfirmation({ event, timeSlot, participant, onClose }: BookingConfirmationProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Thank you for booking, {participant.name}! Your spot has been reserved.
        </p>
      </div>

      <div className="border-t border-b border-gray-200 py-4 my-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{event.title}</h3>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>{format(event.date, 'MMMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>
              {format(timeSlot.startTime, 'h:mm a')} - {format(timeSlot.endTime, 'h:mm a')}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{timeSlot.location || event.location}</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        <p>A confirmation email has been sent to {participant.email}</p>
        <p className="mt-2">
          Please save this information for your records. If you need to make any changes,
          please contact the event organizer.
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Close
      </button>
    </div>
  );
}