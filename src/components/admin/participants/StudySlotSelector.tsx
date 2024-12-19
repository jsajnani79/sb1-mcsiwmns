import React from 'react';
import { Study } from '../../../types/study';
import { format } from 'date-fns';

interface StudySlotSelectorProps {
  studies: Study[];
  selectedStudyId: string;
  selectedSlotId: string;
  onStudyChange: (studyId: string) => void;
  onSlotChange: (slotId: string) => void;
}

export function StudySlotSelector({
  studies,
  selectedStudyId,
  selectedSlotId,
  onStudyChange,
  onSlotChange,
}: StudySlotSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Study and Time Slot
      </label>
      <div className="grid grid-cols-2 gap-4">
        <select
          value={selectedStudyId}
          onChange={(e) => onStudyChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Study</option>
          {studies.map((study) => (
            <option key={study.id} value={study.id}>
              {study.title} - {format(study.date, 'MMM d, yyyy')}
            </option>
          ))}
        </select>
        <select
          value={selectedSlotId}
          onChange={(e) => onSlotChange(e.target.value)}
          disabled={!selectedStudyId}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Time Slot</option>
          {selectedStudyId &&
            studies
              .find((s) => s.id === selectedStudyId)
              ?.timeSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
                </option>
              ))}
        </select>
      </div>
    </div>
  );
}