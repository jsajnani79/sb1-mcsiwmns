import React, { useState } from 'react';
import { format } from 'date-fns';
import { Send, GraduationCap, CheckSquare, Square } from 'lucide-react';
import { Study, IncentiveType, IncentiveStatus } from '../../../../types/study';
import { useStudyStore } from '../../../../store/studyStore';
import { useIncentiveStore } from '../../../../store/incentiveStore';

export function CourseCreditsQueue() {
  const studies = useStudyStore(state => state.studies);
  const updateParticipant = useStudyStore(state => state.updateParticipant);
  const addToIncentiveQueue = useIncentiveStore(state => state.addToQueue);
  const sendBatch = useIncentiveStore(state => state.sendBatch);
  
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [creditUnits, setCreditUnits] = useState<Record<string, number>>({});

  // Filter for participants who need course credit allocation
  const pendingCredits = studies.flatMap(study => 
    study.timeSlots.flatMap(slot => 
      slot.attendees
        .filter(p => 
          (p.incentiveType || study.defaultIncentiveType) === IncentiveType.COURSE_CREDIT &&
          p.attended === true &&
          (p.incentiveStatus === IncentiveStatus.PENDING || p.incentiveStatus === IncentiveStatus.UNALLOCATED)
        )
        .map(participant => ({
          study,
          slot,
          participant
        }))
    )
  );

  const handleGrantCredits = () => {
    if (selectedParticipants.length === 0) return;

    // Update each selected participant
    pendingCredits.forEach(({ study, slot, participant }) => {
      if (selectedParticipants.includes(participant.id)) {
        const units = creditUnits[participant.id] || 1; // Default to 1 if not specified

        // Update participant status
        const updatedParticipant = {
          ...participant,
          incentiveStatus: IncentiveStatus.GRANTED,
          creditUnits: units
        };
        updateParticipant(study.id, slot.id, updatedParticipant);

        // Add to incentive queue for history
        addToIncentiveQueue({
          participantId: participant.id,
          participantName: participant.name,
          participantEmail: participant.email,
          eventId: study.id,
          eventTitle: study.title,
          slotId: slot.id,
          incentiveType: IncentiveType.COURSE_CREDIT,
          creditUnits: units,
          dateAttended: study.date,
          status: 'pending'
        });
      }
    });

    // Send batch to move to history
    sendBatch('Admin');
    
    // Reset selections
    setSelectedParticipants([]);
    setCreditUnits({});
  };

  if (pendingCredits.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-500">No pending course credits to allocate</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (selectedParticipants.length === pendingCredits.length) {
                  setSelectedParticipants([]);
                } else {
                  setSelectedParticipants(pendingCredits.map(p => p.participant.id));
                }
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              {selectedParticipants.length === pendingCredits.length ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span className="text-sm">Select All</span>
            </button>
            <span className="text-sm text-gray-500">
              {selectedParticipants.length} selected
            </span>
          </div>
          <button
            onClick={handleGrantCredits}
            disabled={selectedParticipants.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            Grant Credits
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Study</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit Units</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingCredits.map(({ study, participant }) => (
              <tr key={`${participant.id}-${study.id}`}>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (selectedParticipants.includes(participant.id)) {
                        setSelectedParticipants(prev => prev.filter(id => id !== participant.id));
                      } else {
                        setSelectedParticipants(prev => [...prev, participant.id]);
                      }
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {selectedParticipants.includes(participant.id) ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                    <div className="text-sm text-gray-500">{participant.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{study.title}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{format(study.date, 'MMM d, yyyy')}</div>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={creditUnits[participant.id] || ''}
                    onChange={(e) => setCreditUnits(prev => ({
                      ...prev,
                      [participant.id]: parseFloat(e.target.value)
                    }))}
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="1.0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}