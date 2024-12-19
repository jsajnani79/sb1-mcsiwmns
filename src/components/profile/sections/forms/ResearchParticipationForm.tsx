import React from 'react';
import { ContactMethod, AvailabilityPattern } from '../../../../types/participant';

interface ResearchParticipationFormProps {
  formData: any;
  onChange: (updates: any) => void;
  onMultiSelect: (field: string, value: string) => void;
}

export function ResearchParticipationForm({
  formData,
  onChange,
  onMultiSelect
}: ResearchParticipationFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.previousResearchParticipation || false}
            onChange={e => onChange({ previousResearchParticipation: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Previous research participation</span>
        </label>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.willingToBeContacted || false}
            onChange={e => onChange({ willingToBeContacted: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Willing to be contacted for future studies</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
        <select
          value={formData.preferredContactMethod || ''}
          onChange={e => onChange({ preferredContactMethod: e.target.value as ContactMethod })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select contact method</option>
          {Object.values(ContactMethod).map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Availability Patterns</label>
        <div className="space-y-2">
          {Object.values(AvailabilityPattern).map(pattern => (
            <label key={pattern} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(formData.availabilityPattern as string[]).includes(pattern)}
                onChange={() => onMultiSelect('availabilityPattern', pattern)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{pattern}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}