import React from 'react';
import { ArrowLeft, Calendar, Clock, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { Study } from '../../../types/study';

interface ParticipantDetailsProps {
  participant: {
    name: string;
    email: string;
    totalStudies: number;
    completedStudies: number;
  };
  studies: Study[];
  onBack: () => void;
  onViewStudy: (study: Study) => void;
}

export function ParticipantDetails({ participant, studies, onBack, onViewStudy }: ParticipantDetailsProps) {
  const participantStudies = studies.filter(study =>
    study.timeSlots.some(slot =>
      slot.attendees.some(attendee => attendee.email === participant.email)
    )
  );

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back to Participants
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900">{participant.name}</h2>
        <p className="text-gray-600 mt-1">{participant.email}</p>
        
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Total Studies</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{participant.totalStudies}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{participant.completedStudies}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {participant.totalStudies > 0
                ? Math.round((participant.completedStudies / participant.totalStudies) * 100)
                : 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Study History</h3>
        <div className="space-y-4">
          {participantStudies.map(study => {
            const slot = study.timeSlots.find(slot =>
              slot.attendees.some(attendee => attendee.email === participant.email)
            );
            const attendee = slot?.attendees.find(a => a.email === participant.email);

            if (!slot || !attendee) return null;

            return (
              <div
                key={study.id}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 
                      onClick={() => onViewStudy(study)}
                      className="text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer inline-block"
                    >
                      {study.title}
                    </h4>
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
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    attendee.attended
                      ? 'bg-green-100 text-green-800'
                      : attendee.attended === false
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {attendee.attended ? (
                      <><Check size={16} /> Complete</>
                    ) : attendee.attended === false ? (
                      <><X size={16} /> Incomplete</>
                    ) : (
                      'Pending'
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {participantStudies.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No studies found for this participant
            </p>
          )}
        </div>
      </div>
    </div>
  );
}