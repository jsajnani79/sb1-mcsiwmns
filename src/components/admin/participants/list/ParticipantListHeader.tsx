import React from 'react';
import { UserPlus } from 'lucide-react';

interface ParticipantListHeaderProps {
  onAddClick: () => void;
}

export function ParticipantListHeader({ onAddClick }: ParticipantListHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Participants</h2>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <UserPlus size={20} />
        Add Participant
      </button>
    </div>
  );
}