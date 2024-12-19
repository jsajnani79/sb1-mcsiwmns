import React from 'react';
import { Search } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: string;
}

export function AdminHeader({ activeTab }: AdminHeaderProps) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'studies':
        return 'Research Studies';
      case 'participants':
        return 'Study Participants';
      case 'team':
        return 'Research Team';
      case 'labs':
        return 'Research Labs';
      case 'defaults':
        return 'System Defaults';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{getTabTitle()}</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}