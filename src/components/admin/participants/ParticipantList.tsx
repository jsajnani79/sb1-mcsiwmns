import React, { useState } from 'react';
import { useParticipantStore } from '../../../store/participantStore';
import { AdminParticipant } from '../../../types/participant';
import { AddParticipantForm, AssignToStudyModal } from './forms';
import { ParticipantStudyHistory } from './history';
import { ParticipantListHeader, ParticipantListTable } from './list';

export function ParticipantList() {
  const participants = useParticipantStore(state => state.participants);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<AdminParticipant | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="space-y-6">
      <ParticipantListHeader onAddClick={() => setShowAddForm(true)} />
      
      <ParticipantListTable
        participants={participants}
        onViewHistory={(participant) => {
          setSelectedParticipant(participant);
          setShowHistory(true);
        }}
        onAssignStudy={(participant) => {
          setSelectedParticipant(participant);
          setShowHistory(false);
        }}
      />

      {showAddForm && (
        <AddParticipantForm onClose={() => setShowAddForm(false)} />
      )}

      {selectedParticipant && !showHistory && (
        <AssignToStudyModal
          participant={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
        />
      )}

      {selectedParticipant && showHistory && (
        <ParticipantStudyHistory
          participant={selectedParticipant}
          onClose={() => {
            setSelectedParticipant(null);
            setShowHistory(false);
          }}
        />
      )}
    </div>
  );
}