import React, { useState } from 'react';
import { Study } from '../../../types/study';
import { StudyCard } from './StudyCard';
import { StudyForm } from './StudyForm';
import { StudyDetails } from './StudyDetails';

interface StudyListProps {
  studies: Study[];
  onEdit: (study: Study) => void;
  onDelete: (studyId: string) => void;
}

export function StudyList({ studies, onEdit, onDelete }: StudyListProps) {
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingStudy, setEditingStudy] = useState<Study | null>(null);

  const handleEdit = (study: Study) => {
    setEditingStudy(study);
    setShowEditForm(true);
  };

  const handleEditSubmit = (updatedStudy: Study) => {
    onEdit(updatedStudy);
    setShowEditForm(false);
    setEditingStudy(null);
  };

  if (showEditForm && editingStudy) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Study</h2>
          <button
            onClick={() => setShowEditForm(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
        <StudyForm
          initialStudy={editingStudy}
          onSubmit={handleEditSubmit}
        />
      </div>
    );
  }

  if (selectedStudy) {
    return (
      <StudyDetails
        study={selectedStudy}
        onBack={() => setSelectedStudy(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {studies.map((study) => (
        <StudyCard
          key={study.id}
          study={study}
          onView={() => setSelectedStudy(study)}
          onEdit={() => handleEdit(study)}
          onDelete={() => onDelete(study.id)}
        />
      ))}
    </div>
  );
}