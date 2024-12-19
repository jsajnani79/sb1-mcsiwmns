import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { TimeSlot } from '../../../types/study';
import { generateTimeSlots } from '../../../utils/timeSlotGenerator';

interface TimeSlotGeneratorProps {
  defaultLocation: string;
  onGenerate: (slots: Omit<TimeSlot, 'id'>[]) => void;
}

export function TimeSlotGenerator({ defaultLocation, onGenerate }: TimeSlotGeneratorProps) {
  const [dates, setDates] = useState<string[]>([]);
  const [timeRanges, setTimeRanges] = useState<Array<{ startTime: string; endTime: string }>>([]);
  const [slotDuration, setSlotDuration] = useState(60);
  const [capacityPerSlot, setCapacityPerSlot] = useState(1);

  const handleGenerate = () => {
    const slots = generateTimeSlots({
      dates,
      timeRanges,
      slotDuration,
      capacityPerSlot,
      defaultLocation
    });
    onGenerate(slots);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Dates</label>
          <button
            type="button"
            onClick={() => setDates([...dates, ''])}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <PlusCircle size={16} />
            Add Date
          </button>
        </div>
        <div className="space-y-2">
          {dates.map((date, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  const newDates = [...dates];
                  newDates[index] = e.target.value;
                  setDates(newDates);
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setDates(dates.filter((_, i) => i !== index))}
                className="text-red-600 hover:text-red-800"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Time Ranges</label>
          <button
            type="button"
            onClick={() => setTimeRanges([...timeRanges, { startTime: '', endTime: '' }])}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <PlusCircle size={16} />
            Add Time Range
          </button>
        </div>
        <div className="space-y-2">
          {timeRanges.map((range, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="time"
                value={range.startTime}
                onChange={(e) => {
                  const newRanges = [...timeRanges];
                  newRanges[index] = { ...range, startTime: e.target.value };
                  setTimeRanges(newRanges);
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={range.endTime}
                onChange={(e) => {
                  const newRanges = [...timeRanges];
                  newRanges[index] = { ...range, endTime: e.target.value };
                  setTimeRanges(newRanges);
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setTimeRanges(timeRanges.filter((_, i) => i !== index))}
                className="text-red-600 hover:text-red-800"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slot Duration (minutes)
          </label>
          <input
            type="number"
            min="15"
            step="15"
            value={slotDuration}
            onChange={(e) => setSlotDuration(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacity per Slot
          </label>
          <input
            type="number"
            min="1"
            value={capacityPerSlot}
            onChange={(e) => setCapacityPerSlot(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={dates.length === 0 || timeRanges.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Generate Slots
        </button>
      </div>
    </div>
  );
}