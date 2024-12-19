import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import {
  BloodType,
  VisionCorrection,
  HearingAid,
  HealthCondition
} from '../../../../types/health';
import {
  Handedness,
  SmokingStatus,
  AlcoholConsumption,
  ExerciseFrequency
} from '../../../../types/participant';

interface HealthFormProps {
  formData: any;
  onChange: (updates: any) => void;
}

export function HealthForm({ formData, onChange }: HealthFormProps) {
  const [newCondition, setNewCondition] = React.useState<Partial<HealthCondition>>({
    name: '',
    controlled: true,
    medications: []
  });
  const [newMedication, setNewMedication] = React.useState('');

  const addHealthCondition = () => {
    if (newCondition.name) {
      const conditions = formData.chronicConditions || [];
      onChange({
        chronicConditions: [...conditions, { ...newCondition, medications: newCondition.medications || [] }]
      });
      setNewCondition({ name: '', controlled: true, medications: [] });
    }
  };

  const addMedication = () => {
    if (newMedication) {
      const medications = formData.medications || [];
      onChange({ medications: [...medications, newMedication] });
      setNewMedication('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Handedness</label>
          <select
            value={formData.handedness || ''}
            onChange={e => onChange({ handedness: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select handedness</option>
            {Object.values(Handedness).map(hand => (
              <option key={hand} value={hand}>{hand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exercise Frequency</label>
          <select
            value={formData.exerciseFrequency || ''}
            onChange={e => onChange({ exerciseFrequency: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select frequency</option>
            {Object.values(ExerciseFrequency).map(freq => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Smoking Status</label>
          <select
            value={formData.smokingStatus || ''}
            onChange={e => onChange({ smokingStatus: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select status</option>
            {Object.values(SmokingStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Alcohol Consumption</label>
          <select
            value={formData.alcoholConsumption || ''}
            onChange={e => onChange({ alcoholConsumption: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select consumption level</option>
            {Object.values(AlcoholConsumption).map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vision Correction</label>
          <select
            value={formData.visionCorrection || ''}
            onChange={e => onChange({ visionCorrection: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select vision correction</option>
            {Object.values(VisionCorrection).map(correction => (
              <option key={correction} value={correction}>{correction}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hearing Aid</label>
          <select
            value={formData.hearingAid || ''}
            onChange={e => onChange({ hearingAid: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select hearing aid</option>
            {Object.values(HearingAid).map(aid => (
              <option key={aid} value={aid}>{aid}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Health Conditions</label>
        <div className="space-y-2">
          {(formData.chronicConditions || []).map((condition: HealthCondition, index: number) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{condition.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newConditions = [...(formData.chronicConditions || [])];
                    newConditions.splice(index, 1);
                    onChange({ chronicConditions: newConditions });
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <MinusCircle size={20} />
                </button>
              </div>
              <div className="mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={condition.controlled}
                    onChange={() => {
                      const newConditions = [...(formData.chronicConditions || [])];
                      newConditions[index] = { ...condition, controlled: !condition.controlled };
                      onChange({ chronicConditions: newConditions });
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Controlled</span>
                </label>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newCondition.name}
              onChange={e => setNewCondition({ ...newCondition, name: e.target.value })}
              placeholder="Add health condition"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addHealthCondition}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
        <div className="space-y-2">
          {(formData.medications || []).map((medication: string, index: number) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
              <span>{medication}</span>
              <button
                type="button"
                onClick={() => {
                  const newMedications = [...(formData.medications || [])];
                  newMedications.splice(index, 1);
                  onChange({ medications: newMedications });
                }}
                className="text-red-600 hover:text-red-800"
              >
                <MinusCircle size={20} />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newMedication}
              onChange={e => setNewMedication(e.target.value)}
              placeholder="Add medication"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addMedication}
              className="text-blue-600 hover:text-blue-800"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.mobilityIssues || false}
              onChange={e => onChange({ mobilityIssues: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Mobility Issues</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.visualImpairment || false}
              onChange={e => onChange({ visualImpairment: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Visual Impairment</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.hearingImpairment || false}
              onChange={e => onChange({ hearingImpairment: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Hearing Impairment</span>
          </label>
        </div>
      </div>
    </div>
  );
}