import React from 'react';
import { ParticipantProfile } from '../../types/participant';
import { ClipboardList, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ProfileResearchHistoryProps {
  profile: ParticipantProfile;
}

export function ProfileResearchHistory({ profile }: ProfileResearchHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Research Participation</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-4">Participation Status</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {profile.previousResearchParticipation ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-sm text-gray-600">
                Previous Research Experience
              </span>
            </div>
            <div className="flex items-center gap-3">
              {profile.willingToBeContacted ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-sm text-gray-600">
                Available for Future Studies
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-4">Availability</h4>
          <div className="space-y-3">
            {profile.availabilityPattern.map((pattern) => (
              <div key={pattern} className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">{pattern}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-500 mb-3">Contact Preferences</h4>
        <div className="bg-gray-50 rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Preferred Method:</span>
              <p className="text-sm font-medium text-gray-900">
                {profile.preferredContactMethod}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Best Time to Contact:</span>
              <p className="text-sm font-medium text-gray-900">
                {profile.availabilityPattern[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}