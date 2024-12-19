import React, { useState } from 'react';
import { AdminSidebar } from './layout/AdminSidebar';
import { AdminHeader } from './layout/AdminHeader';
import { StudiesTab } from './tabs/StudiesTab';
import { ParticipantsTab } from './tabs/ParticipantsTab';
import { TeamTab } from './tabs/TeamTab';
import { LabsTab } from './tabs/LabsTab';
import { DefaultsTab } from './tabs/DefaultsTab';

type AdminTab = 'studies' | 'participants' | 'team' | 'labs' | 'defaults';

export function AdminView() {
  const [activeTab, setActiveTab] = useState<AdminTab>('studies');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'studies':
        return <StudiesTab />;
      case 'participants':
        return <ParticipantsTab />;
      case 'team':
        return <TeamTab />;
      case 'labs':
        return <LabsTab />;
      case 'defaults':
        return <DefaultsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <AdminHeader activeTab={activeTab} />
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}