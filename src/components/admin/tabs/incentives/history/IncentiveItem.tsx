```typescript
import React from 'react';
import { IncentiveBatch } from '../../../../../types/incentive';
import { IncentiveType } from '../../../../../types/study';

interface IncentiveItemProps {
  batch: IncentiveBatch;
  incentive: any;
  type: IncentiveType;
}

export function IncentiveItem({ batch, incentive, type }: IncentiveItemProps) {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{incentive.participantName}</div>
          <div className="text-sm text-gray-500">{incentive.eventTitle}</div>
        </div>
        <div className="text-right">
          {type === IncentiveType.PAYMENT ? (
            <div className="font-medium">${incentive.allocatedAmount?.toFixed(2)}</div>
          ) : (
            <div className="font-medium">{incentive.creditUnits} credits</div>
          )}
          <div className="text-xs text-gray-500">
            Granted by {batch.sentBy}
          </div>
        </div>
      </div>
    </div>
  );
}
```