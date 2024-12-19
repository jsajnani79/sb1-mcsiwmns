import React from 'react';
import { format } from 'date-fns';
import { TimeSlot } from '../../types/study';
import { MapPin } from 'lucide-react';

interface TimeSlotItemProps {
  slot: TimeSlot;
  defaultLocation: string;
  onBook: () => void;
}

export function TimeSlotItem({ slot, defaultLocation, onBook }: TimeSlotItemProps) {
  const spotsLeft = slot.capacity - slot.attendees.length;
  const location = slot.location || defaultLocation;
  
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div>
        <p className="font-medium">
          {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-4 h-4 text-gray-400" />
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <p className="text-sm text-gray-500 mt-1">
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