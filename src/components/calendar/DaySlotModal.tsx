import React from 'react';
import { format } from 'date-fns';
import { TimeSlot } from '../../types/study';
import { X, Clock } from 'lucide-react';

interface DaySlotModalProps {
  date: Date;
  slots: TimeSlot[];
  onSelect: (slot: TimeSlot) => void;
  onClose: () => void;
}

export function DaySlotModal({ date, slots, onSelect, onClose }: DaySlotModalProps) {
  const availableSlots = slots.filter(slot => slot.attendees.length < slot.capacity);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            Available Times for {format(date, 'MMMM d, yyyy')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {availableSlots.length > 0 ? (
            <div className="space-y-2">
              {availableSlots.map((slot) => {
                const remainingSpots = slot.capacity - slot.attendees.length;
                
                return (
                  <button
                    key={slot.id}
                    onClick={() => {
                      onSelect(slot);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">
                        {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {remainingSpots} spot{remainingSpots !== 1 ? 's' : ''} left
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No available time slots for this date
            </p>
          )}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}