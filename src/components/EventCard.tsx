import React from 'react';
import { Calendar, MapPin, Link } from 'lucide-react';
import { Event } from '../types/event';
import { format } from 'date-fns';
import { useLocationStore } from '../store/locationStore';

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
}

export function EventCard({ event, onSelect }: EventCardProps) {
  const locations = useLocationStore(state => state.locations);
  const locationDetails = locations.find(loc => loc.name === event.location);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex flex-col gap-2 text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{format(event.date, 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={18} className="mt-1 flex-shrink-0" />
            <div>
              <span>{event.location}</span>
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
        </div>
        <button
          onClick={() => onSelect(event)}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Time Slots
        </button>
      </div>
    </div>
  );
}