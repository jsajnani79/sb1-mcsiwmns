import React from 'react';
import { User, Mail, Phone, Calendar, Users } from 'lucide-react';
import { ParticipantProfile } from '../../../types/participant';
import { formatDate } from '../../../utils/dateUtils';

interface BasicInfoSectionProps {
  profile: ParticipantProfile;
}

export function BasicInfoSection({ profile }: BasicInfoSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Basic Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <p className="font-medium">{profile.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {profile.email}
            </p>
          </div>
          {profile.phone && (
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <p className="font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {profile.phone}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {profile.dateOfBirth && (
            <div>
              <label className="text-sm text-gray-500">Date of Birth</label>
              <p className="font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(profile.dateOfBirth)}
              </p>
            </div>
          )}
          {profile.gender && (
            <div>
              <label className="text-sm text-gray-500">Gender</label>
              <p className="font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                {profile.gender}
              </p>
            </div>
          )}
          {profile.pronouns && (
            <div>
              <label className="text-sm text-gray-500">Pronouns</label>
              <p className="font-medium">{profile.pronouns}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}