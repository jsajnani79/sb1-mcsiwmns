import { useState } from 'react';
import { Event, TimeSlot, IncentiveType } from '../types/event';
import { format } from 'date-fns';

interface EventFormData {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: string;
  defaultIncentiveType: IncentiveType;
  timeSlots: Omit<TimeSlot, 'id'>[];
}

export function useEventForm(initialEvent: Event | undefined, onSubmit: (event: Event) => void) {
  const [formData, setFormData] = useState<EventFormData>({
    title: initialEvent?.title || '',
    description: initialEvent?.description || '',
    imageUrl: initialEvent?.imageUrl || '',
    location: initialEvent?.location || '',
    date: initialEvent ? format(initialEvent.date, 'yyyy-MM-dd') : '',
    defaultIncentiveType: initialEvent?.defaultIncentiveType || IncentiveType.COURSE_CREDIT,
    timeSlots: initialEvent?.timeSlots.map(({ startTime, endTime, capacity, location, attendees }) => ({
      startTime,
      endTime,
      capacity,
      location,
      attendees: []
    })) || []
  });

  const [showGenerator, setShowGenerator] = useState(false);

  const handleBasicInfoChange = (updates: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleGeneratedSlots = (generatedSlots: Omit<TimeSlot, 'id'>[]) => {
    setFormData(prev => ({ ...prev, timeSlots: [...prev.timeSlots, ...generatedSlots] }));
    setShowGenerator(false);
  };

  const handleTimeSlotUpdate = (slots: Omit<TimeSlot, 'id'>[]) => {
    setFormData(prev => ({ ...prev, timeSlots: slots }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: initialEvent?.id || crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      location: formData.location,
      date: new Date(formData.date),
      defaultIncentiveType: formData.defaultIncentiveType,
      timeSlots: formData.timeSlots.map(slot => ({
        ...slot,
        id: crypto.randomUUID(),
      })),
    };
    onSubmit(event);
  };

  return {
    formData,
    showGenerator,
    handleBasicInfoChange,
    handleGeneratedSlots,
    handleTimeSlotUpdate,
    handleSubmit
  };
}