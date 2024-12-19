import React from 'react';
import { Globe2 } from 'lucide-react';
import { EthnicitySelect } from './demographics/EthnicitySelect';
import { RaceSelect } from './demographics/RaceSelect';
import { LanguageSection } from './demographics/LanguageSection';
import { Language, Ethnicity, Race } from '../../../../types/demographics';

interface DemographicsFormProps {
  formData: any;
  onChange: (updates: any) => void;
}

export function DemographicsForm({ formData, onChange }: DemographicsFormProps) {
  const handleEthnicityChange = (value: Ethnicity) => {
    onChange({ ethnicity: [value] });
  };

  const handleRaceChange = (value: Race) => {
    onChange({ race: [value] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Demographics Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nationality</label>
          <input
            type="text"
            value={formData.nationality || ''}
            onChange={(e) => onChange({ nationality: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your nationality"
          />
        </div>

        <EthnicitySelect
          value={formData.ethnicity?.[0] || ''}
          onChange={handleEthnicityChange}
        />

        <RaceSelect
          value={formData.race?.[0] || ''}
          onChange={handleRaceChange}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <LanguageSection
          primaryLanguage={formData.primaryLanguage || ''}
          otherLanguages={formData.otherLanguages || []}
          onPrimaryLanguageChange={(value) => onChange({ primaryLanguage: value })}
          onOtherLanguagesChange={(languages: Language[]) => onChange({ otherLanguages: languages })}
        />
      </div>
    </div>
  );
}