import React from 'react';
import { ParticipantRow } from './ParticipantRow';
import { Participant } from '../../../types/study';

interface ParticipantTableProps {
  participants: Array<Participant & {
    studyTitle: string;
    studyDate: Date;
    slotTime: { start: Date; end: Date };
    studyId: string;
    slotId: string;
  }>;
}

export function ParticipantTable({ participants }: ParticipantTableProps) {
  if (participants.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No participants found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Participant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Study Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {participants.map((participant) => (
            <ParticipantRow
              key={`${participant.id}-${participant.slotId}`}
              participant={participant}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}