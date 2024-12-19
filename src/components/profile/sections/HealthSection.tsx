import React from 'react';
import { Heart, Activity, Cigarette, Wine, AlertCircle } from 'lucide-react';
import { ParticipantProfile } from '../../../types/participant';
import { HealthCondition } from '../../../types/health';

interface HealthSectionProps {
  profile: ParticipantProfile;
}

export function HealthSection({ profile }: HealthSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Health & Lifestyle</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Physical Activity</label>
            <div className="flex items-center gap-2 mt-1">
              <Activity className="w-4 h-4 text-green-600" />
              <p className="font-medium">{profile.exerciseFrequency}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Smoking Status</label>
            <div className="flex items-center gap-2 mt-1">
              <Cigarette className="w-4 h-4 text-gray-600" />
              <p className="font-medium">{profile.smokingStatus}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Alcohol Consumption</label>
            <div className="flex items-center gap-2 mt-1">
              <Wine className="w-4 h-4 text-purple-600" />
              <p className="font-medium">{profile.alcoholConsumption}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Handedness</label>
            <p className="font-medium">{profile.handedness}</p>
          </div>

          {profile.visionCorrection && (
            <div>
              <label className="text-sm text-gray-500">Vision Correction</label>
              <p className="font-medium">{profile.visionCorrection}</p>
            </div>
          )}

          {profile.hearingAid && (
            <div>
              <label className="text-sm text-gray-500">Hearing Aid</label>
              <p className="font-medium">{profile.hearingAid}</p>
            </div>
          )}
        </div>

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

          {profile.chronicConditions?.length > 0 && (
            <div>
              <label className="text-sm text-gray-500">Health Conditions</label>
              <div className="mt-2 space-y-2">
                {(profile.chronicConditions as HealthCondition[]).map((condition) => (
                  <div
                    key={condition.name}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{condition.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        condition.controlled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {condition.controlled ? 'Controlled' : 'Ongoing'}
                      </span>
                    </div>
                    {condition.medications && condition.medications.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Medications:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {condition.medications.map((med) => (
                            <span
                              key={med}
                              className="text-xs bg-white px-2 py-1 rounded-md"
                            >
                              {med}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.medications?.length > 0 && (
            <div>
              <label className="text-sm text-gray-500">Current Medications</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.medications.map((medication) => (
                  <span
                    key={medication}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
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
  );
}