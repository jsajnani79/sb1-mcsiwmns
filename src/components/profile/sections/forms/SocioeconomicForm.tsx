import React from 'react';
import {
  Education,
  EmploymentStatus,
  IncomeRange,
  MaritalStatus
} from '../../../../types/participant';

interface SocioeconomicFormProps {
  formData: any;
  onChange: (updates: any) => void;
}

export function SocioeconomicForm({ formData, onChange }: SocioeconomicFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Education Level</label>
        <select
          value={formData.education || ''}
          onChange={e => onChange({ education: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select education level</option>
          {Object.values(Education).map(education => (
            <option key={education} value={education}>{education}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Employment Status</label>
        <select
          value={formData.employmentStatus || ''}
          onChange={e => onChange({ employmentStatus: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select employment status</option>
          {Object.values(EmploymentStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Occupation</label>
        <input
          type="text"
          value={formData.occupation || ''}
          onChange={e => onChange({ occupation: e.target.value })}
          placeholder="Current occupation"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
        <select
          value={formData.maritalStatus || ''}
          onChange={e => onChange({ maritalStatus: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select marital status</option>
          {Object.values(MaritalStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Household Income Range</label>
        <select
          value={formData.householdIncome || ''}
          onChange={e => onChange({ householdIncome: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select income range</option>
          {Object.values(IncomeRange).map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Housing Status</label>
        <select
          value={formData.housingStatus || ''}
          onChange={e => onChange({ housingStatus: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select housing status</option>
          <option value="OWN">Own</option>
          <option value="RENT">Rent</option>
          <option value="LIVE_WITH_FAMILY">Live with Family</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Household Size</label>
        <input
          type="number"
          min="1"
          value={formData.householdSize || ''}
          onChange={e => onChange({ householdSize: parseInt(e.target.value) || '' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dependents</label>
        <input
          type="number"
          min="0"
          value={formData.dependents || ''}
          onChange={e => onChange({ dependents: parseInt(e.target.value) || '' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="col-span-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.studentStatus || false}
            onChange={e => onChange({ studentStatus: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Currently a Student</span>
        </label>
      </div>

      {formData.studentStatus && (
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Field of Study</label>
          <input
            type="text"
            value={formData.fieldOfStudy || ''}
            onChange={e => onChange({ fieldOfStudy: e.target.value })}
            placeholder="Current field of study"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}