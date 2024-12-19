import React from 'react';
import { IncentiveType, StudyStatus } from '../../../../types/study';
import { useTeamStore } from '../../../../store/teamStore';
import { useLocationStore } from '../../../../store/locationStore';
import { MapPin, Link, DollarSign } from 'lucide-react';

interface BasicStudyInfoProps {
  formData: {
    title: string;
    description: string;
    imageUrl: string;
    location: string;
    date: string;
    defaultIncentiveType: IncentiveType;
    defaultPaymentAmount?: number;
    researcherId?: string;
    status: StudyStatus;
    duration?: number;
  };
  onChange: (updates: Partial<BasicStudyInfoProps['formData']>) => void;
}

export function BasicStudyInfo({ formData, onChange }: BasicStudyInfoProps) {
  const members = useTeamStore(state => state.members);
  const locations = useLocationStore(state => state.locations);
  const selectedLocation = locations.find(loc => loc.name === formData.location);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Study Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => onChange({ title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter study title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={e => onChange({ description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Describe the study and its objectives"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Study Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={e => onChange({ imageUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={formData.location}
            onChange={e => onChange({ location: e.target.value })}
            required
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a location</option>
            {locations.map(location => (
              <option key={location.id} value={location.name}>{location.name}</option>
            ))}
          </select>
        </div>
        {selectedLocation?.googleMapsUrl && (
          <a
            href={selectedLocation.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
          >
            <Link size={14} />
            View on Google Maps
          </a>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Study Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={e => onChange({ date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
        <input
          type="number"
          min="1"
          value={formData.duration || ''}
          onChange={e => onChange({ duration: parseInt(e.target.value) || undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., 60"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={formData.status}
          onChange={e => onChange({ status: e.target.value as StudyStatus })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.values(StudyStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Assigned Researcher</label>
        <select
          value={formData.researcherId || ''}
          onChange={e => onChange({ researcherId: e.target.value || undefined })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a researcher</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Default Incentive Type</label>
        <select
          value={formData.defaultIncentiveType}
          onChange={e => onChange({ defaultIncentiveType: e.target.value as IncentiveType })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.values(IncentiveType).map(type => (
            <option key={type} value={type}>{type.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {formData.defaultIncentiveType === IncentiveType.PAYMENT && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Default Payment Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.defaultPaymentAmount || ''}
              onChange={e => onChange({ defaultPaymentAmount: parseFloat(e.target.value) })}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>
      )}
    </div>
  );
}