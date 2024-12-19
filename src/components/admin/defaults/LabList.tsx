import React, { useState } from 'react';
import { Pencil, Trash2, Users, ChevronRight } from 'lucide-react';
import { Lab } from '../../../types/lab';
import { format } from 'date-fns';
import { DeleteConfirmationDialog } from '../../dialogs/DeleteConfirmationDialog';
import { useTeamStore } from '../../../store/teamStore';

interface LabListProps {
  labs: Lab[];
  onEdit: (lab: Lab) => void;
  onDelete: (id: string) => void;
  onViewDetails: (lab: Lab) => void;
}

export function LabList({ labs, onEdit, onDelete, onViewDetails }: LabListProps) {
  const [labToDelete, setLabToDelete] = useState<Lab | null>(null);
  const teamMembers = useTeamStore(state => state.members);

  if (labs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No labs added yet</p>
      </div>
    );
  }

  const getMemberCount = (labId: string) => {
    return teamMembers.filter(member => 
      member.labAffiliations.some(affiliation => affiliation.labId === labId)
    ).length;
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => onViewDetails(lab)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{lab.name}</h3>
                  {lab.description && (
                    <p className="mt-1 text-sm text-gray-500">{lab.description}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {getMemberCount(lab.id)} members
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Added {format(lab.createdAt, 'MMM d, yyyy')}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(lab);
                }}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
                title="Edit"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLabToDelete(lab);
                }}
                className="p-2 text-gray-600 hover:text-red-600 rounded-md hover:bg-red-50"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {labToDelete && (
        <DeleteConfirmationDialog
          title="Delete Lab"
          message={`Are you sure you want to delete "${labToDelete.name}"? This will remove all team member affiliations with this lab.`}
          onConfirm={() => {
            onDelete(labToDelete.id);
            setLabToDelete(null);
          }}
          onCancel={() => setLabToDelete(null)}
        />
      )}
    </>
  );
}