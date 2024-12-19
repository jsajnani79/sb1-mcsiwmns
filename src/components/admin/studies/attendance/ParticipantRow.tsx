import React from 'react';
import { Study, TimeSlot, Participant } from '../../../../types/study';
import { Square, CheckSquare } from 'lucide-react';
import { AttendanceControls } from './AttendanceControls';
import { ParticipantIncentiveEdit } from '../ParticipantIncentiveEdit';

interface ParticipantRowProps {
  participant: Participant;
  study: Study;
  slot: TimeSlot;
  isSelected: boolean;
  onToggleSelect: (participantId: string) => void;
  onAttendanceUpdate: (slotId: string, participant: Participant, attended: boolean | null) => void;
}

export function ParticipantRow({
  participant,
  study,
  slot,
  isSelected,
  onToggleSelect,
  onAttendanceUpdate
}: ParticipantRowProps) {
  return (
    <tr className={isSelected ? 'bg-blue-50' : ''}>
      <td className="px-4 py-3 whitespace-nowrap">
        <button
          onClick={() => onToggleSelect(participant.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          {isSelected ? (
            <CheckSquare className="w-5 h-5" />
          ) : (
            <Square className="w-5 h-5" />
          )}
        </button>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{participant.name}</div>
          <div className="text-sm text-gray-500">{participant.email}</div>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <AttendanceControls
          participant={participant}
          onUpdate={(attended) => onAttendanceUpdate(slot.id, participant, attended)}
        />
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        {(participant.incentiveType || study.defaultIncentiveType).replace('_', ' ')}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        {participant.incentiveStatus.replace('_', ' ')}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <ParticipantIncentiveEdit
          participant={participant}
          defaultIncentiveType={study.defaultIncentiveType}
          onUpdate={(updates) => onAttendanceUpdate(slot.id, { ...participant, ...updates }, participant.attended)}
        />
      </td>
    </tr>
  );
}