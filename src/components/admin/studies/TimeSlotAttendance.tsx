import React from 'react';
import { format } from 'date-fns';
import { Study, TimeSlot, Participant } from '../../../types/study';
import { AttendanceControls } from './attendance/AttendanceControls';
import { ParticipantRow } from './attendance/ParticipantRow';

interface TimeSlotAttendanceProps {
  study: Study;
  slot: TimeSlot;
  selectedParticipants: string[];
  onToggleSelect: (participantId: string) => void;
  onAttendanceUpdate: (slotId: string, participant: Participant, attended: boolean | null) => void;
}

export function TimeSlotAttendance({ 
  study, 
  slot,
  selectedParticipants,
  onToggleSelect,
  onAttendanceUpdate 
}: TimeSlotAttendanceProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold">{format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}</h4>
          <p className="text-sm text-gray-500">
            {slot.attendees.length} / {slot.capacity} participants
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <div className="w-5 h-5"></div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incentive</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {slot.attendees.map((attendee) => (
              <ParticipantRow
                key={attendee.id}
                participant={attendee}
                study={study}
                slot={slot}
                isSelected={selectedParticipants.includes(attendee.id)}
                onToggleSelect={onToggleSelect}
                onAttendanceUpdate={onAttendanceUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}