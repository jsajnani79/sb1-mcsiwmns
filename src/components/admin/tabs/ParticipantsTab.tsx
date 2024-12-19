import React from 'react';
import { ParticipantList } from '../participants/ParticipantList';
import { useStudyStore } from '../../../store/studyStore';

export function ParticipantsTab() {
  const studies = useStudyStore(state => state.studies);

  return (
    <div className="space-y-6">
      <ParticipantList studies={studies} />
    </div>
  );
}