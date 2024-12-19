import React, { useState } from 'react';
import { StudyCard } from './StudyCard';
import { TimeSlotList } from '../timeslots/TimeSlotList';
import { BookingForm } from '../booking/BookingForm';
import { BookingConfirmationDialog } from '../dialogs/BookingConfirmationDialog';
import { BookingSuccessDialog } from '../dialogs/BookingSuccessDialog';
import { BookedStudiesList } from './BookedStudiesList';
import { useStudyManagement } from '../../hooks/useStudyManagement';

export function StudiesView() {
  const {
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
  } = useStudyManagement();

  return (
    <div className="space-y-8">
      {!selectedStudy ? (
        <>
          {bookedStudies.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Booked Studies</h2>
              <BookedStudiesList bookings={bookedStudies} />
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableStudies.map((study) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  onSelect={handleStudySelect}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => handleStudySelect(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Studies
          </button>
          
          <StudyCard study={selectedStudy} onSelect={() => {}} />
          
          <div className="mt-8">
            <TimeSlotList
              study={selectedStudy}
              onBookSlot={(studyId, slot) => handleBookSlot(studyId, slot)}
            />
          </div>
        </div>
      )}

      {showBookingConfirmation && selectedStudy && selectedSlot && (
        <BookingConfirmationDialog
          study={selectedStudy}
          slot={selectedSlot}
          onConfirm={handleBookingConfirm}
          onCancel={handleBookingCancel}
        />
      )}

      {showBookingSuccess && selectedStudy && selectedSlot && profile && (
        <BookingSuccessDialog
          study={selectedStudy}
          slot={selectedSlot}
          participant={profile}
          onClose={handleBookingSuccessClose}
        />
      )}
    </div>
  );
}