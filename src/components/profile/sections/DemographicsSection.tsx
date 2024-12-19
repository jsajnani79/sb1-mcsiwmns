import React from 'react';
import { Globe2, Languages } from 'lucide-react';
import { ParticipantProfile } from '../../../types/participant';
import { Language } from '../../../types/demographics';

interface DemographicsSectionProps {
  profile: ParticipantProfile;
}

export function DemographicsSection({ profile }: DemographicsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe2 className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Demographics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Nationality</label>
            <p className="font-medium">{profile.nationality}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Ethnicity</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.ethnicity?.map((eth) => (
                <span
                  key={eth}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {eth}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Race</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.race?.map((race) => (
                <span
                  key={race}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {race}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Languages className="w-4 h-4 text-blue-600" />
              <label className="text-sm text-gray-500">Languages</label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Primary Language</span>
                <span className="text-sm text-blue-600">Native</span>
              </div>
              <p className="font-medium">{profile.primaryLanguage}</p>
              
              {profile.otherLanguages?.length > 0 && (
                <div className="mt-3">
                  <span className="text-sm text-gray-500">Additional Languages</span>
                  <div className="mt-1 space-y-1">
                    {(profile.otherLanguages as Language[]).map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <span className="text-sm">{lang.name}</span>
                        <span className="text-xs text-gray-500">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}