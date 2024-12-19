import React, { useState } from 'react';
import { ArrowLeft, Mail, UserCircle, Plus, Trash2, PencilLine } from 'lucide-react';
import { Lab, LabRole } from '../../../types/lab';
import { useTeamStore } from '../../../store/teamStore';
import { format } from 'date-fns';
import { DeleteConfirmationDialog } from '../../dialogs/DeleteConfirmationDialog';
import { AddLabMemberDialog } from './AddLabMemberDialog';

interface LabDetailsProps {
  lab: Lab;
  onBack: () => void;
}

export function LabDetails({ lab, onBack }: LabDetailsProps) {
  const { members, updateMember } = useTeamStore();
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);
  const [editingMember, setEditingMember] = useState<{ id: string; role: LabRole } | null>(null);

  const labMembers = members.filter(member => 
    member.labAffiliations.some(affiliation => affiliation.labId === lab.id)
  );

  const handleRemoveMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const updatedAffiliations = member.labAffiliations.filter(
      aff => aff.labId !== lab.id
    );

    updateMember(memberId, {
      ...member,
      labAffiliations: updatedAffiliations
    });
    setMemberToRemove(null);
  };

  const handleUpdateRole = (memberId: string, newRole: LabRole) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const updatedAffiliations = member.labAffiliations.map(aff =>
      aff.labId === lab.id ? { ...aff, role: newRole } : aff
    );

    updateMember(memberId, {
      ...member,
      labAffiliations: updatedAffiliations
    });
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Labs
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900">{lab.name}</h2>
        {lab.description && (
          <p className="mt-2 text-gray-600">{lab.description}</p>
        )}
        <p className="mt-4 text-sm text-gray-500">
          Created {format(lab.createdAt, 'MMMM d, yyyy')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Lab Members</h3>
          <button
            onClick={() => setShowAddMember(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Member
          </button>
        </div>

        {labMembers.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No members in this lab yet</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {labMembers.map((member) => {
              const labAffiliation = member.labAffiliations.find(
                aff => aff.labId === lab.id
              );

              return (
                <div key={member.id} className="py-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <UserCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{member.name}</h4>
                      {editingMember?.id === member.id ? (
                        <div className="mt-1 flex items-center gap-2">
                          <select
                            value={editingMember.role}
                            onChange={(e) => handleUpdateRole(member.id, e.target.value as LabRole)}
                            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            {Object.values(LabRole).map((role) => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => setEditingMember(null)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-blue-600">{labAffiliation?.role || 'Member'}</p>
                      )}
                      {member.title && (
                        <p className="text-sm text-gray-600 mt-1">{member.title}</p>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Mail size={16} />
                          <a 
                            href={`mailto:${member.email}`}
                            className="hover:text-blue-600"
                          >
                            {member.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingMember({
                        id: member.id,
                        role: labAffiliation?.role || LabRole.RESEARCHER
                      })}
                      className="p-1 text-gray-400 hover:text-blue-600"
                      title="Edit Role"
                    >
                      <PencilLine size={16} />
                    </button>
                    <button
                      onClick={() => setMemberToRemove({ id: member.id, name: member.name })}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Remove from Lab"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddMember && (
        <AddLabMemberDialog
          lab={lab}
          existingMembers={labMembers}
          onClose={() => setShowAddMember(false)}
        />
      )}

      {memberToRemove && (
        <DeleteConfirmationDialog
          title="Remove Lab Member"
          message={`Are you sure you want to remove ${memberToRemove.name} from ${lab.name}?`}
          onConfirm={() => handleRemoveMember(memberToRemove.id)}
          onCancel={() => setMemberToRemove(null)}
        />
      )}
    </div>
  );
}