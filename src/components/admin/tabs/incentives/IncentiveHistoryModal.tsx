```typescript
import React from 'react';
import { X, DollarSign, GraduationCap } from 'lucide-react';
import { IncentiveBatch } from '../../../../types/incentive';
import { IncentiveType } from '../../../../types/study';
import { IncentiveHistoryHeader } from './history/IncentiveHistoryHeader';
import { IncentiveHistoryContent } from './history/IncentiveHistoryContent';

interface IncentiveHistoryModalProps {
  batches: IncentiveBatch[];
  type: IncentiveType;
  onClose: () => void;
}

export function IncentiveHistoryModal({ batches, type, onClose }: IncentiveHistoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto max-h-[80vh] flex flex-col">
        <IncentiveHistoryHeader type={type} onClose={onClose} />
        <IncentiveHistoryContent batches={batches} type={type} />
        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
```