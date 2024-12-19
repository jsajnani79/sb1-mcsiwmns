import React, { useState } from 'react';
import { useLabStore } from '../../../store/labStore';
import { LabList } from '../defaults/LabList';
import { LabForm } from '../defaults/LabForm';
import { LabDetails } from '../defaults/LabDetails';
import { Lab } from '../../../types/lab';
import { Plus } from 'lucide-react';

export function LabsTab() {
  const { labs, addLab, updateLab, deleteLab } = useLabStore();
  const [showForm, setShowForm] = useState(false);
  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const handleSubmit = (data: Omit<Lab, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingLab) {
      updateLab(editingLab.id, data);
    } else {
      addLab(data);
    }
    setShowForm(false);
    setEditingLab(null);
  };

  if (selectedLab) {
    return <LabDetails lab={selectedLab} onBack={() => setSelectedLab(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Research Labs</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          New Lab
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">
              {editingLab ? 'Edit Lab' : 'Add New Lab'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingLab(null);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
          <LabForm
            initialData={editingLab}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingLab(null);
            }}
          />
        </div>
      ) : (
        <LabList
          labs={labs}
          onEdit={(lab) => {
            setEditingLab(lab);
            setShowForm(true);
          }}
          onDelete={deleteLab}
          onViewDetails={setSelectedLab}
        />
      )}
    </div>
  );
}