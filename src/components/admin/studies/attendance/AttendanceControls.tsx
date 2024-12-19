import React from 'react';
import { Check, X } from 'lucide-react';
import { Participant } from '../../../../types/study';

interface AttendanceControlsProps {
  participant: Participant;
  onUpdate: (attended: boolean | null) => void;
}

export function AttendanceControls({ participant, onUpdate }: AttendanceControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onUpdate(true)}
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
        onClick={() => onUpdate(false)}
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
  );
}