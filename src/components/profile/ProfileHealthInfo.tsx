import React from 'react';
import { ParticipantProfile } from '../../types/participant';
import { Heart, AlertCircle } from 'lucide-react';

interface ProfileHealthInfoProps {
  profile: ParticipantProfile;
}

export function ProfileHealthInfo({ profile }: ProfileHealthInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Health Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Health Factors</h4>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Handedness</span>
              <span className="text-sm font-medium">{profile.handedness}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Exercise Frequency</span>
              <span className="text-sm font-medium">{profile.exerciseFrequency}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Smoking Status</span>
              <span className="text-sm font-medium">{profile.smokingStatus}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Alcohol Consumption</span>
              <span className="text-sm font-medium">{profile.alcoholConsumption}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Medical Considerations</h4>
          <div className="space-y-4">
            {(profile.mobilityIssues || profile.visualImpairment || profile.hearingImpairment) && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-md">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Special Considerations:</p>
                  <ul className="mt-1 list-disc list-inside text-yellow-700">
                    {profile.mobilityIssues && <li>Mobility assistance may be required</li>}
                    {profile.visualImpairment && <li>Visual accommodations needed</li>}
                    {profile.hearingImpairment && <li>Hearing accommodations needed</li>}
                  </ul>
                </div>
              </div>
            )}

            {profile.chronicConditions.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-1">Chronic Conditions</h5>
                <div className="flex flex-wrap gap-2">
                  {profile.chronicConditions.map((condition) => (
                    <span
                      key={condition}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.medications.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-600 mb-1">Current Medications</h5>
                <div className="flex flex-wrap gap-2">
                  {profile.medications.map((medication) => (
                    <span
                      key={medication}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {medication}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}