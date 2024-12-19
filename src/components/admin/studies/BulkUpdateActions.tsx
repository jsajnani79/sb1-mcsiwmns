import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { Study, IncentiveStatus, IncentiveType } from '../../../types/study';
import { BulkUpdateModal } from './BulkUpdateModal';

interface BulkUpdateActionsProps {
  study: Study;
  onUpdate: (updates: {
    attended?: boolean | null;
    incentiveType?: IncentiveType;
    incentiveStatus?: IncentiveStatus;
  }) => void;
}

export function BulkUpdateActions({ study, onUpdate }: BulkUpdateActionsProps) {
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = (updates: any) => {
    // If marking as attended, set incentive status to PENDING
    if (updates.attended === true) {
      updates.incentiveStatus = IncentiveStatus.PENDING;
    }
    // If marking as not attended, set incentive status to UNALLOCATED
    else if (updates.attended === false) {
      updates.incentiveStatus = IncentiveStatus.UNALLOCATED;
    }
    
    onUpdate(updates);
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50"
      >
        <Settings2 size={16} />
        <span className="text-sm">Bulk Update Selected</span>
      </button>

      {showModal && (
        <BulkUpdateModal
          study={study}
          onUpdate={handleUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}