import React, { useState } from 'react';
import { Pencil, Trash2, Mail } from 'lucide-react';
import { TeamMember } from '../../../types/team';
import { format } from 'date-fns';
import { DeleteConfirmationDialog } from '../../dialogs/DeleteConfirmationDialog';

interface TeamMemberListProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

export function TeamMemberList({ members, onEdit, onDelete }: TeamMemberListProps) {
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  if (members.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No team members added yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
              <div className="mt-1 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {member.email}
                </p>
                <p className="mt-1">{member.title}</p>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Added {format(member.createdAt, 'MMM d, yyyy')}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(member)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50"
                title="Edit"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => setMemberToDelete(member)}
                className="p-2 text-gray-600 hover:text-red-600 rounded-md hover:bg-red-50"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {memberToDelete && (
        <DeleteConfirmationDialog
          title="Delete Team Member"
          message={`Are you sure you want to remove ${memberToDelete.name} from the research team? This action cannot be undone.`}
          onConfirm={() => {
            onDelete(memberToDelete.id);
            setMemberToDelete(null);
          }}
          onCancel={() => setMemberToDelete(null)}
        />
      )}
    </>
  );
}