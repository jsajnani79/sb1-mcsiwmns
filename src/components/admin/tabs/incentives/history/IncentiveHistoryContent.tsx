```typescript
import React from 'react';
import { format } from 'date-fns';
import { IncentiveBatch } from '../../../../../types/incentive';
import { IncentiveType } from '../../../../../types/study';
import { IncentiveDateGroup } from './IncentiveDateGroup';
import { groupIncentivesByDate } from '../../../../../utils/incentiveUtils';

interface IncentiveHistoryContentProps {
  batches: IncentiveBatch[];
  type: IncentiveType;
}

export function IncentiveHistoryContent({ batches, type }: IncentiveHistoryContentProps) {
  const groupedIncentives = groupIncentivesByDate(batches, type);

  if (Object.keys(groupedIncentives).length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No history available
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex-1">
      {Object.entries(groupedIncentives).map(([dateKey, dateBatches]) => (
        <IncentiveDateGroup
          key={dateKey}
          dateKey={dateKey}
          batches={dateBatches}
          type={type}
        />
      ))}
    </div>
  );
}
```