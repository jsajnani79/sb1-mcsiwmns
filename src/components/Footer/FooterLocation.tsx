import React from 'react';
import { MapPin, ExternalLink, Clock } from 'lucide-react';

interface FooterLocationProps {
  address: string;
  googleMapsUrl?: string;
  hours?: string[];
}

export function FooterLocation({ address, googleMapsUrl, hours }: FooterLocationProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-900">Location & Hours</h4>
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-gray-600">
          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
          <div>
            <span className="text-sm">{address}</span>
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>View on Maps</span>
              </a>
            )}
          </div>
        </div>
        
        {hours && hours.length > 0 && (
          <div className="flex items-start gap-2 text-gray-600 mt-3">
            <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
            <div className="text-sm space-y-1">
              {hours.map((hour, index) => (
                <div key={index}>{hour}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}