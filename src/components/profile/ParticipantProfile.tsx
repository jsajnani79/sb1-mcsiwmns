import React from 'react';
import { useProfileStore } from '../../store/profileStore';
import { ProfileForm } from './ProfileForm';
import { ProfileView } from './ProfileView';
import { Edit2 } from 'lucide-react';

export function ParticipantProfile() {
  const { profile } = useProfileStore();
  const [isEditing, setIsEditing] = React.useState(!profile);

  if (isEditing) {
    return <ProfileForm onComplete={() => setIsEditing(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Participant Profile</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <Edit2 size={20} />
          Edit Profile
        </button>
      </div>
      <ProfileView profile={profile!} />
    </div>
  );
}