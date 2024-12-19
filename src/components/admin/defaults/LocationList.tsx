import React from 'react';
import { MapPin, Link, Pencil, Trash2 } from 'lucide-react';
import { Location } from '../../../types/location';
import { format } from 'date-fns';

interface LocationListProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: string) => void;
}

export function LocationList({ locations, onEdit, onDelete }: LocationListProps) {
  if (locations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No locations added yet</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {locations.map((location) => (
        <div
          key={location.id}
          className="py-4 flex items-center justify-between hover:bg-gray-50 -mx-6 px-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">{location.name}</h3>
            </div>
            {location.googleMapsUrl && (
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Link size={14} />
                View on Google Maps
              </a>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Added {format(location.createdAt, 'MMM d, yyyy')}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(location)}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
              title="Edit"
              disabled={location.id === 'online'}
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(location.id)}
              className="p-2 text-gray-600 hover:text-red-600 rounded-md hover:bg-red-50"
              title="Delete"
              disabled={location.id === 'online'}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}