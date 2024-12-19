import React from 'react';
import { Check, Calendar, Clock, MapPin, Mail } from 'lucide-react';
import { Study, TimeSlot } from '../../types/study';
import { format } from 'date-fns';

interface BookingSuccessDialogProps {
  study: Study;
  slot: TimeSlot;
  participant: {
    name: string;
    email: string;
  };
  onClose: () => void;
}

export function BookingSuccessDialog({
  study,
  slot,
  participant,
  onClose
}: BookingSuccessDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">
              Thank you for signing up, {participant.name}! Your spot has been reserved.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{study.title}</h3>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{format(study.date, 'MMMM d, yyyy')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>
                  {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{slot.location || study.location}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              <p>A confirmation email has been sent to {participant.email}</p>
            </div>
            <p>
              Please save this information for your records. If you need to make any changes,
              you can do so from your profile page.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}