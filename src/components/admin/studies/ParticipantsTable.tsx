import React, { useState } from 'react';
import { format } from 'date-fns';
import { Study, Participant } from '../../../types/study';
import { Check, X, Square, CheckSquare } from 'lucide-react';
import { BulkUpdateActions } from './BulkUpdateActions';
import { ParticipantIncentiveEdit } from './ParticipantIncentiveEdit';

interface ParticipantsTableProps {
  participants: Array<Participant & { timeSlot: any }>;
  study: Study;
  onAttendanceUpdate: (slotId: string, participant: Participant, attended: boolean | null) => void;
  onBulkUpdate: (slotId: string | undefined, updates: Partial<Participant>, selectedIds?: string[]) => void;
}

export function ParticipantsTable({ 
  participants, 
  study, 
  onAttendanceUpdate,
  onBulkUpdate 
}: ParticipantsTableProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const allSelected = participants.length > 0 && selectedParticipants.length === participants.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(participants.map(p => p.id));
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold">All Participants</h3>
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={toggleSelectAll}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {allSelected ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incentive</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-10"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {participants.map((participant) => (
              <tr 
                key={participant.id}
                className={selectedParticipants.includes(participant.id) ? 'bg-blue-50' : ''}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => toggleSelect(participant.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {selectedParticipants.includes(participant.id) ? (
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
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {format(participant.timeSlot.startTime, 'h:mm a')} - {format(participant.timeSlot.endTime, 'h:mm a')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAttendanceUpdate(participant.timeSlot.id, participant, true)}
                      className={`p-1 rounded ${
                        participant.attended === true
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400 hover:text-green-600'
                      }`}
                      title="Mark as attended"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => onAttendanceUpdate(participant.timeSlot.id, participant, false)}
                      className={`p-1 rounded ${
                        participant.attended === false
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-400 hover:text-red-600'
                      }`}
                      title="Mark as not attended"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {(participant.incentiveType || study.defaultIncentiveType).replace('_', ' ')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {(participant.incentiveStatus || 'PENDING').replace('_', ' ')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <ParticipantIncentiveEdit
                    participant={participant}
                    defaultIncentiveType={study.defaultIncentiveType}
                    onUpdate={(updates) => onAttendanceUpdate(participant.timeSlot.id, participant, participant.attended)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}