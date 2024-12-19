import React from 'react';
import { format } from 'date-fns';
import { History, PlusCircle } from 'lucide-react';
import { AdminParticipant } from '../../../../types/participant';

interface ParticipantListTableProps {
  participants: AdminParticipant[];
  onViewHistory: (participant: AdminParticipant) => void;
  onAssignStudy: (participant: AdminParticipant) => void;
}

export function ParticipantListTable({ 
  participants, 
  onViewHistory, 
  onAssignStudy 
}: ParticipantListTableProps) {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Participant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Added
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{participant.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{participant.email}</div>
                {participant.phone && (
                  <div className="text-sm text-gray-500">{participant.phone}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(participant.createdAt, 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onViewHistory(participant)}
                    className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                  >
                    <History size={16} />
                    History
                  </button>
                  <button
                    onClick={() => onAssignStudy(participant)}
                    className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                  >
                    <PlusCircle size={16} />
                    Assign to Study
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}