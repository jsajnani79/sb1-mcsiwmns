```typescript
import { format } from 'date-fns';
import { IncentiveBatch } from '../types/incentive';
import { IncentiveType } from '../types/study';

export function groupIncentivesByDate(batches: IncentiveBatch[], type: IncentiveType) {
  return batches.reduce((acc, batch) => {
    const dateKey = format(batch.dateSent, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(batch);
    return acc;
  }, {} as Record<string, IncentiveBatch[]>);
}

export function calculateTotalAmount(batches: IncentiveBatch[], type: IncentiveType): number {
  return batches.reduce((total, batch) => 
    total + batch.incentives
      .filter(i => i.incentiveType === type)
      .reduce((sum, i) => sum + (i.allocatedAmount || 0), 0)
  , 0);
}

export function filterIncentivesByType(batches: IncentiveBatch[], type: IncentiveType): IncentiveBatch[] {
  return batches.map(batch => ({
    ...batch,
    incentives: batch.incentives.filter(i => i.incentiveType === type)
  })).filter(batch => batch.incentives.length > 0);
}
```