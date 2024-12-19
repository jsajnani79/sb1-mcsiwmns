import React, { useState } from 'react';
import { Study, TimeSlot, Participant } from '../../../types/study';
import { TimeSlotAttendance } from './TimeSlotAttendance';
import { BulkUpdateActions } from './BulkUpdateActions';
import { Square, CheckSquare } from 'lucide-react';

interface TimeSlotViewProps {
  study: Study;
  onAttendanceUpdate: (slotId: string, participant: Participant, attended: boolean | null) => void;
  onBulkUpdate: (slotId: string | undefined, updates: Partial<Participant>, selectedIds?: string[]) => void;
}

export function TimeSlotView({ study, onAttendanceUpdate, onBulkUpdate }: TimeSlotViewProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  
  // Get all participants across all time slots
  const allParticipants = study.timeSlots.flatMap(slot => 
    slot.attendees.map(attendee => attendee.id)
  );
  
  const allSelected = allParticipants.length > 0 && 
    selectedParticipants.length === allParticipants.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(allParticipants);
    }
  };

  const toggleSelect = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleBulkUpdate = (updates: Partial<Participant>) => {
    if (selectedParticipants.length === 0) return;
    onBulkUpdate(undefined, updates, selectedParticipants);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              {allSelected ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span className="text-sm">Select All</span>
            </button>
            <span className="text-sm text-gray-500">
              {selectedParticipants.length} selected
            </span>
          </div>
          {selectedParticipants.length > 0 && (
            <BulkUpdateActions
              study={study}
              onUpdate={handleBulkUpdate}
            />
          )}
        </div>
      </div>

      {study.timeSlots.map((slot) => (
        <TimeSlotAttendance
          key={slot.id}
          study={study}
          slot={slot}
          selectedParticipants={selectedParticipants}
          onToggleSelect={toggleSelect}
          onAttendanceUpdate={onAttendanceUpdate}
        />
      ))}
    </div>
  );
}