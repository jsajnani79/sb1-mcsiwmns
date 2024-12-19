import React from 'react';
import { format } from 'date-fns';
import { TimeSlot } from '../../types/study';

interface DaySlotsProps {
  slots: TimeSlot[];
  onSelect: (slot: TimeSlot) => void;
}

export function DaySlots({ slots, onSelect }: DaySlotsProps) {
  return (
    <div className="space-y-1">
      {slots.map((slot) => {
        const available = slot.attendees.length < slot.capacity;
        const remainingSpots = slot.capacity - slot.attendees.length;

        return (
          <button
            key={slot.id}
            onClick={() => available && onSelect(slot)}
            disabled={!available}
            className={`w-full text-left px-2 py-1 rounded text-xs ${
              available
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{format(slot.startTime, 'h:mm a')}</span>
              {available && (
                <span className="text-xs">
                  {remainingSpots} spot{remainingSpots !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}