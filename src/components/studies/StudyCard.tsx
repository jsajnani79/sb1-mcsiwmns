import React from 'react';
import { MapPin, Link } from 'lucide-react';
import { Study } from '../../types/study';
import { format } from 'date-fns';
import { useLocationStore } from '../../store/locationStore';

interface StudyCardProps {
  study: Study;
  onSelect: (study: Study) => void;
}

export function StudyCard({ study, onSelect }: StudyCardProps) {
  const locations = useLocationStore(state => state.locations);
  const locationDetails = locations.find(loc => loc.name === study.location);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={study.imageUrl}
        alt={study.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
        <p className="text-gray-600 mb-4">{study.description}</p>
        <div className="flex flex-col gap-2 text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <div>
              <span>{study.location}</span>
              {locationDetails?.googleMapsUrl && (
                <a
                  href={locationDetails.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  <Link size={14} />
                  <span className="text-sm">View Map</span>
                </a>
              )}
            </div>
          </div>
          <div className="text-sm">
            {format(study.date, 'MMMM d, yyyy')}
          </div>
        </div>
        <button
          onClick={() => onSelect(study)}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Time Slots
        </button>
      </div>
    </div>
  );
}