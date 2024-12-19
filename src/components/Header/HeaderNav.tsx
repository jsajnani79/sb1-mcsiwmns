import React from 'react';
import { UserCircle, Settings, BookOpen } from 'lucide-react';

interface HeaderNavProps {
  currentView?: string;
}

export function HeaderNav({ currentView = 'studies' }: HeaderNavProps) {
  const isAdmin = currentView === 'admin';
  const isProfile = currentView === 'profile';

  return (
    <nav className="flex items-center gap-6">
      {/* Always show Studies link when not on studies view */}
      {currentView !== 'studies' && (
        <button
          onClick={() => window.location.hash = '#studies'}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <BookOpen className="w-5 h-5" />
          <span>Available Studies</span>
        </button>
      )}

      {/* Show Profile link when not on profile view */}
      {!isProfile && (
        <button
          onClick={() => window.location.hash = '#profile'}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <UserCircle className="w-5 h-5" />
          <span>My Profile</span>
        </button>
      )}

      {/* Always show Admin link */}
      <button
        onClick={() => window.location.hash = '#admin'}
        className={`flex items-center gap-2 ${
          isAdmin ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        <Settings className="w-5 h-5" />
        <span>Admin</span>
      </button>
    </nav>
  );
}