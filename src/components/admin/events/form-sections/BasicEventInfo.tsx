import React from 'react';
import { IncentiveType } from '../../../../types/event';
import { useTeamStore } from '../../../../store/teamStore';
import { useLocationStore } from '../../../../store/locationStore';
import { MapPin, Link } from 'lucide-react';

interface BasicEventInfoProps {
  formData: {
    title: string;
    description: string;
    imageUrl: string;
    location: string;
    date: string;
    defaultIncentiveType: IncentiveType;
    researcherId?: string;
  };
  onChange: (updates: Partial<BasicEventInfoProps['formData']>) => void;
}

export function BasicEventInfo({ formData, onChange }: BasicEventInfoProps) {
  const members = useTeamStore(state => state.members);
  const locations = useLocationStore(state => state.locations);
  const selectedLocation = locations.find(loc => loc.name === formData.location);

  return (
    <div className="space-y-6">
      {/* ... other fields ... */}

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={formData.location}
            onChange={(e) => onChange({ location: e.target.value })}
            required
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
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

      {/* ... other fields ... */}
    </div>
  );
}