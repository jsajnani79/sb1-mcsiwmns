import React from 'react';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { Event, TimeSlot, Attendee, IncentiveStatus, IncentiveType } from '../../types/event';
import { useEventStore } from '../../store/eventStore';

interface EventAttendanceManagerProps {
  event: Event;
  slot: TimeSlot;
}

export function EventAttendanceManager({ event, slot }: EventAttendanceManagerProps) {
  const updateParticipant = useEventStore(state => state.updateParticipant);

  const handleAttendanceUpdate = (attendee: Attendee, attended: boolean) => {
    updateParticipant(event.id, slot.id, {
      ...attendee,
      attended
    });
  };

  const handleIncentiveTypeUpdate = (attendee: Attendee, incentiveType: IncentiveType) => {
    updateParticipant(event.id, slot.id, {
      ...attendee,
      incentiveType,
      incentiveStatus: IncentiveStatus.PENDING
    });
  };

  const handleIncentiveStatusUpdate = (attendee: Attendee, incentiveStatus: IncentiveStatus) => {
    updateParticipant(event.id, slot.id, {
      ...attendee,
      incentiveStatus
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}</h4>
          <p className="text-sm text-gray-500">
            {slot.attendees.length} / {slot.capacity} participants
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Incentive Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {slot.attendees.map((attendee) => (
              <tr key={attendee.id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                    <div className="text-sm text-gray-500">{attendee.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAttendanceUpdate(attendee, true)}
                      className={`p-1 rounded ${
                        attendee.attended
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400 hover:text-green-600'
                      }`}
                      title="Mark as attended"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleAttendanceUpdate(attendee, false)}
                      className={`p-1 rounded ${
                        attendee.attended === false
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-400 hover:text-red-600'
                      }`}
                      title="Mark as not attended"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    value={attendee.incentiveType || event.defaultIncentiveType}
                    onChange={(e) => handleIncentiveTypeUpdate(attendee, e.target.value as IncentiveType)}
                    className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.values(IncentiveType).map((type) => (
                      <option key={type} value={type}>{type.replace('_', ' ')}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    value={attendee.incentiveStatus || IncentiveStatus.PENDING}
                    onChange={(e) => handleIncentiveStatusUpdate(attendee, e.target.value as IncentiveStatus)}
                    className={`text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      attendee.incentiveStatus === IncentiveStatus.GRANTED ? 'text-green-600' : 'text-gray-900'
                    }`}
                  >
                    {Object.values(IncentiveStatus).map((status) => (
                      <option key={status} value={status}>{status.replace('_', ' ')}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}