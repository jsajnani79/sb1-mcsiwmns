import React from 'react';
import { MapPin, Trash2 } from 'lucide-react';
import { TimeSlot } from '../../../types/study';
import { format } from 'date-fns';

interface TimeSlotEditorProps {
  slots: Omit<TimeSlot, 'id'>[];
  defaultLocation: string;
  onUpdate: (slots: Omit<TimeSlot, 'id'>[]) => void;
}

export function TimeSlotEditor({ slots, defaultLocation, onUpdate }: TimeSlotEditorProps) {
  const updateSlot = (index: number, updates: Partial<TimeSlot>) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], ...updates };
    onUpdate(newSlots);
  };

  const removeSlot = (index: number) => {
    onUpdate(slots.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {slots.map((slot, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                value={format(slot.startTime, 'HH:mm')}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const newDate = new Date(slot.startTime);
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  updateSlot(index, { startTime: newDate });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                value={format(slot.endTime, 'HH:mm')}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const newDate = new Date(slot.endTime);
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  updateSlot(index, { endTime: newDate });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                type="number"
                min="1"
                value={slot.capacity}
                onChange={(e) => updateSlot(index, { capacity: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  Location
                </span>
              </label>
              <input
                type="text"
                value={slot.location || defaultLocation}
                onChange={(e) => updateSlot(index, { location: e.target.value })}
                placeholder={defaultLocation}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeSlot(index)}
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
            >
              <Trash2 size={16} />
              Remove Slot
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}