import { useState } from 'react';
import { Study, TimeSlot, IncentiveType, StudyStatus } from '../types/study';
import { format } from 'date-fns';

interface StudyFormData {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  date: string;
  defaultIncentiveType: IncentiveType;
  defaultPaymentAmount?: number;
  researcherId?: string;
  status: StudyStatus;
  duration?: number;
  requirements: string[];
  maxParticipants?: number;
  timeSlots: Omit<TimeSlot, 'id'>[];
}

export function useStudyForm(initialStudy: Study | undefined, onSubmit: (study: Study) => void) {
  const [formData, setFormData] = useState<StudyFormData>({
    title: initialStudy?.title || '',
    description: initialStudy?.description || '',
    imageUrl: initialStudy?.imageUrl || '',
    location: initialStudy?.location || '',
    date: initialStudy ? format(initialStudy.date, 'yyyy-MM-dd') : '',
    defaultIncentiveType: initialStudy?.defaultIncentiveType || IncentiveType.COURSE_CREDIT,
    defaultPaymentAmount: initialStudy?.defaultPaymentAmount,
    researcherId: initialStudy?.researcherId,
    status: initialStudy?.status || StudyStatus.DRAFT,
    duration: initialStudy?.duration,
    requirements: initialStudy?.requirements || [],
    maxParticipants: initialStudy?.maxParticipants,
    timeSlots: initialStudy?.timeSlots.map(({ startTime, endTime, capacity, location, attendees }) => ({
      startTime,
      endTime,
      capacity,
      location,
      attendees: []
    })) || []
  });

  const [showGenerator, setShowGenerator] = useState(false);

  const handleBasicInfoChange = (updates: Partial<StudyFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleRequirementsChange = (updates: { requirements?: string[]; maxParticipants?: number }) => {
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
    const study: Study = {
      id: initialStudy?.id || crypto.randomUUID(),
      ...formData,
      date: new Date(formData.date),
      timeSlots: formData.timeSlots.map(slot => ({
        ...slot,
        id: crypto.randomUUID(),
      })),
    };
    onSubmit(study);
  };

  return {
    formData,
    showGenerator,
    handleBasicInfoChange,
    handleRequirementsChange,
    handleGeneratedSlots,
    handleTimeSlotUpdate,
    handleSubmit
  };
}