import React from 'react';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { Study, TimeSlot, Participant, IncentiveStatus, IncentiveType } from '../../../types/study';
import { useStudyStore } from '../../../store/studyStore';

interface ParticipantManagerProps {
  study: Study;
  slot: TimeSlot;
}

export function ParticipantManager({ study, slot }: ParticipantManagerProps) {
  const updateParticipant = useStudyStore(state => state.updateParticipant);

  const handleAttendanceUpdate = (participant: Participant, attended: boolean) => {
    updateParticipant(study.id, slot.id, {
      ...participant,
      attended
    });
  };

  const handleIncentiveTypeUpdate = (participant: Participant, incentiveType: IncentiveType) => {
    updateParticipant(study.id, slot.id, {
      ...participant,
      incentiveType,
      incentiveStatus: IncentiveStatus.PENDING
    });
  };

  const handleIncentiveStatusUpdate = (participant: Participant, incentiveStatus: IncentiveStatus) => {
    updateParticipant(study.id, slot.id, {
      ...participant,
      incentiveStatus
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incentive Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {slot.attendees.map((participant) => (
              <tr key={participant.id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                    <div className="text-sm text-gray-500">{participant.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAttendanceUpdate(participant, true)}
                      className={`p-1 rounded ${
                        participant.attended
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400 hover:text-green-600'
                      }`}
                      title="Mark as attended"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleAttendanceUpdate(participant, false)}
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
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    value={participant.incentiveType || study.defaultIncentiveType}
                    onChange={(e) => handleIncentiveTypeUpdate(participant, e.target.value as IncentiveType)}
                    className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.values(IncentiveType).map((type) => (
                      <option key={type} value={type}>{type.replace('_', ' ')}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    value={participant.incentiveStatus || IncentiveStatus.PENDING}
                    onChange={(e) => handleIncentiveStatusUpdate(participant, e.target.value as IncentiveStatus)}
                    className={`text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      participant.incentiveStatus === IncentiveStatus.GRANTED ? 'text-green-600' : 'text-gray-900'
                    }`}
                  >
                    {Object.values(IncentiveStatus).map((status) => (
                      <option key={status} value={status}>{status.replace('_', ' ')}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}