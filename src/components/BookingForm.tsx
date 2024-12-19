import React from 'react';
import { ParticipantProfile } from '../types/participant';

interface BookingFormProps {
  onSubmit: () => void;
  onCancel: () => void;
  profile: ParticipantProfile | null;
}

export function BookingForm({ onSubmit, onCancel, profile }: BookingFormProps) {
  if (!profile) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">Please complete your profile before booking an event.</p>
        <button
          onClick={onCancel}
          className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Confirm Booking</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-medium">{profile.name}</p>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Confirm Booking
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}