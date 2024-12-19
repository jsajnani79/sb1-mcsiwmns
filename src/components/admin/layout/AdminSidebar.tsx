import React from 'react';
import { Calendar, Users, UserCircle2, Settings, Beaker } from 'lucide-react';

const tabs = [
  { id: 'studies', label: 'Studies', icon: Calendar },
  { id: 'participants', label: 'Participants', icon: Users },
  { id: 'team', label: 'Team', icon: UserCircle2 },
  { id: 'labs', label: 'Labs', icon: Beaker },
  { id: 'defaults', label: 'Defaults', icon: Settings },
] as const;

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}