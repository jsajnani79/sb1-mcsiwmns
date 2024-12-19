```typescript
import React from 'react';
import { History } from 'lucide-react';
import { IncentiveType } from '../../../../types/study';

interface IncentiveHistorySummaryProps {
  type: IncentiveType;
  totalAmount: number;
  totalParticipants: number;
  onViewHistory: () => void;
}

export function IncentiveHistorySummary({
  type,
  totalAmount,
  totalParticipants,
  onViewHistory
}: IncentiveHistorySummaryProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">
            {type === IncentiveType.PAYMENT ? 'Payment History' : 'Course Credit History'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {totalParticipants} participants
          </p>
        </div>
        {type === IncentiveType.PAYMENT && totalAmount > 0 && (
          <div className="text-right">
            <div className="text-lg font-medium text-green-600">
              ${totalAmount.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Total granted</div>
          </div>
        )}
      </div>

      <button
        onClick={onViewHistory}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
      >
        <History size={16} />
        View Full History
      </button>
    </div>
  );
}
```