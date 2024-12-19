import React from 'react';
import { AlertTriangle, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Study, TimeSlot } from '../../types/study';

interface CancellationDialogProps {
  study: Study;
  slot: TimeSlot;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CancellationDialog({ study, slot, onConfirm, onCancel }: CancellationDialogProps) {
  if (!study || !slot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Cancel Booking</h3>
            <p className="text-gray-500 mt-1">This action cannot be undone.</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900">{study.title}</h4>
          <div className="mt-2 space-y-2 text-sm text-gray-600">
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

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Yes, Cancel Booking
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            Keep Booking
          </button>
        </div>
      </div>
    </div>
  );
}