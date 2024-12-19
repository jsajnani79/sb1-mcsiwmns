import React from 'react';
import { Race } from '../../../../../types/demographics';

interface RaceSelectProps {
  value: Race | '';
  onChange: (value: Race) => void;
}

export function RaceSelect({ value, onChange }: RaceSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Race</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Race)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select race</option>
        {Object.values(Race).map((race) => (
          <option key={race} value={race}>
            {race}
          </option>
        ))}
      </select>
    </div>
  );
}