import React from 'react';
import { format } from 'date-fns';
import { Study } from '../../../types/study';
import { ArrowLeft } from 'lucide-react';

interface StudyDetailsHeaderProps {
  study: Study;
  onBack: () => void;
}

export function StudyDetailsHeader({ study, onBack }: StudyDetailsHeaderProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        Back to Studies
      </button>

      <div className="mt-4">
        <h2 className="text-2xl font-bold">{study.title}</h2>
        <p className="text-gray-600 mt-1">{format(study.date, 'MMMM d, yyyy')}</p>
        <p className="text-gray-500 mt-1">Default Incentive: {study.defaultIncentiveType.replace('_', ' ')}</p>
      </div>
    </div>
  );
}