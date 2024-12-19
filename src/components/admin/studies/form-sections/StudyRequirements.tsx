import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

interface StudyRequirementsProps {
  requirements: string[];
  maxParticipants?: number;
  onChange: (updates: { requirements?: string[]; maxParticipants?: number }) => void;
}

export function StudyRequirements({ requirements, maxParticipants, onChange }: StudyRequirementsProps) {
  const [newRequirement, setNewRequirement] = useState('');

  const addRequirement = () => {
    if (newRequirement.trim()) {
      onChange({ requirements: [...requirements, newRequirement.trim()] });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    onChange({ requirements: requirements.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Maximum Participants</label>
        <input
          type="number"
          min="1"
          value={maxParticipants || ''}
          onChange={e => onChange({ maxParticipants: parseInt(e.target.value) || undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter maximum number of participants"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Study Requirements</label>
        <div className="space-y-2">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex-1 bg-gray-50 px-3 py-2 rounded-md text-sm">{req}</span>
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newRequirement}
              onChange={e => setNewRequirement(e.target.value)}
              placeholder="Add a requirement"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addRequirement}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}