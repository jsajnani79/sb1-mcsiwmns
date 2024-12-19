import React, { useState } from 'react';
import { Study, IncentiveStatus, IncentiveType } from '../../../types/study';
import { X } from 'lucide-react';

interface BulkUpdateModalProps {
  study: Study;
  onUpdate: (updates: {
    attended?: boolean | null;
    incentiveType?: IncentiveType;
    incentiveStatus?: IncentiveStatus;
  }) => void;
  onClose: () => void;
}

export function BulkUpdateModal({ study, onUpdate, onClose }: BulkUpdateModalProps) {
  const [updates, setUpdates] = useState({
    attended: '',
    incentiveType: '',
    incentiveStatus: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUpdates: any = {};
    
    if (updates.attended) {
      finalUpdates.attended = updates.attended === 'null' ? null : updates.attended === 'true';
      // Automatically update incentive status based on attendance
      if (finalUpdates.attended === true) {
        finalUpdates.incentiveStatus = IncentiveStatus.PENDING;
      } else if (finalUpdates.attended === false) {
        finalUpdates.incentiveStatus = IncentiveStatus.UNALLOCATED;
      }
    }
    if (updates.incentiveType) {
      finalUpdates.incentiveType = updates.incentiveType;
    }
    if (updates.incentiveStatus) {
      finalUpdates.incentiveStatus = updates.incentiveStatus;
    }

    onUpdate(finalUpdates);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Bulk Update Selected Participants</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendance Status
            </label>
            <select
              value={updates.attended}
              onChange={(e) => setUpdates({ ...updates, attended: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">No change</option>
              <option value="true">Mark as attended</option>
              <option value="false">Mark as not attended</option>
              <option value="null">Clear attendance status</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Incentive Type
            </label>
            <select
              value={updates.incentiveType}
              onChange={(e) => setUpdates({ ...updates, incentiveType: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">No change</option>
              {Object.values(IncentiveType).map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Incentive Status
            </label>
            <select
              value={updates.incentiveStatus}
              onChange={(e) => setUpdates({ ...updates, incentiveStatus: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">No change</option>
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
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update Selected
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}