import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useTeamStore } from '../../../store/teamStore';
import { TeamMemberForm } from '../team/TeamMemberForm';
import { TeamMemberList } from '../team/TeamMemberList';
import { TeamMember } from '../../../types/team';

export function TeamTab() {
  const { members, addMember, updateMember, deleteMember } = useTeamStore();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const handleSubmit = (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingMember) {
      updateMember(editingMember.id, data);
    } else {
      addMember(data);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      deleteMember(id);
    }
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Research Team Members</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} />
              Add Team Member
            </button>
          </div>
          <TeamMemberList
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingMember(null);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
          <TeamMemberForm
            initialData={editingMember}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}