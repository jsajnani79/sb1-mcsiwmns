import React from 'react';
import { ParticipantProfile } from '../../types/participant';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface ProfileSummaryProps {
  profile: ParticipantProfile;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">{profile.name}</h3>
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{profile.nationality}</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <div className="flex flex-col items-end">
            <span>ID: {profile.id.slice(0, 8)}</span>
            {profile.previousResearchParticipation && (
              <span className="mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Previous Research Experience
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Languages:</span>
            <p className="font-medium">{[profile.primaryLanguage, ...profile.otherLanguages].join(', ')}</p>
          </div>
          <div>
            <span className="text-gray-500">Availability:</span>
            <p className="font-medium">{profile.availabilityPattern.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}