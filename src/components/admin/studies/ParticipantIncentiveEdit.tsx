import React, { useState } from 'react';
import { PencilLine, X } from 'lucide-react';
import { IncentiveType, IncentiveStatus, Participant } from '../../../types/study';

interface ParticipantIncentiveEditProps {
  participant: Participant;
  defaultIncentiveType: IncentiveType;
  onUpdate: (updates: Partial<Participant>) => void;
}

export function ParticipantIncentiveEdit({ 
  participant, 
  defaultIncentiveType,
  onUpdate 
}: ParticipantIncentiveEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    incentiveType: participant.incentiveType || defaultIncentiveType,
    incentiveStatus: participant.incentiveStatus || IncentiveStatus.PENDING
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
        title="Edit incentive"
      >
        <PencilLine size={16} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Edit Participant Incentive</h3>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Incentive Type
            </label>
            <select
              value={editData.incentiveType}
              onChange={(e) => setEditData({ 
                ...editData, 
                incentiveType: e.target.value as IncentiveType 
              })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(IncentiveType).map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={editData.incentiveStatus}
              onChange={(e) => setEditData({ 
                ...editData, 
                incentiveStatus: e.target.value as IncentiveStatus 
              })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(IncentiveStatus).map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}