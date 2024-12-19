import React from 'react';
import { format } from 'date-fns';
import { Study, TimeSlot } from '../../types/study';
import { TimeSlotItem } from './TimeSlotItem';

interface TimeSlotListProps {
  study: Study;
  onBookSlot: (studyId: string, slot: TimeSlot) => void;
}

export function TimeSlotList({ study, onBookSlot }: TimeSlotListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
      {study.timeSlots.map((slot) => (
        <TimeSlotItem
          key={slot.id}
          slot={slot}
          defaultLocation={study.location}
          onBook={() => onBookSlot(study.id, slot)}
        />
      ))}
    </div>
  );
}