```typescript
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Study, IncentiveType, IncentiveStatus } from '../../../../types/study';
import { useStudyStore } from '../../../../store/studyStore';
import { History } from 'lucide-react';

interface IncentiveHistoryProps {
  type: IncentiveType;
}

export function IncentiveHistory({ type }: IncentiveHistoryProps) {
  const studies = useStudyStore((state) => state.studies);
  const [showDetails, setShowDetails] = useState(false);

  // Get all completed incentives from studies
  const completedIncentives = studies.flatMap((study) => 
    study.timeSlots.flatMap((slot) => 
      slot.attendees
        .filter((p) => 
          (p.incentiveType || study.defaultIncentiveType) === type &&
          p.incentiveStatus === IncentiveStatus.GRANTED
        )
        .map((participant) => ({
          study,
          slot,
          participant,
          amount: type === IncentiveType.PAYMENT ? study.defaultPaymentAmount : undefined,
          creditUnits: participant.creditUnits
        }))
    )
  );

  const totalAmount = type === IncentiveType.PAYMENT
    ? completedIncentives.reduce((sum, item) => sum + (item.amount || 0), 0)
    : completedIncentives.reduce((sum, item) => sum + (item.creditUnits || 0), 0);

  const totalParticipants = completedIncentives.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
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

        {completedIncentives.length > 0 && (
          <div className="mt-6">
            <div className="overflow-x-auto">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```