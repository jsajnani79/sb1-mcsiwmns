import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, PencilLine, X } from 'lucide-react';
import { useStudyStore } from '../../../store/studyStore';
import { useProfileStore } from '../../../store/profileStore';
import { CancellationDialog } from '../../dialogs/CancellationDialog';

interface BookedStudiesSectionProps {
  participantEmail: string;
}

export function BookedStudiesSection({ participantEmail }: BookedStudiesSectionProps) {
  const { profile } = useProfileStore();
  const bookedStudies = useStudyStore(state => state.getBookedStudies(participantEmail));
  const [showReschedule, setShowReschedule] = React.useState<string | null>(null);
  const [cancellationStudy, setCancellationStudy] = React.useState<any>(null);

  if (bookedStudies.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">My Booked Studies</h3>
        </div>
        <p className="text-gray-500 text-center py-4">You haven't booked any studies yet.</p>
      </div>
    );
  }

  const handleCancel = (study: any, slot: any) => {
    if (!profile) return;
    
    const updatedAttendees = slot.attendees.filter((a: any) => a.email !== profile.email);
    const updatedSlot = { ...slot, attendees: updatedAttendees };
    useStudyStore.getState().updateTimeSlot(study.id, updatedSlot);
    setCancellationStudy(null);
  };

  const handleReschedule = (studyId: string, currentSlotId: string, newSlotId: string) => {
    if (!profile) return;

    const study = bookedStudies.find(b => b.study.id === studyId)?.study;
    if (!study) return;

    const currentSlot = study.timeSlots.find(s => s.id === currentSlotId);
    const newSlot = study.timeSlots.find(s => s.id === newSlotId);
    if (!currentSlot || !newSlot) return;

    const attendee = currentSlot.attendees.find(a => a.email === profile.email);
    if (!attendee) return;

    // Remove from current slot
    const updatedCurrentSlot = {
      ...currentSlot,
      attendees: currentSlot.attendees.filter(a => a.email !== profile.email)
    };
    useStudyStore.getState().updateTimeSlot(studyId, updatedCurrentSlot);

    // Add to new slot
    const updatedNewSlot = {
      ...newSlot,
      attendees: [...newSlot.attendees, attendee]
    };
    useStudyStore.getState().updateTimeSlot(studyId, updatedNewSlot);

    setShowReschedule(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">My Booked Studies</h3>
      </div>

      <div className="space-y-4">
        {bookedStudies.map(({ study, slot }) => (
          <div key={`${study.id}-${slot.id}`} className="border rounded-lg p-4">
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
                        onClick={() => handleReschedule(study.id, slot.id, newSlot.id)}
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
          onConfirm={() => handleCancel(cancellationStudy.study, cancellationStudy.slot)}
          onCancel={() => setCancellationStudy(null)}
        />
      )}
    </div>
  );
}