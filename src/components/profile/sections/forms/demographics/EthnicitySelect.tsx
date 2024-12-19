import React from 'react';
import { Ethnicity } from '../../../../../types/demographics';

interface EthnicitySelectProps {
  value: Ethnicity | '';
  onChange: (value: Ethnicity) => void;
}

export function EthnicitySelect({ value, onChange }: EthnicitySelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Ethnicity</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Ethnicity)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select ethnicity</option>
        {Object.values(Ethnicity).map((ethnicity) => (
          <option key={ethnicity} value={ethnicity}>
            {ethnicity}
          </option>
        ))}
      </select>
    </div>
  );
}