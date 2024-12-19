import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { AdminParticipant } from '../../../../types/participant';
import { useParticipantStore } from '../../../../store/participantStore';
import { useStudyStore } from '../../../../store/studyStore';

interface ParticipantStudyHistoryProps {
  participant: AdminParticipant;
  onClose: () => void;
}

export function ParticipantStudyHistory({ participant, onClose }: ParticipantStudyHistoryProps) {
  const assignments = useParticipantStore(state => state.getParticipantStudies(participant.id));
  const studies = useStudyStore(state => state.studies);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">Study History</h3>
            <p className="text-sm text-gray-500">{participant.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {assignments.length > 0 ? (
            <div className="space-y-4">
              {assignments.map((assignment) => {
                const study = studies.find(s => s.id === assignment.studyId);
                if (!study) return null;

                const slot = study.timeSlots.find(s => s.id === assignment.slotId);
                if (!slot) return null;

                const uniqueKey = `${assignment.participantId}-${assignment.studyId}-${assignment.slotId}`;

                return (
                  <div key={uniqueKey} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{study.title}</h4>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>Date: {format(study.date, 'MMMM d, yyyy')}</p>
                          <p>Time: {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}</p>
                          <p>Status: {assignment.status}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Assigned: </span>
                        {format(assignment.assignedAt, 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              No study assignments found for this participant.
            </p>
          )}
        </div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}