import React, { useState } from 'react';
import { TeamMember } from '../../../types/team';
import { validateTeamMember } from '../../../utils/validation';
import { LabAffiliationSelect } from './LabAffiliationSelect';
import { useLabStore } from '../../../store/labStore';
import { LabAffiliation } from '../../../types/lab';

interface TeamMemberFormProps {
  initialData?: TeamMember | null;
  onSubmit: (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function TeamMemberForm({ initialData, onSubmit }: TeamMemberFormProps) {
  const labs = useLabStore(state => state.labs);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    title: initialData?.title || '',
    labAffiliations: initialData?.labAffiliations || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof typeof formData, value: string | LabAffiliation[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const validation = validateTeamMember(formData);
    if (validation.errors[field]) {
      setErrors(prev => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTeamMember(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            touched.name && errors.name 
              ? 'border-red-300' 
              : 'border-gray-300'
          }`}
        />
        {touched.name && errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            touched.email && errors.email 
              ? 'border-red-300' 
              : 'border-gray-300'
          }`}
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Principal Investigator, Research Assistant"
        />
      </div>

      <LabAffiliationSelect
        labs={labs}
        affiliations={formData.labAffiliations}
        onChange={(affiliations) => handleChange('labAffiliations', affiliations)}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update Team Member' : 'Add Team Member'}
        </button>
      </div>
    </form>
  );
}