import React from 'react';
import { Event } from '../../../types/event';
import { BasicEventInfo } from './form-sections/BasicEventInfo';
import { TimeSlotSection } from './form-sections/TimeSlotSection';
import { useEventForm } from '../../../hooks/useEventForm';

interface EventFormProps {
  initialEvent?: Event;
  onSubmit: (event: Event) => void;
}

export function EventForm({ initialEvent, onSubmit }: EventFormProps) {
  const {
    formData,
    showGenerator,
    handleBasicInfoChange,
    handleGeneratedSlots,
    handleTimeSlotUpdate,
    handleSubmit
  } = useEventForm(initialEvent, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicEventInfo
        formData={formData}
        onChange={handleBasicInfoChange}
      />

      <TimeSlotSection
        timeSlots={formData.timeSlots}
        defaultLocation={formData.location}
        showGenerator={showGenerator}
        onGeneratedSlots={handleGeneratedSlots}
        onUpdate={handleTimeSlotUpdate}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {initialEvent ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}