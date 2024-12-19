import React from 'react';
import { StudyCard } from './StudyCard';
import { Study } from '../../types/study';

interface StudyListProps {
  studies: Study[];
  onStudySelect: (study: Study) => void;
}

export function StudyList({ studies, onStudySelect }: StudyListProps) {
  if (studies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No studies available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studies.map((study) => (
        <StudyCard
          key={study.id}
          study={study}
          onSelect={onStudySelect}
        />
      ))}
    </div>
  );
}