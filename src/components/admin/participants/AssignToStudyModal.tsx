import React, { useState } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { AdminParticipant } from '../../../types/participant';
import { useStudyStore } from '../../../store/studyStore';
import { useParticipantStore } from '../../../store/participantStore';
import { IncentiveType } from '../../../types/study';

interface AssignToStudyModalProps {
  participant: AdminParticipant;
  onClose: () => void;
}

export function AssignToStudyModal({ participant, onClose }: AssignToStudyModalProps) {
  const studies = useStudyStore(state => state.studies);
  const assignToStudy = useParticipantStore(state => state.assignToStudy);
  
  const [selectedStudy, setSelectedStudy] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [incentiveType, setIncentiveType] = useState(IncentiveType.COURSE_CREDIT);

  const study = studies.find(s => s.id === selectedStudy);
  const slot = study?.timeSlots.find(s => s.id === selectedSlot);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!study || !slot) return;

    assignToStudy({
      participantId: participant.id,
      studyId: study.id,
      slotId: slot.id,
      incentiveType,
      status: 'pending'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Assign to Study</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Study
            </label>
            <select
              value={selectedStudy}
              onChange={(e) => {
                setSelectedStudy(e.target.value);
                setSelectedSlot('');
              }}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choose a study</option>
              {studies.map((study) => (
                <option key={study.id} value={study.id}>
                  {study.title} - {format(study.date, 'MMM d, yyyy')}
                </option>
              ))}
            </select>
          </div>

          {selectedStudy && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time Slot
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Choose a time slot</option>
                {study?.timeSlots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
                    {' '}({slot.attendees.length}/{slot.capacity} participants)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Incentive Type
            </label>
            <select
              value={incentiveType}
              onChange={(e) => setIncentiveType(e.target.value as IncentiveType)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(IncentiveType).map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Assign to Study
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}