import React, { useState } from 'react';
import { Location } from '../../../types/location';

interface LocationFormProps {
  initialData?: Location | null;
  onSubmit: (data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function LocationForm({ initialData, onSubmit, onCancel }: LocationFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    googleMapsUrl: initialData?.googleMapsUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">Location Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., Research Lab A, Conference Room 101"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Google Maps URL (Optional)</label>
        <input
          type="url"
          value={formData.googleMapsUrl}
          onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://maps.google.com/..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Add a Google Maps link to help participants find the location
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update Location' : 'Add Location'}
        </button>
      </div>
    </form>
  );
}