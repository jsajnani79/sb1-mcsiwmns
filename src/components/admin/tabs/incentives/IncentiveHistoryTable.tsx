```typescript
import React from 'react';
import { format } from 'date-fns';
import { IncentiveType } from '../../../../types/study';

interface IncentiveHistoryTableProps {
  completedIncentives: any[];
  type: IncentiveType;
}

export function IncentiveHistoryTable({ completedIncentives, type }: IncentiveHistoryTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Participant
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Study
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            {type === IncentiveType.PAYMENT ? 'Amount' : 'Credits'}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {completedIncentives.map(({ study, participant, amount, creditUnits }) => (
          <tr key={`${participant.id}-${study.id}`}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {participant.name}
                </div>
                <div className="text-sm text-gray-500">
                  {participant.email}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{study.title}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {format(study.date, 'MMM d, yyyy')}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {type === IncentiveType.PAYMENT 
                  ? `$${amount?.toFixed(2) || '0.00'}`
                  : `${creditUnits || 0} credits`
                }
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```