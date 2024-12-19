```typescript
import React from 'react';
import { format } from 'date-fns';
import { IncentiveBatch } from '../../../../../types/incentive';
import { IncentiveType } from '../../../../../types/study';
import { IncentiveItem } from './IncentiveItem';

interface IncentiveDateGroupProps {
  dateKey: string;
  batches: IncentiveBatch[];
  type: IncentiveType;
}

export function IncentiveDateGroup({ dateKey, batches, type }: IncentiveDateGroupProps) {
  const totalAmount = type === IncentiveType.PAYMENT
    ? batches.reduce((sum, batch) => 
        sum + batch.incentives.reduce((batchSum, i) => 
          batchSum + (i.allocatedAmount || 0), 0), 0)
    : null;

  return (
    <div className="border-b last:border-b-0">
      <div className="px-6 py-3 bg-gray-50">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{format(new Date(dateKey), 'MMMM d, yyyy')}</h4>
          {totalAmount !== null && (
            <span className="text-green-600 font-medium">
              ${totalAmount.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {batches.map(batch => (
        <div key={batch.id} className="divide-y">
          {batch.incentives.map(incentive => (
            <IncentiveItem
              key={`${batch.id}-${incentive.participantId}-${incentive.eventId}`}
              batch={batch}
              incentive={incentive}
              type={type}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
```