import { useState, useCallback } from 'react';
import { Study, TimeSlot, IncentiveStatus } from '../types/study';
import { useStudyStore } from '../store/studyStore';
import { useProfileStore } from '../store/profileStore';

export function useStudyManagement() {
  const profile = useProfileStore(state => state.profile);
  const { studies, addParticipant } = useStudyStore();
  
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const bookedStudies = profile ? useStudyStore(state => 
    state.getBookedStudies(profile.email)
  ) : [];

  const availableStudies = studies.filter(study => 
    !bookedStudies.some(booking => booking.study.id === study.id)
  );

  const handleStudySelect = useCallback((study: Study | null) => {
    setSelectedStudy(study);
    setSelectedSlot(null);
    setShowBookingConfirmation(false);
    setShowBookingSuccess(false);
  }, []);

  const handleBookSlot = useCallback((studyId: string, slot: TimeSlot) => {
    const study = studies.find(s => s.id === studyId);
    if (!study) return;
    
    setSelectedStudy(study);
    setSelectedSlot(slot);
    setShowBookingConfirmation(true);
  }, [studies]);

  const handleBookingConfirm = useCallback(() => {
    if (!profile || !selectedStudy || !selectedSlot) return;
    
    const participant = {
      id: crypto.randomUUID(),
      name: profile.name,
      email: profile.email,
      incentiveType: selectedStudy.defaultIncentiveType,
      incentiveStatus: IncentiveStatus.PENDING,
      attended: null
    };
    
    addParticipant(selectedStudy.id, selectedSlot.id, participant);
    setShowBookingConfirmation(false);
    setShowBookingSuccess(true);
  }, [profile, selectedStudy, selectedSlot, addParticipant]);

  const handleBookingCancel = useCallback(() => {
    setShowBookingConfirmation(false);
    setSelectedSlot(null);
  }, []);

  const handleBookingSuccessClose = useCallback(() => {
    setShowBookingSuccess(false);
    setSelectedStudy(null);
    setSelectedSlot(null);
  }, []);

  return {
    profile,
    selectedStudy,
    selectedSlot,
    showBookingConfirmation,
    showBookingSuccess,
    bookedStudies,
    availableStudies,
    handleStudySelect,
    handleBookSlot,
    handleBookingConfirm,
    handleBookingCancel,
    handleBookingSuccessClose,
  };
}