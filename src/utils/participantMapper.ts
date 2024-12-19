import { Study, Participant } from '../types/study';

export function mapParticipantsWithStudyDetails(studies: Study[]) {
  return studies.flatMap(study =>
    study.timeSlots.flatMap(slot =>
      slot.attendees.map(attendee => ({
        ...attendee,
        studyTitle: study.title,
        studyDate: study.date,
        slotTime: {
          start: slot.startTime,
          end: slot.endTime
        },
        studyId: study.id,
        slotId: slot.id
      }))
    )
  );
}