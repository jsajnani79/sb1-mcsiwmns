import React from 'react';
import { PlusCircle, Wand2 } from 'lucide-react';
import { TimeSlot } from '../../../../types/study';
import { TimeSlotGenerator } from '../TimeSlotGenerator';
import { TimeSlotEditor } from '../TimeSlotEditor';

interface TimeSlotSectionProps {
  timeSlots: Omit<TimeSlot, 'id'>[];
  defaultLocation: string;
  showGenerator: boolean;
  onGeneratedSlots: (slots: Omit<TimeSlot, 'id'>[]) => void;
  onUpdate: (slots: Omit<TimeSlot, 'id'>[]) => void;
}

export function TimeSlotSection({
  timeSlots,
  defaultLocation,
  showGenerator,
  onGeneratedSlots,
  onUpdate,
}: TimeSlotSectionProps) {
  const addEmptySlot = () => {
    onUpdate([
      ...timeSlots,
      {
        startTime: new Date(),
        endTime: new Date(),
        capacity: 1,
        location: defaultLocation,
        attendees: [],
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Time Slots</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onUpdate([])}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Wand2 size={20} />
            Generate Slots
          </button>
          <button
            type="button"
            onClick={addEmptySlot}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <PlusCircle size={20} />
            Add Manual Slot
          </button>
        </div>
      </div>

      {showGenerator ? (
        <TimeSlotGenerator
          defaultLocation={defaultLocation}
          onGenerate={onGeneratedSlots}
        />
      ) : (
        <TimeSlotEditor
          slots={timeSlots}
          defaultLocation={defaultLocation}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}