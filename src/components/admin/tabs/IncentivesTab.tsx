```typescript
import React from 'react';
import { useStudyStore } from '../../../store/studyStore';
import { IncentiveType } from '../../../types/study';
import { Wallet, GraduationCap, History } from 'lucide-react';

export function IncentivesTab() {
  const [activeTab, setActiveTab] = React.useState<'payments' | 'credits'>('payments');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Incentive Management</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === 'payments'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Wallet size={20} />
            Payments
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === 'credits'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <GraduationCap size={20} />
            Course Credits
          </button>
        </div>
      </div>

      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="flex flex-col items-center gap-4">
          {activeTab === 'payments' ? (
            <>
              <Wallet className="w-12 h-12 text-gray-400" />
              <p className="text-gray-500">Payment management features coming soon</p>
            </>
          ) : (
            <>
              <GraduationCap className="w-12 h-12 text-gray-400" />
              <p className="text-gray-500">Course credit management features coming soon</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```