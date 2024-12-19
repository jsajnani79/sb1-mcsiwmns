import React from 'react';
import { format } from 'date-fns';
import { Study, IncentiveType, IncentiveStatus } from '../../../../types/study';
import { useStudyStore } from '../../../../store/studyStore';

export function CourseCreditsHistory() {
  const studies = useStudyStore(state => state.studies);

  // Get all participants who have been granted course credits
  const grantedCredits = studies.flatMap(study => 
    study.timeSlots.flatMap(slot => 
      slot.attendees
        .filter(p => 
          p.incentiveType === IncentiveType.COURSE_CREDIT &&
          p.incentiveStatus === IncentiveStatus.GRANTED
        )
        .map(participant => ({
          study,
          slot,
          participant
        }))
    )
  );

  if (grantedCredits.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <p className="text-gray-500">No course credits have been granted yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Granted Course Credits</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Study</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Completed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit Units</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {grantedCredits.map(({ study, participant }) => (
              <tr key={`${participant.id}-${study.id}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                    <div className="text-sm text-gray-500">{participant.email}</div>
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
                  <div className="text-sm text-gray-900">
                    {participant.creditUnits?.toFixed(1) || '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}