import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Lab, LabAffiliation, LabRole } from '../../../types/lab';

interface LabAffiliationSelectProps {
  labs: Lab[];
  affiliations: LabAffiliation[];
  onChange: (affiliations: LabAffiliation[]) => void;
}

export function LabAffiliationSelect({ labs, affiliations, onChange }: LabAffiliationSelectProps) {
  const addAffiliation = () => {
    if (labs.length === 0) return;
    const newAffiliation: LabAffiliation = {
      labId: labs[0].id,
      role: LabRole.RESEARCHER
    };
    onChange([...affiliations, newAffiliation]);
  };

  const removeAffiliation = (index: number) => {
    const newAffiliations = [...affiliations];
    newAffiliations.splice(index, 1);
    onChange(newAffiliations);
  };

  const updateAffiliation = (index: number, updates: Partial<LabAffiliation>) => {
    const newAffiliations = [...affiliations];
    newAffiliations[index] = { ...newAffiliations[index], ...updates };
    onChange(newAffiliations);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Lab Affiliations</label>
        <button
          type="button"
          onClick={addAffiliation}
          disabled={labs.length === 0}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 disabled:opacity-50"
        >
          <PlusCircle size={16} />
          Add Affiliation
        </button>
      </div>

      {labs.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No labs available. Add labs in the Defaults section.</p>
      ) : (
        <div className="space-y-3">
          {affiliations.map((affiliation, index) => (
            <div key={index} className="flex gap-3">
              <select
                value={affiliation.labId}
                onChange={(e) => updateAffiliation(index, { labId: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {labs.map((lab) => (
                  <option key={lab.id} value={lab.id}>{lab.name}</option>
                ))}
              </select>
              <select
                value={affiliation.role}
                onChange={(e) => updateAffiliation(index, { role: e.target.value as LabRole })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.values(LabRole).map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeAffiliation(index)}
                className="text-red-600 hover:text-red-800"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}