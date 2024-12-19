import React, { useState } from 'react';
import { format } from 'date-fns';
import { Send, DollarSign, CheckSquare, Square } from 'lucide-react';
import { Study, IncentiveType, IncentiveStatus } from '../../../../types/study';
import { useStudyStore } from '../../../../store/studyStore';
import { useIncentiveStore } from '../../../../store/incentiveStore';

export function PaymentsQueue() {
  const studies = useStudyStore(state => state.studies);
  const updateParticipant = useStudyStore(state => state.updateParticipant);
  const addToIncentiveQueue = useIncentiveStore(state => state.addToQueue);
  const sendBatch = useIncentiveStore(state => state.sendBatch);
  
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [paymentAmounts, setPaymentAmounts] = useState<Record<string, number>>({});

  // Filter for participants who need payment allocation
  const pendingPayments = studies.flatMap(study => 
    study.timeSlots.flatMap(slot => 
      slot.attendees
        .filter(p => 
          (p.incentiveType || study.defaultIncentiveType) === IncentiveType.PAYMENT &&
          p.attended === true &&
          p.incentiveStatus === IncentiveStatus.PENDING
        )
        .map(participant => ({
          study,
          slot,
          participant,
          defaultAmount: study.defaultPaymentAmount || 0
        }))
    )
  );

  const handleSendPayments = () => {
    if (selectedParticipants.length === 0) return;

    // Update each selected participant
    pendingPayments.forEach(({ study, slot, participant, defaultAmount }) => {
      if (selectedParticipants.includes(participant.id)) {
        const amount = paymentAmounts[participant.id] || defaultAmount;

        // Update participant status
        const updatedParticipant = {
          ...participant,
          incentiveStatus: IncentiveStatus.GRANTED
        };
        updateParticipant(study.id, slot.id, updatedParticipant);

        // Add to incentive queue for history
        addToIncentiveQueue({
          participantId: participant.id,
          participantName: participant.name,
          participantEmail: participant.email,
          eventId: study.id,
          eventTitle: study.title,
          slotId: slot.id,
          incentiveType: IncentiveType.PAYMENT,
          defaultAmount,
          allocatedAmount: amount,
          dateAttended: study.date,
          status: 'sent'
        });
      }
    });

    // Send batch to move to history
    sendBatch('Admin');
    
    // Reset selections
    setSelectedParticipants([]);
    setPaymentAmounts({});
  };

  if (pendingPayments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-500">No pending payments to process</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (selectedParticipants.length === pendingPayments.length) {
                  setSelectedParticipants([]);
                } else {
                  setSelectedParticipants(pendingPayments.map(p => p.participant.id));
                }
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              {selectedParticipants.length === pendingPayments.length ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span className="text-sm">Select All</span>
            </button>
            <span className="text-sm text-gray-500">
              {selectedParticipants.length} selected
            </span>
          </div>
          <button
            onClick={handleSendPayments}
            disabled={selectedParticipants.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            Send Payments
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Study</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingPayments.map(({ study, participant, defaultAmount }) => (
              <tr key={`${participant.id}-${study.id}`}>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (selectedParticipants.includes(participant.id)) {
                        setSelectedParticipants(prev => prev.filter(id => id !== participant.id));
                      } else {
                        setSelectedParticipants(prev => [...prev, participant.id]);
                      }
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {selectedParticipants.includes(participant.id) ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                    <div className="text-sm text-gray-500">{participant.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{study.title}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{format(study.date, 'MMM d, yyyy')}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={paymentAmounts[participant.id] || defaultAmount}
                      onChange={(e) => setPaymentAmounts(prev => ({
                        ...prev,
                        [participant.id]: parseFloat(e.target.value)
                      }))}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}