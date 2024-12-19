import React, { useState } from 'react';
import { format } from 'date-fns';
import { Study, TimeSlot, Participant, IncentiveStatus } from '../../../types/study';
import { ArrowLeft, ListFilter } from 'lucide-react';
import { useStudyStore } from '../../../store/studyStore';
import { BulkUpdateActions } from './BulkUpdateActions';
import { ParticipantsTable } from './ParticipantsTable';
import { TimeSlotView } from './TimeSlotView';

interface StudyDetailsProps {
  study: Study;
  onBack: () => void;
}

export function StudyDetails({ study: initialStudy, onBack }: StudyDetailsProps) {
  const updateParticipant = useStudyStore(state => state.updateParticipant);
  const [study, setStudy] = useState(initialStudy);
  const [viewByTimeSlot, setViewByTimeSlot] = useState(false);

  const allParticipants = study.timeSlots.flatMap(slot => 
    slot.attendees.map(attendee => ({
      ...attendee,
      timeSlot: slot
    }))
  );

  const handleAttendanceUpdate = (slotId: string, participant: Participant, attended: boolean | null) => {
    // Update store state
    updateParticipant(study.id, slotId, participant);
    
    // Update local state
    setStudy(prevStudy => ({
      ...prevStudy,
      timeSlots: prevStudy.timeSlots.map(slot =>
        slot.id === slotId
          ? {
              ...slot,
              attendees: slot.attendees.map(a =>
                a.id === participant.id ? participant : a
              )
            }
          : slot
      )
    }));
  };

  const handleBulkUpdate = (slotId: string | undefined, updates: Partial<Participant>, selectedIds?: string[]) => {
    const updatedStudy = {
      ...study,
      timeSlots: study.timeSlots.map(slot => {
        if (slotId && slot.id !== slotId) return slot;
        
        return {
          ...slot,
          attendees: slot.attendees.map(attendee => {
            if (selectedIds && !selectedIds.includes(attendee.id)) {
              return attendee;
            }
            
            // Update incentive status based on attendance
            const updatedAttendee = {
              ...attendee,
              ...updates,
              incentiveStatus: updates.attended === true 
                ? IncentiveStatus.PENDING 
                : updates.attended === false 
                ? IncentiveStatus.VOID 
                : attendee.incentiveStatus
            };
            
            // Update store state
            updateParticipant(study.id, slot.id, updatedAttendee);
            
            return updatedAttendee;
          })
        };
      })
    };

    // Update local state
    setStudy(updatedStudy);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Studies
        </button>
        <button
          onClick={() => setViewByTimeSlot(!viewByTimeSlot)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md ${
            viewByTimeSlot 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ListFilter size={20} />
          {viewByTimeSlot ? 'View All Participants' : 'View by Time Slot'}
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold">{study.title}</h2>
        <p className="text-gray-600 mt-1">{format(study.date, 'MMMM d, yyyy')}</p>
        <p className="text-gray-500 mt-1">Default Incentive: {study.defaultIncentiveType.replace('_', ' ')}</p>
      </div>

      {viewByTimeSlot ? (
        <TimeSlotView
          study={study}
          onAttendanceUpdate={handleAttendanceUpdate}
          onBulkUpdate={handleBulkUpdate}
        />
      ) : (
        <ParticipantsTable
          participants={allParticipants}
          study={study}
          onAttendanceUpdate={handleAttendanceUpdate}
          onBulkUpdate={handleBulkUpdate}
        />
      )}
    </div>
  );
}