import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, X, PencilLine } from 'lucide-react';
import { Study, TimeSlot } from '../../types/study';
import { useStudyStore } from '../../store/studyStore';
import { useProfileStore } from '../../store/profileStore';
import { CancellationDialog } from '../dialogs/CancellationDialog';

interface BookedStudiesListProps {
  bookings: Array<{
    study: Study;
    slot: TimeSlot;
  }>;
}

export function BookedStudiesList({ bookings }: BookedStudiesListProps) {
  const { profile } = useProfileStore();
  const [showReschedule, setShowReschedule] = useState<string | null>(null);
  const [cancellationStudy, setCancellationStudy] = useState<{ study: Study; slot: TimeSlot } | null>(null);

  const handleCancelConfirm = () => {
    if (!profile || !cancellationStudy) return;
    
    const { study, slot } = cancellationStudy;
    const updatedAttendees = slot.attendees.filter(a => a.email !== profile.email);
    const updatedSlot = { ...slot, attendees: updatedAttendees };
    useStudyStore.getState().updateTimeSlot(study.id, updatedSlot);
    setCancellationStudy(null);
  };

  const handleReschedule = (study: Study, currentSlot: TimeSlot, newSlotId: string) => {
    if (!profile) return;

    const newSlot = study.timeSlots.find(s => s.id === newSlotId);
    if (!newSlot) return;

    const attendee = currentSlot.attendees.find(a => a.email === profile.email);
    if (!attendee) return;

    // Remove from current slot
    const updatedCurrentSlot = {
      ...currentSlot,
      attendees: currentSlot.attendees.filter(a => a.email !== profile.email)
    };
    useStudyStore.getState().updateTimeSlot(study.id, updatedCurrentSlot);

    // Add to new slot
    const updatedNewSlot = {
      ...newSlot,
      attendees: [...newSlot.attendees, attendee]
    };
    useStudyStore.getState().updateTimeSlot(study.id, updatedNewSlot);

    setShowReschedule(null);
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-gray-500">You haven't signed up for any studies yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {bookings.map(({ study, slot }) => (
          <div key={`${study.id}-${slot.id}`} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{study.title}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(study.date, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{slot.location || study.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReschedule(slot.id)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                  title="Reschedule"
                >
                  <PencilLine size={20} />
                </button>
                <button
                  onClick={() => setCancellationStudy({ study, slot })}
                  className="text-red-600 hover:text-red-800 p-2"
                  title="Cancel"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {showReschedule === slot.id && (
              <div className="mt-4 border-t pt-4">
                <h5 className="text-sm font-medium mb-2">Select New Time Slot</h5>
                <div className="space-y-2">
                  {study.timeSlots
                    .filter(s => s.id !== slot.id && s.attendees.length < s.capacity)
                    .map(newSlot => (
                      <button
                        key={newSlot.id}
                        onClick={() => handleReschedule(study, slot, newSlot.id)}
                        className="w-full text-left p-2 rounded hover:bg-gray-50 flex justify-between items-center"
                      >
                        <span>
                          {format(newSlot.startTime, 'h:mm a')} - {format(newSlot.endTime, 'h:mm a')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {newSlot.capacity - newSlot.attendees.length} spots left
                        </span>
                      </button>
                    ))}
                </div>
                <button
                  onClick={() => setShowReschedule(null)}
                  className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {cancellationStudy && (
        <CancellationDialog
          study={cancellationStudy.study}
          slot={cancellationStudy.slot}
          onConfirm={handleCancelConfirm}
          onCancel={() => setCancellationStudy(null)}
        />
      )}
    </>
  );
}