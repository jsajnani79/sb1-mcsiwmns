import React, { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { ScheduleConfig, TimeRange } from '../../types/event';
import { generateTimeSlots } from '../../utils/timeSlotGenerator';

interface TimeSlotGeneratorProps {
  defaultLocation: string;
  onGenerate: (slots: any[]) => void;
}

export function TimeSlotGenerator({ defaultLocation, onGenerate }: TimeSlotGeneratorProps) {
  const [dates, setDates] = useState<string[]>([]);
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([]);
  const [slotDuration, setSlotDuration] = useState(60);
  const [capacityPerSlot, setCapacityPerSlot] = useState(1);

  const addDate = () => {
    setDates([...dates, '']);
  };

  const addTimeRange = () => {
    setTimeRanges([...timeRanges, { startTime: '', endTime: '' }]);
  };

  const updateDate = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const updateTimeRange = (index: number, field: keyof TimeRange, value: string) => {
    const newRanges = [...timeRanges];
    newRanges[index] = { ...newRanges[index], [field]: value };
    setTimeRanges(newRanges);
  };

  const removeDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const removeTimeRange = (index: number) => {
    setTimeRanges(timeRanges.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    const config: ScheduleConfig = {
      dates,
      timeRanges,
      slotDuration,
      capacityPerSlot,
      defaultLocation
    };
    const slots = generateTimeSlots(config);
    onGenerate(slots);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Generate Time Slots
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Dates</label>
            <button
              type="button"
              onClick={addDate}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Plus size={16} />
              Add Date
            </button>
          </div>
          <div className="space-y-2">
            {dates.map((date, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => updateDate(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeDate(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
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
              onClick={addTimeRange}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Plus size={16} />
              Add Time Range
            </button>
          </div>
          <div className="space-y-2">
            {timeRanges.map((range, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="time"
                  value={range.startTime}
                  onChange={(e) => updateTimeRange(index, 'startTime', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={range.endTime}
                  onChange={(e) => updateTimeRange(index, 'endTime', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeTimeRange(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
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
    </div>
  );
}