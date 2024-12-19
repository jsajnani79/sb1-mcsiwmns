import React from 'react';
import { Gender } from '../../../../types/participant';

interface BasicInfoFormProps {
  formData: any;
  onChange: (updates: any) => void;
}

export function BasicInfoForm({ formData, onChange }: BasicInfoFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.name || ''}
          onChange={e => onChange({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          value={formData.email || ''}
          onChange={e => onChange({ email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={e => onChange({ phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth (Optional)</label>
        <input
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={e => onChange({ dateOfBirth: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender (Optional)</label>
        <select
          value={formData.gender || ''}
          onChange={e => onChange({ gender: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select gender</option>
          {Object.values(Gender).map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pronouns (Optional)</label>
        <input
          type="text"
          value={formData.pronouns || ''}
          onChange={e => onChange({ pronouns: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}