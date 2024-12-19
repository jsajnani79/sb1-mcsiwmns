import React, { useState } from 'react';
import { ParticipantProfile } from '../../types/participant';
import { useProfileStore } from '../../store/profileStore';
import { validateProfile } from '../../utils/profileValidation';
import { BasicInfoForm } from './sections/forms/BasicInfoForm';
import { DemographicsForm } from './sections/forms/DemographicsForm';
import { HealthForm } from './sections/forms/HealthForm';
import { SocioeconomicForm } from './sections/forms/SocioeconomicForm';
import { ResearchParticipationForm } from './sections/forms/ResearchParticipationForm';

interface ProfileFormProps {
  onComplete: () => void;
}

export function ProfileForm({ onComplete }: ProfileFormProps) {
  const { profile: existingProfile, updateProfile } = useProfileStore();
  const [formData, setFormData] = useState<Partial<ParticipantProfile>>(
    existingProfile || {
      ethnicity: [],
      race: [],
      otherLanguages: [],
      chronicConditions: [],
      medications: [],
      availabilityPattern: []
    }
  );
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfile(formData)) {
      setError('Please provide your name and a valid email address.');
      return;
    }

    updateProfile({
      id: existingProfile?.id || crypto.randomUUID(),
      ...formData as ParticipantProfile
    });
    onComplete();
  };

  const handleChange = (updates: Partial<ParticipantProfile>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setError('');
  };

  const handleMultiSelect = (field: keyof ParticipantProfile, value: string) => {
    const currentValues = formData[field] as string[] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: newValues });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <p className="text-sm text-gray-500 mb-4">Only name and email are required. All other fields are optional.</p>
        <BasicInfoForm formData={formData} onChange={handleChange} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Demographics (Optional)</h3>
        <DemographicsForm
          formData={formData}
          onChange={handleChange}
          onMultiSelect={handleMultiSelect}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Health Information (Optional)</h3>
        <HealthForm formData={formData} onChange={handleChange} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Socioeconomic Information (Optional)</h3>
        <SocioeconomicForm formData={formData} onChange={handleChange} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Research Participation (Optional)</h3>
        <ResearchParticipationForm
          formData={formData}
          onChange={handleChange}
          onMultiSelect={handleMultiSelect}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}