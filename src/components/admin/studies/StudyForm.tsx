import React from 'react';
import { Study, StudyStatus, IncentiveType } from '../../../types/study';
import { BasicStudyInfo } from './form-sections/BasicStudyInfo';
import { TimeSlotSection } from './form-sections/TimeSlotSection';
import { StudyRequirements } from './form-sections/StudyRequirements';
import { useStudyForm } from '../../../hooks/useStudyForm';

interface StudyFormProps {
  initialStudy?: Study;
  onSubmit: (study: Study) => void;
}

export function StudyForm({ initialStudy, onSubmit }: StudyFormProps) {
  const {
    formData,
    showGenerator,
    handleBasicInfoChange,
    handleGeneratedSlots,
    handleTimeSlotUpdate,
    handleRequirementsChange,
    handleSubmit
  } = useStudyForm(initialStudy, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
        <BasicStudyInfo
          formData={formData}
          onChange={handleBasicInfoChange}
        />
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Requirements</h3>
        <StudyRequirements
          requirements={formData.requirements || []}
          maxParticipants={formData.maxParticipants}
          onChange={handleRequirementsChange}
        />
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Time Slots</h3>
        <TimeSlotSection
          timeSlots={formData.timeSlots}
          defaultLocation={formData.location}
          showGenerator={showGenerator}
          onGeneratedSlots={handleGeneratedSlots}
          onUpdate={handleTimeSlotUpdate}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {initialStudy ? 'Update Study' : 'Create Study'}
        </button>
      </div>
    </form>
  );
}