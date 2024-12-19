import React, { useState } from 'react';
import { AdminStudyList } from '../studies/AdminStudyList';
import { useStudyStore } from '../../../store/studyStore';
import { StudyForm } from '../studies/StudyForm';
import { Plus } from 'lucide-react';

export function StudiesTab() {
  const { studies, updateStudy, deleteStudy, addStudy } = useStudyStore();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (study: any) => {
    addStudy(study);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Research Studies</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          New Study
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Add New Study</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
          <StudyForm onSubmit={handleSubmit} />
        </div>
      ) : (
        <AdminStudyList
          studies={studies}
          onEdit={updateStudy}
          onDelete={deleteStudy}
        />
      )}
    </div>
  );
}